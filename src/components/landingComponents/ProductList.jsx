import { useParams } from "react-router-dom";
import FlashSaleCard from "../common/FlashSaleCard";
import useApi from "../../hooks/useApi";

const ProductList = () => {
  const { id } = useParams();
  const { data = [], loading, error } = useApi(`/${id}/products`, {}, []);

  if (loading)
    return (
      <div className="max-w-7xl mx-auto 
                      px-4 sm:px-6 lg:px-8 
                      py-12 flex justify-center items-center">
        <span className="text-gray-600 
                         text-sm sm:text-base lg:text-lg">
          Loading products...
        </span>
      </div>
    );

  if (error)
    return (
      <div className="max-w-7xl mx-auto 
                      px-4 sm:px-6 lg:px-8 
                      py-12 text-red-500 
                      text-sm sm:text-base lg:text-lg">
        Error: {error.message}
      </div>
    );

  if (!data.length)
    return (
      <div className="max-w-7xl mx-auto 
                      px-4 sm:px-6 lg:px-8 
                      py-12 text-gray-500 
                      text-sm sm:text-base lg:text-lg">
        No products found in this category.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto 
                    px-4 sm:px-6 lg:px-8 
                    py-8 sm:py-10 lg:py-14">

      {/* Header */}
      <div className="flex flex-col md:flex-row 
                      md:items-center 
                      md:justify-between 
                      gap-3 mb-8 sm:mb-10">
        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 
                       font-bold text-gray-800">
          All Products
        </h2>

        <p className="text-gray-600 
                      text-sm sm:text-base lg:text-lg">
          Browse our collection of top-quality items
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid 
                      grid-cols-2 
                      sm:grid-cols-3 
                      md:grid-cols-4 
                      lg:grid-cols-5 
                      xl:grid-cols-6 
                      gap-4 sm:gap-6 lg:gap-8">
        {data.map((product) => (
          <FlashSaleCard
            key={product._id}
            {...product}
            className="transition-transform duration-300 sm:hover:scale-105"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;