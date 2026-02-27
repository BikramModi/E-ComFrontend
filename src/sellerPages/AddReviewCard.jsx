// src/components/ReviewCard.jsx
import React from "react";
import { Star, Trash2, User, Calendar } from "lucide-react";
import { toast } from "react-toastify";
import api from "../api/axios";

const AddReviewCard = ({ review, onDelete }) => {
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this review?"))
      return;

    try {
      await api.delete(
        `/reviews/${review._id}/deleteReview/adminonly`
      );
      toast.success("Review deleted successfully");
      onDelete(review._id);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to delete review"
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 sm:p-5 flex flex-col justify-between transition hover:shadow-lg">

      {/* Top Section */}
      <div className="space-y-3">

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-blue-100 rounded-full">
            <User className="w-5 h-5 text-blue-600" />
          </div>

          <div>
            <p className="text-sm sm:text-base font-semibold text-gray-800">
              {review.user?.name || "Anonymous"}
            </p>
            <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              {new Date(review.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 sm:w-5 sm:h-5 ${
                i < review.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Comment */}
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          {review.comment}
        </p>
      </div>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="mt-4 flex items-center justify-center gap-2 bg-red-600 text-white py-2 sm:py-2.5 px-3 rounded-lg text-sm sm:text-base font-medium hover:bg-red-700 transition"
      >
        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
        Delete Review
      </button>
    </div>
  );
};

export default AddReviewCard;