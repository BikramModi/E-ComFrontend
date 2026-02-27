import { useEffect, useState } from "react";
import AddProductCard from "./AddProductCard";
import api from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Loader2,
  LayoutGrid,
  PlusCircle,
  AlertCircle,
} from "lucide-react";

const AddProductList = () => {
  const { id } = useParams(); // category id
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setPageLoading(true);
      const res = await api.get("/categories");
      setCategories(res.data.categories || res.data.data || []);
    } catch (err) {
      console.error("Failed to load categories", err);
      toast.error("Failed to load categories");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add product
  const addProduct = async (formData) => {
    try {
      setLoading(true);
      await api.post(`${id}/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Product added successfully ✅");
      navigate(-1);
    } catch (err) {
      console.error("Add product failed", err);
      toast.error(err.response?.data?.message || "Add product failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Full Page Loader
  if (pageLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="flex items-center gap-3 text-base sm:text-lg font-semibold text-gray-700">
          <Loader2 className="animate-spin w-6 h-6" />
          Loading categories...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-indigo-300 min-h-screen py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <PlusCircle className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800">
            Add New Product
          </h1>
        </div>

        {/* Optional Category Info */}
        <div className="flex items-center gap-2 text-xs sm:text-sm  mb-6">
          <LayoutGrid className="w-4 h-4" />
          <span>{categories.length} Categories Available</span>
        </div>

        {/* Form Card Wrapper */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 sm:p-6 md:p-8">
          <AddProductCard
            categories={categories}
            onSubmit={addProduct}
            loading={loading}
          />
        </div>

        {/* Submitting Overlay Loader */}
        {loading && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 text-sm sm:text-base font-medium">
              <Loader2 className="animate-spin w-5 h-5 text-blue-600" />
              Submitting product...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProductList;