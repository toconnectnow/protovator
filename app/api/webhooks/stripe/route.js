import { NextResponse } from 'next/server';
// import Stripe from 'stripe';
import { accountingAgent } from '../../../../lib/ai/accountingAgent';

// const stripe = process.env.STRIPE_SECRET_KEY
//     ? new Stripe(process.env.STRIPE_SECRET_KEY)
//     : null;
const stripe = null;

// This would be your Stripe Webhook Secret
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
    const payload = await request.text();
    const sig = request.headers.get('stripe-signature');

    let event;

    try {
        if (!stripe || !endpointSecret) {
            // If no real Stripe setup, just log it
            console.log('Webhook received but Stripe/Secret not configured.');
            return NextResponse.json({ received: true });
        }

        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
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
