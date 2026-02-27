// src/pages/SingleProductDescriptionCardList.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import SingleProductDescriptionCard from "../common/SingleProductDescriptionCard";
import useApi from "../../hooks/useApi";
import ReviewList from "./ReviewList";

const SingleProductDescriptionCardList = () => {
  const { id, catId } = useParams();

  const { data, loading, error } = useApi(`/${catId}/products/${id}`, {}, []);

  if (loading)
    return (
      <div className="min-h-[70vh] 
                      flex items-center justify-center 
                      text-sm sm:text-base lg:text-lg 
                      font-semibold px-4 text-center">
        Loading product details...
      </div>
    );

  if (error)
    return (
      <div className="min-h-[70vh] 
                      flex items-center justify-center 
                      text-sm sm:text-base lg:text-lg 
                      text-red-500 font-semibold px-4 text-center">
        Failed to load product
      </div>
    );

  return (
    <div className="min-h-screen bg-indigo-300 pb-8 sm:pb-10 lg:pb-14">

      {/* 🔙 Top Bar */}
      <div className="max-w-7xl mx-auto 
                      px-4 sm:px-6 lg:px-8 
                      pt-4 sm:pt-6">
        <Link
          to={`/user-dashboard`}
          className="inline-flex items-center gap-2 
                     text-gray-600 hover:text-black 
                     transition font-medium
                     text-sm sm:text-base lg:text-lg"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          Back to products
        </Link>
      </div>

      {/* 🛍️ Product Section */}
      <div className="max-w-7xl mx-auto 
                      px-4 sm:px-6 lg:px-8 
                      py-6 sm:py-8 lg:py-10">
        <SingleProductDescriptionCard item={data} />
      </div>

      {/* ⭐ Reviews Section (optional if used) */}
      {/* <div className="max-w-7xl mx-auto 
                      px-4 sm:px-6 lg:px-8 
                      pb-6">
        <ReviewList productId={id} />
      </div> */}

    </div>
  );
};

export default SingleProductDescriptionCardList;