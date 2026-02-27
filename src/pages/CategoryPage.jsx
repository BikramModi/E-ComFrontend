import React from "react";
import { useNavigate } from "react-router-dom";
import CategoriesList from "../components/landingComponents/CategoriesList";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

const CategoryPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-indigo-300 min-h-screen"
    >
      <div className="max-w-7xl mx-auto 
                      px-4 sm:px-6 lg:px-8 
                      py-6 sm:py-8 lg:py-12">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 
                     text-gray-700 
                     hover:text-blue-600 
                     font-medium 
                     text-sm sm:text-base lg:text-lg
                     transition mb-6"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          Back
        </button>

        {/* Page Title */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl 
                       font-bold text-gray-800 
                       mb-6 sm:mb-8">
          Browse Categories
        </h1>

        {/* Categories List */}
        <CategoriesList />

      </div>
    </motion.div>
  );
};

export default CategoryPage;