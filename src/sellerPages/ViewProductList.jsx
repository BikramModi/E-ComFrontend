import { useEffect, useState } from "react";
import ViewProductCard from "./ViewProductCard";
import api from "../api/axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Package, Plus, Loader2, ArrowLeft } from "lucide-react";

const ViewProductList = () => {
  const { id } = useParams(); // category id
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await api.get(`/${id}/products`);
      setProducts(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [id]);

  const removeFromUI = (productId) => {
    setProducts((prev) => prev.filter((p) => p._id !== productId));
  };

  // ✅ Loading State
  if (loading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-100">
        <div className="flex items-center gap-3 text-lg sm:text-xl font-semibold text-gray-700">
          <Loader2 className="animate-spin w-6 h-6" />
          Loading products...
        </div>
      </div>
    );

  return (
    <div className="bg-indigo-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate("/seller/category")}
          className="flex items-center gap-2 text-sm sm:text-base text-gray-700 hover:text-black mb-5 transition"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          Back
        </button>

        {/* ✅ Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            <Package className="w-6 h-6 sm:w-7 sm:h-7" />
            My Products
          </h1>

          <Link
            to={`/add-new-product/${id}`}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-700 transition w-full sm:w-auto"
          >
            <Plus className="w-5 h-5" />
            Add New Product
          </Link>
        </div>

        {/* ✅ Empty State */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <Package className="w-14 h-14 mb-4 opacity-50" />
            <p className="text-base sm:text-lg">
              No products found.
            </p>
          </div>
        ) : (
          /* ✅ Responsive Grid */
          <div
            className="grid 
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4 
              xl:grid-cols-5 
              gap-5 sm:gap-6"
          >
            {products.map((product) => (
              <ViewProductCard
                key={product._id}
                product={product}
                onDelete={removeFromUI}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewProductList;