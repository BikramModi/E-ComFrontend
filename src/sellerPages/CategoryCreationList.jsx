import { Link } from "react-router-dom";
import { ArrowLeft, FolderPlus } from "lucide-react";
import CategoryCreationCard from "./CategoryCreationCard";

const CategoryCreationList = () => {
  return (
    <div className="min-h-screen bg-indigo-300 px-4 sm:px-6 lg:px-8 py-8">

      <div className="max-w-4xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          {/* Title */}
          <div className="flex items-center gap-3">
            <FolderPlus size={28} className="text-indigo-600" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
              Create Category
            </h1>
          </div>

          {/* Back Button */}
          <Link
            to="/seller/category"
            className="flex items-center gap-2 
                       text-sm sm:text-base md:text-lg
                       text-indigo-600 hover:text-indigo-800 
                       transition font-medium"
          >
            <ArrowLeft size={18} />
            Back to Categories
          </Link>
        </div>

        {/* Card Section */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 md:p-8">
          <CategoryCreationCard />
        </div>

      </div>
    </div>
  );
};

export default CategoryCreationList;