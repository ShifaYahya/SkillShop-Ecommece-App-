import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2024-06-20",
});

export async function POST(request: any) {
  const data: any = await request.json();
  const amount = data.amount;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100, // Amount is multiplied by 100 to convert to cents
      currency: "USD",
    });
    return NextResponse.json({ client_secret: paymentIntent.client_secret }, { status: 200 }); // Return as JSON object
  } catch (error: any) {
    console.error('Payment Intent Creation Error:', error); // Log error details for debugging
    return NextResponse.json({ error: error.message }, { status: 400 }); // Return error message as JSON
  }
}
