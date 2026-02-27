import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";
import {
  IndianRupee,
  Package,
  Pencil,
  Trash2,
  Star,
  AlertTriangle,
} from "lucide-react";

const ViewProductCard = ({ product, onDelete }) => {
  const { id } = useParams();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await api.delete(`/${id}/products/${product._id}`);
      toast.success("Product deleted successfully");
      onDelete(product._id);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to delete product"
      );
    }
  };

  return (
    <div className="bg-gray-300 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border p-4 flex flex-col">

      {/* Image */}
      <div className="w-full h-36 sm:h-40 md:h-44 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Name */}
      <h3 className="mt-3 text-base sm:text-lg font-semibold text-gray-800 line-clamp-1">
        {product.name}
      </h3>

      {/* Description */}
      <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mt-1">
        {product.description}
      </p>

      {/* Price & Stock */}
      <div className="mt-3 space-y-1 text-xs sm:text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <IndianRupee className="w-4 h-4 text-green-600" />
          <span className="font-medium">Rs. {product.price}</span>
        </div>

        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-blue-600" />
          <span>Stock: {product.stock}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">

        {/* Update */}
        <Link
          to={`/update-product/${product._id}/${id}`}
          className="flex items-center justify-center gap-1 bg-blue-600 text-white text-xs sm:text-sm py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Pencil className="w-4 h-4" />
          Update
        </Link>

        {/* Delete */}
        <button
          onClick={handleDelete}
          className="flex items-center justify-center gap-1 bg-red-600 text-white text-xs sm:text-sm py-2 rounded-lg hover:bg-red-700 transition"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>

        {/* Reviews */}
        <Link
          to={`/seller-reviews/${product._id}`}
          className="flex items-center justify-center gap-1 bg-indigo-600 text-white text-xs sm:text-sm py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          <Star className="w-4 h-4" />
          Reviews
        </Link>
      </div>
    </div>
  );
};

export default ViewProductCard;