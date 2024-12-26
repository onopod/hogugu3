import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {

        // Stripe Checkout セッションの作成
        const sessionItems = {
            line_items: [
                {
                    price: 'price_1Qa7DSCjiodSo9Y9S72OE3X2',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.get('origin')}/?success=true`,
            cancel_url: `${req.headers.get('origin')}/?canceled=true`,
        }
        console.log("sessionItems is")
        console.dir(sessionItems)
        const sess = await stripe.checkout.sessions.create(sessionItems);
        console.log("session is")
        console.dir(sess)

        // セッションURLを返却
        return NextResponse.json({ url: sess.url });
    } catch (err) {
        console.error('Stripe API error:', err.message);
        return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 });
    }
}
