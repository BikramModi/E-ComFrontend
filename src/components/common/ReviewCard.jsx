// src/components/ReviewCard.jsx
import React from "react";
import { Star, User, BadgeCheck } from "lucide-react";

const ReviewCard = ({ review }) => {
  const formattedDate = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Recently";

  return (
    <div
      className="bg-gray-300 
                 rounded-xl sm:rounded-2xl 
                 border border-gray-100 
                 shadow-sm 
                 p-4 sm:p-6 
                 space-y-4 
                 transition-all duration-200
                 sm:hover:scale-[1.02]
                 sm:hover:shadow-lg"
    >

      {/* Header */}
      <div className="flex items-start gap-3 sm:gap-4">

        {/* Avatar */}
        {review.user?.avatar ? (
          <img
            src={review.user.avatar}
            alt={review.user.name}
            className="w-10 h-10 sm:w-12 sm:h-12 
                       rounded-full object-cover 
                       ring-2 ring-indigo-100"
          />
        ) : (
          <div className="w-10 h-10 sm:w-12 sm:h-12 
                          rounded-full 
                          bg-linear-to-br from-indigo-100 to-indigo-200 
                          flex items-center justify-center">
            <User className="text-indigo-600 w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        )}

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold text-gray-900 
                          text-sm sm:text-base 
                          truncate">
              {review.user?.name || "Anonymous"}
            </p>

            {/* Verified badge */}
            <span className="flex items-center gap-1 
                             text-[10px] sm:text-xs 
                             bg-indigo-50 text-indigo-600 
                             px-2 py-0.5 rounded-full">
              <BadgeCheck className="w-3 h-3 sm:w-4 sm:h-4" />
              Verified
            </span>
          </div>

          <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
            {formattedDate}
          </p>
        </div>

        {/* Rating Badge */}
        <div className="flex items-center gap-1 
                        bg-linear-to-r from-yellow-100 to-yellow-200 
                        text-yellow-800 
                        px-2 sm:px-3 
                        py-1 rounded-lg sm:rounded-xl 
                        text-xs sm:text-sm 
                        font-bold shadow-sm">
          <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-500 text-yellow-500" />
          {review.rating}
        </div>
      </div>

      {/* Stars Row */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-4 h-4 sm:w-5 sm:h-5 ${
              i <= review.rating
                ? "fill-yellow-400 text-yellow-400 drop-shadow-sm"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 
                         text-xs sm:text-sm 
                         text-gray-500">
          {review.rating} / 5
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />

      {/* Comment */}
      <p className="text-xs sm:text-sm lg:text-base 
                    text-gray-700 
                    leading-relaxed wrap-break-word">
        {review.comment}
      </p>

    </div>
  );
};

export default ReviewCard;