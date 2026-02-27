// src/components/landingComponents/OrderList.jsx
import OrderCard from "../common/OrderCard";
import useApi from "../../hooks/useApi";

const OrderList = () => {
  // 🔹 Call API
  const { data: orders, loading, error } = useApi(
    "/orders/getMyOrders", // ⬅️ change to your real endpoint
    {},
    [],
    "orders"
  );

  if (loading)
    return (
      <div className="min-h-[40vh] flex items-center justify-center text-gray-500 text-sm sm:text-base md:text-lg">
        Loading orders...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 mt-10 text-sm sm:text-base md:text-lg">
        Error: {error.message}
      </div>
    );

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center px-4">
        <p className="text-center text-gray-500 text-base sm:text-lg md:text-xl font-medium">
          You have no orders yet 📦
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-4 sm:py-6 md:py-8">
      {/* Heading */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
        My Orders
      </h2>

      {/* Orders */}
      <div className="space-y-4 sm:space-y-5 md:space-y-6">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderList;