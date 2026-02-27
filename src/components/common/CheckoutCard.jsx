import { Package, Hash, IndianRupee } from "lucide-react";

const CheckoutCard = ({ item }) => {
  const subtotal = item.product.price * item.quantity;

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center gap-4 
                 bg-blue-300 p-4 sm:p-5 lg:p-6 
                 rounded-2xl shadow-md border
                 transition
                 sm:hover:scale-[1.02]
                 sm:hover:bg-blue-200
                 sm:hover:shadow-lg"
    >
      {/* Image */}
      <div className="w-full sm:w-24 h-24 sm:h-24 
                      bg-linear-to-br from-gray-100 to-gray-200 
                      rounded-xl overflow-hidden 
                      flex items-center justify-center 
                      shrink-0">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="h-full object-contain"
        />
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3
          className="text-sm sm:text-base lg:text-lg 
                     font-semibold text-gray-800 
                     line-clamp-2 flex items-center gap-2"
        >
          <Package className="text-indigo-600 w-4 h-4 sm:w-5 sm:h-5" />
          {item.product.name}
        </h3>

        <div
          className="mt-2 text-xs sm:text-sm lg:text-base 
                     text-gray-600 flex items-center gap-1"
        >
          <Hash className="text-gray-500 w-4 h-4" />
          Qty: <span className="font-semibold">{item.quantity}</span>
        </div>
      </div>

      {/* Price */}
      <div className="sm:text-right mt-3 sm:mt-0">
        <p className="text-xs sm:text-sm text-gray-500">Subtotal</p>
        <p
          className="text-base sm:text-lg lg:text-xl 
                     font-bold text-gray-900 
                     flex items-center sm:justify-end gap-1"
        >
          <IndianRupee className="text-green-600 w-4 h-4 sm:w-5 sm:h-5" />
          {subtotal}
        </p>
      </div>
    </div>
  );
};

export default CheckoutCard;