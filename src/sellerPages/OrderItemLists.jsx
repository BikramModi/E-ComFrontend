import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Package,
  Loader2,
  Inbox,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";
import OrderItemCards from "./OrderItemCards";
import api from "../api/axios";

const OrderItemLists = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrderItems = async () => {
    try {
      const res = await api.get(`/orders/${id}/adminonly`);
      setItems(res.data.items || []);
    } catch (err) {
      console.error("Failed to load order items", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderItems();
  }, [id]);

  // 🔄 Loading State
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-indigo-300">
        <div className="flex items-center gap-3 text-base sm:text-lg md:text-xl font-semibold text-gray-700">
          <Loader2 className="animate-spin w-6 h-6" />
          Loading order items...
        </div>
      </div>
    );
  }

  // 📦 Empty State
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-100 text-gray-500">
        <Inbox className="w-12 h-12 mb-3 opacity-70" />
        <p className="text-base sm:text-lg font-semibold">
          No items found in this order.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 flex items-center gap-2 text-blue-600 hover:underline text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-300 px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto">

        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm sm:text-base text-gray-700 hover:text-black mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          Back
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-600" />
            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-800">
              Ordered Items
            </h1>
          </div>

          <div className="text-xs sm:text-sm md:text-base font-medium bg-white px-4 py-2 rounded-xl shadow-sm flex items-center gap-2">
            <Package className="w-4 h-4 text-indigo-600" />
            Total Items:
            <span className="font-bold">{items.length}</span>
          </div>
        </div>

        {/* Items Grid */}
        <div
          className="grid gap-4 sm:gap-6
                     grid-cols-1
                     sm:grid-cols-2
                     lg:grid-cols-3
                     xl:grid-cols-4"
        >
          {items.map((item) => (
            <OrderItemCards key={item._id} item={item} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default OrderItemLists;