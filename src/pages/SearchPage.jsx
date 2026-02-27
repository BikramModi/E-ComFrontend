// src/pages/SearchPage.jsx

import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import FlashSaleCard from "../components/common/FlashSaleCard";
import { Search, PackageSearch, ChevronLeft } from "lucide-react";
import { toast } from "react-toastify";

const SearchPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const query = params.get("query") || "";

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const searchProducts = async () => {
      try {
        setLoading(true);

        const catRes = await api.get("/categories");
        const categories = catRes.data.data || catRes.data.categories || [];

        const productRequests = categories.map((cat) =>
          api.get(`/${cat._id}/products`)
        );

        const productResponses = await Promise.all(productRequests);

        const allProducts = productResponses.flatMap(
          (res) => res.data.data || res.data || []
        );

        const filtered = allProducts.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        );

        setProducts(filtered);

        if (filtered.length === 0) {
          toast.info("No products found for your search 🔍");
        } else {
          toast.success(`${filtered.length} products found`);
        }

      } catch (err) {
        console.error("Search failed", err);
        toast.error("Search failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      searchProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [query]);

  // 🔄 Loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-gray-600 px-4 text-center">
        <Search className="animate-pulse w-8 h-8 sm:w-10 sm:h-10" />
        <p className="font-medium text-sm sm:text-base md:text-lg">
          Searching for products...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10">

      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/user-dashboard")}
        className="flex items-center text-gray-700 hover:text-blue-600 font-medium mb-6 text-sm sm:text-base"
      >
        <ChevronLeft size={20} className="mr-2" />
        Back
      </button>

      {/* 🔍 Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">

        <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-gray-900 flex flex-wrap items-center gap-2">
          <Search className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
          Results for:
          <span className="text-blue-600 break-all">
            "{query}"
          </span>
        </h2>

        <span className="bg-blue-100 text-blue-700 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold w-fit">
          {products.length} items found
        </span>
      </div>

      {/* 📦 Empty State */}
      {products.length === 0 ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-center text-gray-500 gap-4 px-4">
          <PackageSearch className="text-gray-300 w-12 h-12 sm:w-16 sm:h-16" />
          <p className="text-base sm:text-lg font-semibold">
            No products found
          </p>
          <p className="text-xs sm:text-sm">
            Try searching with different keywords
          </p>
        </div>
      ) : (
        <div className="
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-4 
          lg:grid-cols-5 
          xl:grid-cols-6 
          gap-4 sm:gap-6
        ">
          {products.map((product) => (
            <FlashSaleCard key={product._id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;