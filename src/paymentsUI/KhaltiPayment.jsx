import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";
import { CreditCard, Hash, DollarSign, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const KhaltiPayment = () => {
  const { id, amount } = useParams(); // get from URL
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Auto verify if pidx exists in URL
    const params = new URLSearchParams(window.location.search);
    const pidx = params.get("pidx");
    if (pidx) {
      verifyPayment(pidx);
    }
  }, []);

  // Initiate payment
  const handleInitiatePayment = async () => {
    if (!id || !amount) {
      toast.error("Order ID or amount missing");
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.post(
        "/payment/khalti/initiate",
        { 
          amount: Number(amount),
          orderId: id
        }
      );

      toast.success("Payment initiated! Redirecting to Khalti...");
      window.location.href = data.payment_url;

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Verify payment
  const verifyPayment = async (pidx) => {
    try {
      setLoading(true);
      const { data } = await api.post("/payment/khalti/verify", { pidx });
      toast.success(data.message);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-indigo-300 px-4 sm:px-6"
    >
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-blue-300 rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <CreditCard size={48} className="mx-auto text-red-600 sm:w-14 sm:h-14 lg:w-16 lg:h-16" />
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">Khalti Payment</h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">
            Complete your payment securely via Khalti
          </p>
        </div>

        {/* Order Info */}
        <div className="bg-blue-50 p-4 sm:p-6 rounded-lg space-y-3">
          <p className="flex items-center gap-2 text-gray-700 font-medium text-sm sm:text-base lg:text-lg">
            <Hash size={18} className="text-red-600" />
            Order ID: <span className="font-semibold text-gray-900">{id}</span>
          </p>
          <p className="flex items-center gap-2 text-gray-700 font-medium text-sm sm:text-base lg:text-lg">
            <DollarSign size={18} className="text-green-600" />
            Amount: <span className="font-semibold text-gray-900">NPR {amount}</span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleInitiatePayment}
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full bg-red-600
            cursor-pointer
            text-white py-3 sm:py-3.5 lg:py-4 rounded-xl font-semibold hover:bg-red-700 transition disabled:opacity-60 text-sm sm:text-base lg:text-lg"
          >
            {loading ? "Processing..." : "Pay with Khalti"}
            <ArrowRight size={18} />
          </button>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 w-full border
            cursor-pointer
            border-gray-300 text-gray-700 py-3 sm:py-3.5 lg:py-4 rounded-xl font-semibold hover:bg-gray-100 transition text-sm sm:text-base lg:text-lg"
          >
            Back
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default KhaltiPayment;