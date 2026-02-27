// src/components/SingleProductDescriptionCard.jsx
import React from "react";
import {
  ShoppingCart,
  Zap,
  BadgePercent,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../protectedRoutes/CartContext";

const SingleProductDescriptionCard = ({ item }) => {
  if (!item) return null;

  const {
    _id,
    name,
    description,
    price,
    originalPrice,
    discount,
    stock,
    image,
  } = item;

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      const res = await addToCart(_id, 1);
      const message =
        res.message ||
        (res.updated
          ? "Quantity increased in cart 🛒"
          : "Added to cart successfully 🛒");

      message.toLowerCase().includes("quantity")
        ? toast.info("Quantity increased in cart 🛒")
        : toast.success("Added to cart successfully 🛒");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add to cart ❌");
    }
  };

  const handleBuyNow = async (e) => {
    e.preventDefault();
    try {
      await addToCart(_id, 1);
      navigate("/cart");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add to cart ❌");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center 
                    bg-linear-to-br from-indigo-50 via-white to-pink-50 
                    px-4 sm:px-6 lg:px-8 py-8">

      <div className="bg-indigo-300 backdrop-blur-xl 
                      rounded-2xl sm:rounded-3xl 
                      shadow-xl border border-white/60 
                      p-5 sm:p-8 lg:p-10 
                      max-w-6xl w-full 
                      grid grid-cols-1 md:grid-cols-2 
                      gap-8 lg:gap-12">

        {/* 🖼️ Image */}
        <div className="relative flex items-center justify-center 
                        bg-white rounded-xl sm:rounded-2xl 
                        p-4 sm:p-6 shadow-inner">

          {discount > 0 && (
            <span className="absolute top-3 left-3 
                             flex items-center gap-1 
                             bg-red-500 text-white 
                             text-xs sm:text-sm 
                             font-bold px-3 py-1 rounded-full shadow">
              <BadgePercent className="w-3 h-3 sm:w-4 sm:h-4" />
              {discount}% OFF
            </span>
          )}

          <img
            src={image}
            alt={name}
            className="max-h-64 sm:max-h-80 lg:max-h-96 
                       object-contain 
                       transition duration-300 
                       hover:scale-105"
          />
        </div>

        {/* 📄 Details */}
        <div className="flex flex-col justify-between">

          <div className="space-y-4 sm:space-y-5">

            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 
                           font-extrabold text-gray-900 leading-tight">
              {name}
            </h1>

            <p className="text-gray-600 
                          text-sm sm:text-base lg:text-lg 
                          leading-relaxed">
              {description}
            </p>

            {/* Price */}
            <div className="flex items-end gap-3 sm:gap-4">
              <span className="text-2xl sm:text-3xl lg:text-4xl 
                               font-extrabold text-green-600">
                Rs. {price}
              </span>

              {originalPrice && (
                <span className="text-sm sm:text-lg lg:text-xl 
                                 text-gray-400 line-through">
                  Rs. {originalPrice}
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 
                            text-xs sm:text-sm lg:text-base 
                            font-semibold">
              <PackageCheck
                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  stock > 0 ? "text-green-600" : "text-red-500"
                }`}
              />
              <span
                className={
                  stock > 0 ? "text-green-600" : "text-red-500"
                }
              >
                {stock > 0 ? `In Stock (${stock})` : "Out of Stock"}
              </span>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 pt-3 
                            text-xs sm:text-sm lg:text-base 
                            text-gray-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                Secure Payment
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600" />
                Fast Delivery
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 sm:mt-10 
                          flex flex-col sm:flex-row 
                          gap-4">

            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 
                         bg-gray-900 text-white 
                         py-3 sm:py-4 
                         text-sm sm:text-base lg:text-lg
                         rounded-xl font-semibold 
                         hover:bg-gray-800 transition 
                         shadow-lg hover:shadow-xl 
                         active:scale-[0.98]"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-1 flex items-center justify-center gap-2 
                         bg-linear-to-r from-orange-500 to-pink-500 
                         text-white 
                         py-3 sm:py-4 
                         text-sm sm:text-base lg:text-lg
                         rounded-xl font-semibold 
                         hover:opacity-90 transition 
                         shadow-lg hover:shadow-xl 
                         active:scale-[0.98]"
            >
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
              Buy Now
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductDescriptionCard;