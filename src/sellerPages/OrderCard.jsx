import { Link } from "react-router-dom";
import {
  Eye,
  Pencil,
  Calendar,
  IndianRupee,
  User,
  Mail,
  Hash
} from "lucide-react";

const OrderCard = ({ order }) => {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-gray-300 border border-gray-200 rounded-2xl shadow-sm 
                    hover:shadow-md transition duration-300 
                    p-4 sm:p-6 flex flex-col gap-4">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
        
        <div className="space-y-1">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Hash size={16} className="text-gray-500" />
            Order ID: {order._id}
          </h3>

          <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
            <User size={15} />
            {order.user.name}
          </p>

          <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
            <Mail size={15} />
            {order.user.email}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold self-start
            ${statusStyles[order.status] || "bg-gray-100 text-gray-700"}`}
        >
          {order.status}
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100"></div>

      {/* Info Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-700">
        
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-500" />
          {new Date(order.createdAt).toLocaleDateString()}
        </div>

        <div className="flex items-center gap-2 font-medium">
          <IndianRupee size={16} className="text-gray-500" />
          {order.totalAmount}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        
        <Link
          to={`/order-itemsss/${order._id}`}
          className="flex justify-center items-center gap-2
                     w-full sm:w-auto px-4 py-2
                     text-xs sm:text-sm md:text-base
                     bg-indigo-600 text-white rounded-lg
                     hover:bg-indigo-700 transition"
        >
          <Eye size={16} />
          View Details
        </Link>

        <Link
          to={`/update-status/${order._id}`}
          className="flex justify-center items-center gap-2
                     w-full sm:w-auto px-4 py-2
                     text-xs sm:text-sm md:text-base
                     bg-gray-800 text-white rounded-lg
                     hover:bg-gray-900 transition"
        >
          <Pencil size={16} />
          Update Status
        </Link>
      </div>

    </div>
  );
};

export default OrderCard;