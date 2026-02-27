import { Package, IndianRupee, Hash, Receipt } from "lucide-react";

const OrderItemCards = ({ item }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 border border-gray-200 rounded-2xl p-4 sm:p-5 bg-gray-300 shadow-sm hover:shadow-md transition">

      {/* Product Image */}
      <div className="flex justify-center sm:justify-start">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 space-y-2 text-center sm:text-left">

        {/* Product Name */}
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <Package className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
            {item.product.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
          {item.product.description}
        </p>

        {/* Price & Quantity Section */}
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">

          <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-600">
            <IndianRupee className="w-4 h-4 text-green-600" />
            <span>Price: Rs. {item.price}</span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-600">
            <Hash className="w-4 h-4 text-blue-600" />
            <span>Quantity: {item.quantity}</span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2 font-semibold text-gray-800 sm:col-span-2">
            <Receipt className="w-4 h-4 text-indigo-600" />
            <span>
              Subtotal: Rs. {item.price * item.quantity}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderItemCards;