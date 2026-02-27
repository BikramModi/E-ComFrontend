import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, Hash, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

const KhaltiPaymentSuccess = () => {
  const [params] = useSearchParams();
  const orderId = params.get("orderId");
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6"
    >
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 space-y-6 text-center">
        
        {/* Success Icon */}
        <CheckCircle 
          size={64} 
          className="mx-auto text-red-500 sm:w-16 sm:h-16 lg:w-20 lg:h-20" 
        />

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
          Payment Successful!
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600">
          Your order has been paid successfully via Khalti.
        </p>

        {/* Order Info */}
        <div className="bg-green-50 p-3 sm:p-4 lg:p-5 rounded-lg flex items-center justify-center gap-2 text-gray-700 font-medium text-sm sm:text-base lg:text-lg">
          <Hash size={18} className="text-red-600 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
          <span>
            Order ID: <span className="font-semibold text-gray-900">{orderId}</span>
          </span>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center justify-center gap-2 w-full bg-red-600
          cursor-pointer
          text-white py-3 sm:py-3.5 lg:py-4 rounded-xl font-semibold hover:bg-red-700 transition text-sm sm:text-base lg:text-lg"
        >
          <ShoppingCart size={20} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
          Go to My Orders
        </button>
      </div>
    </motion.div>
  );
};

export default KhaltiPaymentSuccess;