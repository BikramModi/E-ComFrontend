// src/pages/CategoryWithProductsList.jsx
import { useEffect, useState } from "react";
import api from "../../api/axios";
import FlashSaleCard from "../common/FlashSaleCard";
import ImageCarouselList from "./ImageCarouselList";
import BannerCardList from "./BannerCardList";

const CategoryWithProductsList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEverything = async () => {
      try {
        const catRes = await api.get("/categories");
        const categories = catRes.data.data;

        const categoriesWithProducts = await Promise.all(
          categories.map(async (cat) => {
            const prodRes = await api.get(`/${cat._id}/products`);
            return {
              ...cat,
              products: prodRes.data.data || [],
            };
          })
        );

        setData(categoriesWithProducts);
      } catch (err) {
        console.error("Failed to load categories/products", err);
      } finally {
        setLoading(false);
      }
    };

    loadEverything();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center py-16 sm:py-20 text-gray-500 text-base sm:text-lg font-medium">
        Loading categories and products...
      </div>
    );

  return (
    <>
      {/* Top Section */}
      <div className="space-y-4 sm:space-y-6">
        <ImageCarouselList />
        <BannerCardList />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10 space-y-10 sm:space-y-14">
        {data.map((category) => (
          <div key={category._id} className="space-y-4 sm:space-y-6">
            
            {/* Category Header */}
            <div className="bg-blue-50 rounded-xl p-4 sm:p-5 md:p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-800">
                  {category.name}
                </h2>

                {category.description && (
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">
                    {category.description}
                  </p>
                )}
              </div>

              <span className="text-xs sm:text-sm md:text-base text-gray-500 font-medium">
                {category.products.length}{" "}
                {category.products.length === 1 ? "product" : "products"}
              </span>
            </div>

            {/* Products Grid */}
            {category.products.length === 0 ? (
              <div className="bg-gray-100 rounded-xl p-6 text-center text-gray-500 font-medium text-sm sm:text-base">
                No products available in this category
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
                {category.products.map((product) => (
                  <FlashSaleCard
                    key={product._id}
                    {...product}
                    className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryWithProductsList;