// src/components/common/OrderItemCard.jsx
import { ShoppingCart, PackageCheck, Tag } from "lucide-react";

const OrderItemCard = ({ item }) => {
  return (
    <div className="
      flex flex-col sm:flex-row gap-4 bg-white p-3 sm:p-4 md:p-5 rounded-xl shadow-md border
      hover:scale-[1.01] hover:shadow-lg transition
    ">

      {/* Product Image */}
      <div className="w-full sm:w-20 h-24 sm:h-20 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="h-full object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between">
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 line-clamp-2">
          {item.product.name}
        </h3>

        <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:gap-4 text-gray-600 text-xs sm:text-sm md:text-base">
          <span className="flex items-center gap-1">
            <PackageCheck size={14} className="text-green-600" />
            Qty: <span className="font-medium">{item.quantity}</span>
          </span>

          {item.product.discount > 0 && (
            <span className="flex items-center gap-1 text-red-500 font-semibold mt-1 sm:mt-0 text-xs sm:text-sm md:text-base">
              <Tag size={14} /> {item.product.discount}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Price */}
      <div className="flex justify-between sm:flex-col sm:items-end mt-3 sm:mt-0 text-right">
        <p className="text-xs sm:text-sm md:text-base text-gray-500">Price</p>
        <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
          Rs. {item.product.price * item.quantity}
        </p>
      </div>
    </div>
  );
};

export default OrderItemCard;