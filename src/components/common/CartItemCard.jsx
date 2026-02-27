// src/components/common/CartItemCard.jsx
import React from "react";
import { Plus, Minus, Trash2 } from "lucide-react";

const CartItemCard = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="
      bg-gray-300 
      flex flex-col sm:flex-row 
      items-start sm:items-center 
      gap-4 p-4 sm:p-5 
      border rounded-lg shadow 
      hover:scale-[1.01] hover:shadow-lg 
      transition
    ">

      {/* Product Image */}
      <div className="w-full sm:w-24 h-32 sm:h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <h3 className="font-semibold text-base sm:text-lg md:text-xl text-gray-800 line-clamp-2">
          {item.product.name}
        </h3>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">
          Rs. {item.product.price}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => onDecrease(item._id)}
            className="p-1 sm:p-2 border rounded cursor-pointer hover:bg-gray-100 transition"
          >
            <Minus size={14} className="sm:w-4 sm:h-4" />
          </button>

          <span className="px-3 py-1 sm:px-4 sm:py-1.5 border rounded text-gray-700 font-medium text-sm sm:text-base">
            {item.quantity}
          </span>

          <button
            onClick={() => onIncrease(item._id)}
            className="p-1 sm:p-2 border rounded cursor-pointer hover:bg-gray-100 transition"
          >
            <Plus size={14} className="sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item._id)}
        className="p-2 sm:p-3 rounded-full cursor-pointer hover:bg-red-100 transition mt-3 sm:mt-0 ml-auto"
      >
        <Trash2 size={18} className="text-red-600 hover:text-red-800 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
};

export default CartItemCard;