import { Link } from "react-router-dom";
import { Folder, Eye, Pencil, Trash2 } from "lucide-react";

const SellerCategoryCard = ({ _id, name, onDelete }) => {
  return (
    <div className="bg-gray-300 border border-gray-200 rounded-xl p-4 sm:p-5 
                    shadow-sm hover:shadow-md transition-all duration-300 
                    flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

      {/* Category Info */}
      <div className="flex items-start sm:items-center gap-3">
        
        {/* Icon */}
        <div className="bg-white p-2 rounded-lg shadow-sm">
          <Folder size={22} className="text-indigo-600" />
        </div>

        <div>
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
            {name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage products under this category
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">

        <Link
          to={`/view-product/${_id}`}
          className="flex items-center justify-center gap-2 
                     px-4 py-2 text-xs sm:text-sm 
                     bg-indigo-600 text-white rounded-lg 
                     hover:bg-indigo-700 transition"
        >
          <Eye size={16} />
          View
        </Link>

        <Link
          to={`/update/category/${_id}`}
          className="flex items-center justify-center gap-2 
                     px-4 py-2 text-xs sm:text-sm 
                     bg-blue-600 text-white rounded-lg 
                     hover:bg-blue-700 transition"
        >
          <Pencil size={16} />
          Update
        </Link>

        <button
          onClick={() => onDelete(_id)}
          className="flex items-center justify-center gap-2 
                     px-4 py-2 text-xs sm:text-sm 
                     bg-red-600 text-white rounded-lg 
                     hover:bg-red-700 transition"
        >
          <Trash2 size={16} />
          Delete
        </button>

      </div>
    </div>
  );
};

export default SellerCategoryCard;