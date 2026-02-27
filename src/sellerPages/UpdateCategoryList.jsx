import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UpdateCategoryCard from "./UpdateCategoryCard";
import api from "../api/axios";
import { toast } from "react-toastify";
import {
  Loader2,
  FolderEdit,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";

const UpdateCategoryList = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch single category
  const fetchCategory = async () => {
    try {
      const res = await api.get(`/categories/${id}`);
      setCategory(res.data.data);
    } catch (err) {
      console.error("Failed to fetch category", err);
      toast.error("Failed to load category");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  // Update category
  const updateCategory = async (payload) => {
    try {
      await api.patch(`/categories/${id}`, payload);
      toast.success("Category updated successfully ✅");

      setCategory((prev) => ({ ...prev, ...payload }));
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Failed to update category");
    }
  };

  // ✅ Loading State
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-100">
        <div className="flex items-center gap-3 text-base sm:text-lg font-semibold text-gray-700">
          <Loader2 className="w-6 h-6 animate-spin" />
          Loading category...
        </div>
      </div>
    );
  }

  // ❌ Not Found State
  if (!category) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-100 text-gray-600">
        <AlertTriangle className="w-12 h-12 mb-3 text-red-500" />
        <p className="text-base sm:text-lg font-medium">
          Category not found
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 flex items-center gap-2 text-sm sm:text-base text-blue-600 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-300 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm sm:text-base text-gray-700 hover:text-black mb-5 transition"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          Back
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <FolderEdit className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800">
            Update Category
          </h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 md:p-8">
          <UpdateCategoryCard
            category={category}
            onUpdate={updateCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateCategoryList;