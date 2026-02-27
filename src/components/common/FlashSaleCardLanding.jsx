import React from "react";

import { Link } from "react-router-dom";

const FlashSaleCardLanding = ({ image, title, price, originalPrice, discount }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition flex flex-col items-center text-center p-4">
            {/* Product Image */}
            <div className="w-full aspect-square relative overflow-hidden rounded-xl mb-3">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                />
                {/* Discount Badge */}
                {discount && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs sm:text-sm px-2 py-1 rounded-full font-bold shadow">
                        {discount} OFF
                    </span>
                )}
            </div>

            {/* Product Title */}
            <h3 className="text-sm sm:text-base md:text-sm lg:text-base font-semibold text-gray-800 line-clamp-2">
                {title}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-2 mt-1">
                <span className="text-indigo-600 font-bold text-sm sm:text-base">
                    ₹{price}
                </span>
                {originalPrice && (
                    <span className="text-gray-400 line-through text-xs sm:text-sm">
                        ₹{originalPrice}
                    </span>
                )}
            </div>

            {/* Add to Cart Button */}
            <Link to="/register" className="w-full" >
                <button className="mt-3 w-full bg-indigo-600 text-white text-xs sm:text-sm py-1.5 sm:py-2 rounded-xl font-semibold hover:bg-indigo-700 transition">
                    Add to Cart
                </button>
            </Link>

        </div>
    );
};

export default FlashSaleCardLanding;