import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddReviewCard from "./AddReviewCard";
import useApi from "../hooks/useApi";
import {
  Star,
  Loader2,
  MessageSquare,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";

const AddReviewList = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useApi(
    `/reviews/${id}/getallReviews`,
    {},
    [id],
    "reviews"
  );

  const [reviews, setReviews] = useState([]);

  // Sync API data to state
  useEffect(() => {
    if (Array.isArray(data)) {
      setReviews(data);
    } else if (Array.isArray(data?.data)) {
      setReviews(data.data);
    }
  }, [data]);

  const removeFromUI = (reviewId) => {
    setReviews((prev) =>
      prev.filter((r) => r._id !== reviewId)
    );
  };

  // 🔄 Loading State
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-100">
        <div className="flex items-center gap-3 text-base sm:text-lg font-semibold text-gray-700">
          <Loader2 className="w-6 h-6 animate-spin" />
          Loading reviews...
        </div>
      </div>
    );
  }

  // ❌ Error State
  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-100 text-red-600">
        <AlertTriangle className="w-10 h-10 mb-3" />
        <p className="text-sm sm:text-base font-medium">
          {error.message || "Something went wrong"}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 flex items-center gap-2 text-blue-600 hover:underline text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    );
  }

  // ⭐ Empty State
  if (reviews.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-100 text-gray-600">
        <MessageSquare className="w-12 h-12 mb-3 opacity-60" />
        <p className="text-base sm:text-lg font-semibold">
          No reviews yet...
        </p>
        <div className="flex gap-1 mt-2">
          <Star className="w-4 h-4 text-yellow-500" />
          <Star className="w-4 h-4 text-yellow-500" />
          <Star className="w-4 h-4 text-yellow-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-300 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm sm:text-base text-gray-700 hover:text-black mb-5 transition"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          Back
        </button>

        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Star className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-500" />
          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800">
            Customer Reviews
          </h2>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {reviews.map((review) => (
            <AddReviewCard
              key={review._id}
              review={review}
              onDelete={removeFromUI}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddReviewList;