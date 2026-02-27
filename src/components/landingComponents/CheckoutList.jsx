import CheckoutCard from "../common/CheckoutCard";
import useApi from "../../hooks/useApi";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

import {
  ShoppingBag,
  Receipt,
  Truck,
  Percent,
  IndianRupee,
  CreditCard,
} from "lucide-react";

import { toast } from "react-toastify";

const CheckoutList = () => {
  const { data: cartItems, loading, error } = useApi(
    "/cartItems/getCartItems",
    {},
    [],
    "cartItems"
  );

  const navigate = useNavigate();

  if (loading)
    return (
      <div className="flex justify-center items-center h-40 text-gray-600 text-base sm:text-lg lg:text-xl">
        Loading checkout...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 text-sm sm:text-base mt-10">
        Error: {error.message}
      </div>
    );

  if (!cartItems || cartItems.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-20 text-base sm:text-lg lg:text-xl">
        Your cart is empty 🛒
      </p>
    );
  }

  // 🔹 Calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const shipping = 150;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  const handleCheckout = async () => {
    try {
      toast.loading("Placing your order...");
      await api.post("/orders/checkout");
      toast.dismiss();
      toast.success("Order placed successfully 🎉");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      toast.dismiss();
      toast.error("Failed to place order ❌");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 
                    grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* LEFT SECTION */}
      <div className="md:col-span-2">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 
                       mb-6 flex items-center gap-2">
          <ShoppingBag className="text-indigo-600 w-5 h-5 sm:w-6 sm:h-6" />
          Review Your Items
        </h2>

        <div className="space-y-4">
          {cartItems.map((item) => (
            <CheckoutCard key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* RIGHT SECTION - SUMMARY */}
      <div className="bg-blue-300 p-5 sm:p-6 lg:p-8 rounded-2xl shadow-lg border 
                      h-fit md:sticky md:top-24">

        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 
                       mb-4 flex items-center gap-2">
          <Receipt className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
          Order Summary
        </h3>

        <div className="space-y-3 text-sm sm:text-base text-gray-700">

          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <IndianRupee size={16} />
              Subtotal
            </span>
            <span>Rs. {subtotal}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <Truck size={16} />
              Shipping
            </span>
            <span>Rs. {shipping}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <Percent size={16} />
              Tax (5%)
            </span>
            <span>Rs. {tax}</span>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between font-bold 
                          text-lg sm:text-xl text-gray-900">
            <span>Total</span>
            <span className="flex items-center gap-1">
              <IndianRupee size={18} className="text-green-600" />
              {total}
            </span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          className="mt-6 w-full bg-linear-to-r from-green-600 to-emerald-600 
                     text-white py-3 sm:py-3.5 lg:py-4 rounded-xl 
                     font-semibold text-sm sm:text-base lg:text-lg
                     hover:scale-105 transition flex items-center 
                     justify-center gap-2"
        >
          <CreditCard className="w-5 h-5" />
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutList;