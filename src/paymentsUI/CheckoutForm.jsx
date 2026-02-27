import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { CreditCard, Calendar, Lock, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);
  const handleGoToOrders = () => navigate("/orders");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    if (!clientSecret) {
      toast.error("Client secret not loaded yet");
      return;
    }

    setLoading(true);

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        toast.success("✅ Payment successful!");
        setPaymentSuccess(true);
      }
    } catch (err) {
      toast.error(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const elementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#4B5563",
        "::placeholder": { color: "#9CA3AF" },
      },
      invalid: { color: "#EF4444" },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto 
                 bg-blue-200 rounded-2xl shadow-2xl 
                 p-6 sm:p-8 lg:p-10 space-y-6"
    >
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-gray-600 
                   hover:text-indigo-600 transition 
                   text-sm sm:text-base lg:text-lg"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      {paymentSuccess ? (
        /* ✅ SUCCESS VIEW */
        <div className="text-center space-y-4">
          <CheckCircle className="mx-auto text-green-500 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20" />
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
            Payment Successful!
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-gray-600">
            Thank you for your purchase.
          </p>

          <button
            onClick={handleGoToOrders}
            className="mt-4 w-full bg-indigo-600 text-white 
                       py-3 sm:py-3.5 lg:py-4 
                       rounded-xl font-semibold 
                       hover:bg-indigo-700 transition 
                       text-sm sm:text-base lg:text-lg"
          >
            Go to My Orders
          </button>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="text-indigo-600 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
              Stripe Payment
            </h2>
          </div>

          {/* Card Number */}
          <div className="border rounded-xl p-3 sm:p-4 flex items-center gap-2">
            <CreditCard className="text-green-900 w-5 h-5" />
            <CardNumberElement options={elementOptions} className="flex-1" />
          </div>

          {/* Expiry & CVC */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="border rounded-xl p-3 sm:p-4 flex items-center gap-2 flex-1">
              <Calendar className="text-green-900 w-5 h-5" />
              <CardExpiryElement options={elementOptions} className="flex-1" />
            </div>

            <div className="border rounded-xl p-3 sm:p-4 flex items-center gap-2 flex-1">
              <Lock className="text-green-900 w-5 h-5" />
              <CardCvcElement options={elementOptions} className="flex-1" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!stripe || loading || !clientSecret}
            className="w-full flex items-center justify-center gap-2
                       bg-indigo-600 text-white 
                       py-3 sm:py-3.5 lg:py-4 
                       rounded-xl font-semibold 
                       hover:bg-indigo-700 transition 
                       disabled:opacity-50
                       text-sm sm:text-base lg:text-lg"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </>
      )}
    </motion.div>
  );
};

export default CheckoutForm;