import { useState } from "react";
import {
  Package,
  Hash,
  IndianRupee,
  Truck,
  RefreshCcw,
} from "lucide-react";

const UpdateStatusCard = ({ order, onUpdate }) => {
  const [status, setStatus] = useState(order.status);

  const handleSubmit = () => {
    onUpdate(status);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-600";
      case "processing":
        return "text-blue-600";
      case "shipped":
        return "text-purple-600";
      case "delivered":
        return "text-green-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="border border-gray-200 rounded-2xl p-4 sm:p-6 md:p-8 bg-white shadow-md max-w-xl mx-auto">

      {/* Header */}
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 flex items-center justify-center gap-2 text-gray-800">
        <RefreshCcw className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
        Update Order Status
      </h2>

      {/* Order Details */}
      <div className="space-y-3 text-xs sm:text-sm md:text-base text-gray-700">

        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-indigo-600" />
          <span><b>Order ID:</b> {order._id}</span>
        </div>

        <div className="flex items-center gap-2">
          <IndianRupee className="w-4 h-4 text-green-600" />
          <span><b>Total:</b> Rs. {order.totalAmount}</span>
        </div>

        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-blue-600" />
          <span>
            <b>Current Status:</b>{" "}
            <span className={`font-semibold ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </span>
        </div>
      </div>

      {/* Select New Status */}
      <div className="mt-6">
        <label className="block mb-2 font-semibold text-sm sm:text-base text-gray-800">
          New Status
        </label>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Button */}
      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-green-600 text-white py-2.5 sm:py-3 rounded-xl
         text-sm sm:text-base font-semibold
         hover:bg-green-700 transition shadow-sm hover:shadow-md"
      >
        Update Status
      </button>
    </div>
  );
};

export default UpdateStatusCard;