// src/components/common/OrderCard.jsx
import { Link } from "react-router-dom";
import { CreditCard, Truck, DollarSign, CheckCircle } from "lucide-react";

const OrderCard = ({ order }) => {
  const statusColor =
    order.status === "paid"
      ? "bg-green-100 text-green-700"
      : order.status === "pending"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-gray-100 text-gray-700";

  return (
    <div className="
      bg-blue-200 rounded-2xl shadow-lg border p-4 sm:p-5 md:p-6
      hover:scale-[1.03] hover:bg-blue-100 hover:shadow-xl transition
      mb-6
    ">

      {/* Order Info */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
        {/* Left */}
        <div>
          <p className="text-xs sm:text-sm text-gray-400">Order ID</p>
          <p className="font-semibold text-gray-800 flex items-center gap-2 text-sm sm:text-base md:text-lg">
            <CheckCircle size={16} className="text-green-500" />
            {order._id}
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Right */}
        <div className="text-left md:text-right">
          <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900 flex items-center justify-start md:justify-end gap-1">
            <DollarSign size={16} className="text-indigo-600" />
            Rs. {order.totalAmount}
          </p>

          <span
            className={`inline-block mt-1 px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold rounded-full ${statusColor}`}
          >
            {order.status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Payment Buttons */}
      {order.status !== "paid" && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          <Link to={`/pay-stripe/${order._id}/${order.totalAmount}`}>
            <button className="w-full bg-indigo-600 text-white flex items-center justify-center gap-1 sm:gap-2 py-2 rounded-lg text-xs sm:text-sm hover:bg-indigo-700 transition">
              <CreditCard size={14} /> Stripe
            </button>
          </Link>

          <Link to={`/pay-esewa/${order._id}/${order.totalAmount}`}>
            <button className="w-full bg-indigo-600 text-white flex items-center justify-center gap-1 sm:gap-2 py-2 rounded-lg text-xs sm:text-sm hover:bg-indigo-700 transition">
              <DollarSign size={14} /> eSewa
            </button>
          </Link>

          <Link to={`/pay-khalti/${order._id}/${order.totalAmount}`}>
            <button className="w-full bg-indigo-600 text-white flex items-center justify-center gap-1 sm:gap-2 py-2 rounded-lg text-xs sm:text-sm hover:bg-indigo-700 transition">
              <DollarSign size={14} /> Khalti
            </button>
          </Link>

          <Link to={`/pay-cod/${order._id}/${order.totalAmount}`}>
            <button className="w-full bg-indigo-600 text-white flex items-center justify-center gap-1 sm:gap-2 py-2 rounded-lg text-xs sm:text-sm hover:bg-indigo-700 transition">
              <Truck size={14} /> COD
            </button>
          </Link>
        </div>
      )}

      {/* View Order */}
      <Link
        to={`/order-items/${order._id}`}
        className="block mt-3 sm:mt-4 text-center text-xs sm:text-sm md:text-base text-blue-600 hover:underline"
      >
        View Order Details
      </Link>
    </div>
  );
};

export default OrderCard;