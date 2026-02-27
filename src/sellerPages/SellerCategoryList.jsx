import { useEffect, useState } from "react";
import SellerCategoryCard from "./SellerCategoryCard";
import api from "../api/axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const SellerCategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      await api.delete(`/categories/${id}`);
      toast.success("Category deleted successfully ✅");
      setCategories((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 animate-pulse">
          Loading Categories...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-300 px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
              My Categories
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-1">
              Manage your product categories efficiently.
            </p>
          </div>

          <Link
            to="/create-category"
            className="inline-flex justify-center items-center px-5 py-2.5 
                       bg-blue-600 text-white text-sm sm:text-base 
                       rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            + Create Category
          </Link>
        </div>

        {/* Categories Grid */}
        {categories.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <p className="text-gray-600 text-sm sm:text-base">
              No categories found.
            </p>
          </div>
        ) : (
          <div
            className="grid gap-4 sm:gap-6
                       grid-cols-1
                       sm:grid-cols-2
                       lg:grid-cols-3"
          >
            {categories.map((cat) => (
              <SellerCategoryCard
                key={cat._id}
                {...cat}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerCategoryList;