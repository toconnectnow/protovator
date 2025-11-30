import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { accountingAgent } from '../../../../lib/ai/accountingAgent';

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY)
    : null;

// This would be your Stripe Webhook Secret
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
    if (!stripe) {
        return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
    }

    const sig = request.headers.get('stripe-signature');
    let event;

    try {
        const body = await request.text();
        // Only verify signature if we have a secret, otherwise trust for dev (NOT SAFE FOR PROD)
        if (endpointSecret) {
            event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
        } else {
            event = JSON.parse(body);
        }
    } catch (err) {
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;

            // Record to AI Ledger
            await accountingAgent.recordLedgerEntry({
                transactionId: session.id,
                type: 'PLEDGE',
                amount: session.amount_total / 100,
                description: `Stripe Pledge for Project ${session.metadata.projectId}`,
                projectId: session.metadata.projectId
            });
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
