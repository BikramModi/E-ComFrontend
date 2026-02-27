// src/pages/EsewaPaymentFailed.jsx
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { XCircle } from "lucide-react";

const errorMap = {
  PaymentNotComplete: "Payment was not completed.",
  MissingPaymentData: "Invalid payment response.",
  OrderNotFound: "Order not found.",
  OrderAlreadyPaid: "Order already paid.",
  VerificationFailed: "Payment verification failed.",
  UserCancelled: "Payment cancelled.",
  ServerError: "Server error during verification."
};

const EsewaPaymentFailed = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = params.get("error");
    const message = errorMap[code] || "Payment failed";

    toast.error(message);

    const timer = setTimeout(() => {
      navigate("/orders");
    }, 3000);

    return () => clearTimeout(timer);
  }, [params, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-indigo-300 px-4">
      <div className="max-w-md sm:max-w-lg md:max-w-xl w-full bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 text-center space-y-6">
        
        {/* Error Icon */}
        <XCircle size={64} className="mx-auto text-red-500" />

        {/* Header */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          Payment Failed ❌
        </h1>

        {/* Message */}
        <p className="text-sm sm:text-base md:text-lg text-gray-600">
          Something went wrong with your payment. You will be redirected to your orders page shortly.
        </p>

        {/* Redirect Notice */}
        <p className="text-sm sm:text-base md:text-lg text-gray-500">
          Redirecting...
        </p>
      </div>
    </div>
  );
};

export default EsewaPaymentFailed;