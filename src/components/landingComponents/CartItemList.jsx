import { useState, useEffect } from "react";
import CartItemCard from "../common/CartItemCard";
import useApi from "../../hooks/useApi";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartItemList = () => {
  const { data, loading, error } = useApi(
    "/cartItems/getCartItems",
    {},
    [],
    "cartItems"
  );

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(data)) setCartItems(data);
  }, [data]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[40vh] text-gray-500 text-sm sm:text-base md:text-lg">
        Loading your cart...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 mt-10 text-sm sm:text-base">
        Error: {error.message}
      </div>
    );

  // ================================
  // Increase Quantity
  // ================================
  const increaseQty = async (id) => {
    const item = cartItems.find((i) => i._id === id);
    if (!item) return;

    const newQty = item.quantity + 1;

    setCartItems((items) =>
      items.map((i) => (i._id === id ? { ...i, quantity: newQty } : i))
    );

    try {
      await api.patch(`/cartItems/${id}`, { quantity: newQty });
      toast.success(`Quantity increased for ${item.product.name}`);
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };

  // ================================
  // Decrease Quantity
  // ================================
  const decreaseQty = async (id) => {
    const item = cartItems.find((i) => i._id === id);
    if (!item || item.quantity <= 1) return;

    const newQty = item.quantity - 1;

    setCartItems((items) =>
      items.map((i) => (i._id === id ? { ...i, quantity: newQty } : i))
    );

    try {
      await api.patch(`/cartItems/${id}`, { quantity: newQty });
      toast.info(`Quantity decreased for ${item.product.name}`);
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };

  // ================================
  // Remove Item
  // ================================
  const removeItem = async (id) => {
    const item = cartItems.find((i) => i._id === id);
    if (!item) return;

    const confirm = window.confirm(
      `⚠️ Are you sure you want to remove "${item.product.name}" from cart?`
    );
    if (!confirm) return;

    setCartItems((items) => items.filter((i) => i._id !== id));

    try {
      await api.delete(`/cartItems/${id}`);
      toast.success(`${item.product.name} removed from cart`);
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // ================================
  // Empty Cart
  // ================================
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center px-4">
        <p className="text-center text-gray-500 text-base sm:text-lg md:text-xl font-medium">
          Your cart is empty 🛒
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 space-y-6">

      {/* Cart Items */}
      {cartItems.map((item) => (
        <CartItemCard
          key={item._id}
          item={item}
          onIncrease={increaseQty}
          onDecrease={decreaseQty}
          onRemove={removeItem}
        />
      ))}

      {/* Total Section */}
      <div className="
        mt-6 
        flex 
        flex-col 
        sm:flex-row 
        justify-between 
        items-center 
        gap-4
        border-t 
        pt-6
        bg-blue-50 
        p-4 sm:p-6 
        shadow-sm 
        rounded-xl
      ">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 text-center sm:text-left">
          Total: Rs. {total}
        </h2>

        <button
          className="
            w-full sm:w-auto
            bg-blue-600 
            text-white 
            px-6 
            py-2.5 
            text-sm sm:text-base md:text-lg
            rounded-full
            hover:scale-105 
            transition 
            hover:bg-blue-700
          "
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItemList;