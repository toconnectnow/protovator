import { NextResponse } from 'next/server';
// import Stripe from 'stripe';
import { accountingAgent } from '../../../../lib/ai/accountingAgent';

// const stripe = process.env.STRIPE_SECRET_KEY
//   ? new Stripe(process.env.STRIPE_SECRET_KEY)
//   : null;
const stripe = null;

export async function POST(request) {
  try {
    const body = await request.json();
    const { projectId, amount, rewardId } = body;

    if (!projectId || !amount) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!stripe) {
      console.warn('Stripe API key is missing. Using mock checkout.');

      // Record mock transaction to AI Ledger
      await accountingAgent.recordLedgerEntry({
        transactionId: `mock_${crypto.randomUUID()}`,
        type: 'PLEDGE',
        amount: amount,
        description: `Pledge for Project ${projectId}`,
        projectId: projectId
      });

      return NextResponse.json({
        success: true,
        url: '/launchpad/success?mock_session=true'
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Project Pledge',
              metadata: { projectId, rewardId }
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/launchpad/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/launchpad`,
    });

    return NextResponse.json({ success: true, url: session.url });

  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

