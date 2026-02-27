// src/components/ReviewCreationCard.jsx
import { useState } from "react";
import { Star, MessageSquareText, Send } from "lucide-react";
import api from "../../api/axios";
import { toast } from "react-toastify";

const ReviewCreationCard = ({ productId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Please write a review comment");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/reviews/createReview", {
        productId,
        rating,
        comment,
      });

      setRating(5);
      setHoverRating(0);
      setComment("");

      if (onReviewAdded) onReviewAdded(res.data);

      toast.success("Review added successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-blue-300 
                 rounded-xl sm:rounded-2xl 
                 shadow-lg border border-gray-100
                 p-4 sm:p-6 lg:p-8
                 space-y-6 
                 max-w-xl mx-auto
                 transition-all duration-200
                 sm:hover:scale-[1.02]
                 sm:hover:shadow-xl"
    >
      {/* Header */}
      <div>
        <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl 
                       font-bold text-gray-900">
          Write a Review
        </h3>
        <p className="text-xs sm:text-sm lg:text-base text-gray-500 mt-1">
          Share your experience with this product
        </p>
      </div>

      {/* Rating */}
      <div className="space-y-2">
        <p className="text-xs sm:text-sm lg:text-base 
                      font-medium text-gray-700">
          Your Rating
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`cursor-pointer transition-all duration-150
                w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9
                ${
                  (hoverRating || rating) >= star
                    ? "fill-yellow-400 text-yellow-400 scale-110"
                    : "text-gray-300"
                }`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            />
          ))}

          <span className="ml-2 sm:ml-3 
                           text-sm sm:text-base lg:text-lg 
                           text-gray-600 font-semibold">
            {rating} / 5
          </span>
        </div>
      </div>

      {/* Comment */}
      <div className="space-y-2">
        <p className="text-xs sm:text-sm lg:text-base 
                      font-medium text-gray-700">
          Your Review
        </p>

        <div className="relative">
          <MessageSquareText
            className="absolute left-3 top-3 text-gray-400 
                       w-4 h-4 sm:w-5 sm:h-5"
          />

          <textarea
            rows="4"
            className="w-full border border-gray-200 
                       rounded-lg sm:rounded-xl
                       pl-9 sm:pl-10 pr-4 
                       py-2.5 sm:py-3
                       text-sm sm:text-base lg:text-lg
                       focus:outline-none 
                       focus:ring-2 focus:ring-indigo-500
                       resize-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell others what you liked or disliked..."
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={submitHandler}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2
                   bg-linear-to-r from-indigo-600 to-blue-600 
                   text-white 
                   py-2.5 sm:py-3 lg:py-4
                   text-sm sm:text-base lg:text-lg
                   rounded-lg sm:rounded-xl 
                   font-semibold
                   transition 
                   sm:hover:from-indigo-700 sm:hover:to-blue-700
                   disabled:opacity-60"
      >
        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
};

export default ReviewCreationCard;