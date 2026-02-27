// src/components/landingComponents/OrderItemList.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrderItemCard from "../common/OrderItemCard";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const OrderItemList = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch order items
  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/orders/getMyOrder/${id}`);
        const orderItems = res.data.data?.items || res.data.items || [];
        setItems(orderItems);

        if (orderItems.length === 0) {
          toast.info("No items found in this order 📦");
        }
      } catch (err) {
        const msg = err.response?.data?.message || err.message;
        toast.error(`Failed to load order items ❌: ${msg}`);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrderItems();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[40vh] px-4">
        <p className="text-gray-500 animate-pulse text-sm sm:text-base md:text-lg">
          Loading order items...
        </p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10 space-y-6">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="
          flex items-center gap-2 
          text-indigo-600 font-semibold
          cursor-pointer
          hover:text-indigo-800 transition
          text-sm sm:text-base md:text-lg
        "
      >
        <ArrowLeft size={16} className="sm:mr-1" />
        Back to Orders
      </button>

      {/* Header */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        Order Items
      </h2>

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="text-center py-10 text-gray-500 text-sm sm:text-base md:text-lg">
          No items in this order.
        </div>
      ) : (
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <OrderItemCard item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export default OrderItemList;