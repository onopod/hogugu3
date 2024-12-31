import { changeReservationStatusToPaid } from "@/app/actions";
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-08-16' });

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_b617daf4fecf67e90b9941607ea01965420f95571613744422c23ddd10f4e1a1";

export async function POST(req) {
    const sig = req.headers.get('stripe-signature');

    if (!sig) {
        return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
    }

    let event;

    try {
        const rawBody = await req.text();
        event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Handle the event
    if (event.type == "checkout.session.completed") {
        console.log(`event type ${event.type}`);
        console.dir(event)
        if (event.data.object?.metadata?.reservationId) {
            changeReservationStatusToPaid(Number(event.data.object?.metadata?.reservationId))
        }
    }

    // Return a 200 response to acknowledge receipt of the event
    return NextResponse.json({ received: true }, { status: 200 });
}

export const config = {
    api: {
        bodyParser: false, // Disable the built-in bodyParser to handle raw body
    },
};
