"use client";

import React, { Suspense } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './_components/CheckoutForm';
import { useSearchParams } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

const CheckoutPageContent = () => {
  const searchParams = useSearchParams();
  const amount = Number(searchParams.get('amount')) || 0;

  const options = {
    mode: 'payment',
    currency: 'usd',
    amount: amount * 100,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
};

const Checkout = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <CheckoutPageContent />
  </Suspense>
);

export default Checkout;
