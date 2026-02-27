import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UpdateProductCard from "./UpdateProductCard";
import api from "../api/axios";
import { toast } from "react-toastify";
import {
  Loader2,
  Package,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";

const UpdateProductList = () => {
  const { id, productId } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: null,
    preview: "",
  });

  // Load categories + product
  useEffect(() => {
    const loadData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          api.get("/categories"),
          api.get(`${id}/products/${productId}`),
        ]);

        const product =
          prodRes.data.product || prodRes.data.data;

        setCategories(
          catRes.data.categories || catRes.data.data || []
        );

        setForm({
          name: product.name || "",
          description: product.description || "",
          price: product.price || "",
          originalPrice: product.originalPrice || "",
          stock: product.stock || "",
          category:
            product.category?._id ||
            product.category ||
            "",
          image: null,
          preview: product.image || "",
        });

        setPageLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load product");
        setPageLoading(false);
      }
    };

    loadData();
  }, [id, productId]);

  // Update product
  const updateProduct = async (formData) => {
    try {
      setLoading(true);

      await api.patch(
        `/${id}/products/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Product updated successfully ✅");
      navigate(-1);
    } catch (err) {
      console.error("Update failed", err);
      toast.error(
        err.response?.data?.message || "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Loading State
  if (pageLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-100">
        <div className="flex items-center gap-3 text-base sm:text-lg font-semibold text-gray-700">
          <Loader2 className="w-6 h-6 animate-spin" />
          Loading product...
        </div>
      </div>
    );
  }

  // ❌ Safety fallback
  if (!form.name) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-100 text-gray-600">
        <AlertTriangle className="w-12 h-12 mb-3 text-red-500" />
        <p className="text-base sm:text-lg font-medium">
          Product not found
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
      <div className="max-w-5xl mx-auto">

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
          <Package className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800">
            Update Product
          </h1>
        </div>

        {/* Form Card Wrapper */}
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 md:p-8">
          <UpdateProductCard
            categories={categories}
            form={form}
            setForm={setForm}
            onSubmit={updateProduct}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateProductList;