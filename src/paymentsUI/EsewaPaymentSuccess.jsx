// src/pages/EsewaPaymentSuccess.jsx
import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, PackageCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const EsewaPaymentSuccess = () => {
  const [params] = useSearchParams();
  const orderId = params.get("orderId");
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-indigo-300 px-4"
    >
      <div className="max-w-md sm:max-w-lg md:max-w-xl w-full bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 text-center space-y-6">
        
        {/* Success Icon */}
        <CheckCircle size={64} className="mx-auto text-green-500" />

        {/* Header */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          Payment Successful!
        </h1>

        {/* Order Info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-gray-700 font-medium bg-green-50 p-3 sm:p-4 rounded-lg">
          <PackageCheck size={18} className="text-green-600" />
          <span className="text-sm sm:text-base md:text-lg">Your order ID:</span>
          <span className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg">
            {orderId}
          </span>
        </div>

        {/* Message */}
        <p className="text-sm sm:text-base md:text-lg text-gray-600">
          Thank you for your purchase! Your payment has been processed successfully.
        </p>

        {/* Go to Orders Button */}
        <button
          onClick={() => navigate("/orders")}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-green-500
          cursor-pointer
          text-white py-3 sm:py-3.5 md:py-4 rounded-xl font-semibold text-sm sm:text-base md:text-lg
          hover:bg-green-600 transition"
        >
          <ArrowRight size={18} />
          Go to My Orders
        </button>
      </div>
    </motion.div>
  );
};

export default EsewaPaymentSuccess;