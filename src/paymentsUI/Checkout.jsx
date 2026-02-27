import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./Stripe.js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const Checkout = () => {
  const { id, amount } = useParams();
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await api.post("/payments/create-payment-intent", {
          orderId: id,
          amount: amount * 100,
        });

        setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.error(error);
      }
    };

    createPaymentIntent();
  }, [id, amount]);

  if (!clientSecret)
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-300 px-4">
        <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-white">
          Loading payment...
        </p>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-indigo-300 flex items-center justify-center px-4 sm:px-6"
    >
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
            Secure Stripe Payment
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">
            Complete your payment safely using Stripe.
          </p>
        </div>

        {/* Stripe Form */}
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>

      </div>
    </motion.div>
  );
};

export default Checkout;