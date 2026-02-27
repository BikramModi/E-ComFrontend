import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../protectedRoutes/CartContext";
import { toast } from "react-toastify";

const FlashSaleCard = ({
  category,
  _id,
  image,
  name,
  stock,
  price,
  originalPrice,
  discount,
}) => {
  const { addToCart } = useCart();

  const showDiscount =
    originalPrice &&
    originalPrice > 0 &&
    originalPrice > price &&
    discount > 0;

  const handleAddToCart = async (e) => {
    e.preventDefault();

    try {
      const res = await addToCart(_id, 1);

      const message =
        res.message ||
        (res.updated
          ? "Quantity increased in cart 🛒"
          : "Added to cart successfully 🛒");

      if (message.toLowerCase().includes("quantity")) {
        toast.info("Quantity increased in cart 🛒");
      } else {
        toast.success("Added to cart successfully 🛒");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add to cart ❌");
    }
  };

  return (
    <Link to={`/single-product/${category}/${_id}`}>
      <div className="
        relative 
        bg-indigo-400 
        rounded-xl 
        shadow-sm 
        hover:shadow-xl 
        transition-all 
        duration-300 
        p-3 sm:p-4 
        flex 
        flex-col 
        hover:-translate-y-1 
        cursor-pointer
      ">

        {/* Discount Badge */}
        {showDiscount && (
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}

        {/* Image */}
        <div className="w-full h-28 sm:h-32 md:h-40 lg:h-44 flex items-center justify-center mb-3">
          <img
            src={image}
            alt={name}
            className="h-full object-contain"
          />
        </div>

        {/* Product Name */}
        <h3 className="
          text-xs 
          sm:text-sm 
          md:text-base 
          font-semibold 
          text-gray-800 
          text-center 
          line-clamp-2 
          min-h-10
        ">
          {name}
        </h3>

        {/* Stock */}
        <p
          className={`
            text-[11px] 
            sm:text-xs 
            md:text-sm 
            text-center 
            mt-1 
            font-semibold
            ${stock > 0 ? "text-green-700" : "text-red-600"}
          `}
        >
          {stock > 0 ? `In Stock: ${stock}` : "Out of Stock"}
        </p>

        {/* Price Section */}
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="text-sm sm:text-base md:text-lg font-bold text-red-600">
            Rs. {price}
          </span>

          {showDiscount && (
            <span className="text-xs sm:text-sm text-gray-400 line-through">
              Rs. {originalPrice}
            </span>
          )}
        </div>

        {/* Add To Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={stock <= 0}
          className={`
            mt-3 sm:mt-4 
            w-full 
            py-1.5 sm:py-2 
            text-xs sm:text-sm md:text-base 
            rounded-lg 
            font-semibold 
            transition
            ${
              stock > 0
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }
          `}
        >
          {stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </Link>
  );
};

export default FlashSaleCard;