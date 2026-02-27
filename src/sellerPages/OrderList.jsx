import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import api from "../api/axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/adminonly");
      setOrders(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 animate-pulse">
          Loading orders...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-300 px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Orders
          </h1>

          <div className="text-sm sm:text-base md:text-lg font-medium bg-white px-4 py-2 rounded-lg shadow-sm">
            Total Orders: <span className="font-bold">{orders.length}</span>
          </div>
        </div>

        {/* Orders Content */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <p className="text-gray-600 text-sm sm:text-base">
              You have no orders yet.
            </p>
          </div>
        ) : (
          <div
            className="grid gap-4 sm:gap-6
                       grid-cols-1
                       sm:grid-cols-2
                       xl:grid-cols-3"
          >
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;