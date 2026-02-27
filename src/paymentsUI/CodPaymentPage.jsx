import React from 'react';
import { CheckCircle, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const CodPaymentPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6"
    >
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 text-center space-y-6">
        
        {/* Icon */}
        <CheckCircle className="mx-auto text-green-500 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24" />

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
          Cash on Delivery
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base lg:text-lg text-gray-600">
          Thank you for choosing Cash on Delivery! Your order will be processed and delivered soon.
        </p>

        {/* Optional note */}
        <p className="text-sm sm:text-base lg:text-lg text-gray-500">
          Please have the exact amount ready at the time of delivery.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => window.location.href = "/orders"}
          className="flex items-center justify-center gap-2 w-full bg-red-600
          text-white py-3 sm:py-3.5 lg:py-4 rounded-xl font-semibold hover:bg-red-700 transition text-sm sm:text-base lg:text-lg"
        >
          <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 lg:w-6 lg:h-6" />
          Go to My Orders
        </button>

      </div>
    </motion.div>
  );
};

export default CodPaymentPage;