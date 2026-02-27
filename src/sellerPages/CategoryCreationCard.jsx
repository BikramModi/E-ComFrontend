import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";

import {
  Plus,
  FolderPlus,
  Tag,
  FileText,
  Loader2
} from "lucide-react";

const CategoryCreationCard = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return toast.error("Category name is required");
    }

    if (!description.trim()) {
      return toast.error("Category description is required");
    }

    try {
      setLoading(true);

      await api.post("/categories", { name, description });

      toast.success("Category created successfully!");
      setName("");
      setDescription("");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to create category"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-gray-300 border border-gray-200
                 rounded-2xl shadow-sm hover:shadow-md
                 transition-all duration-300
                 p-5 sm:p-6 md:p-8
                 w-full max-w-md mx-auto"
    >
      {/* Title */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <FolderPlus size={24} className="text-indigo-600" />
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center">
          Create New Category
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name Field */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700">
            <Tag size={16} />
            Name
          </label>

          <input
            type="text"
            className="w-full border border-gray-300
                       rounded-lg px-4 py-2.5
                       text-xs sm:text-sm md:text-base
                       focus:outline-none focus:ring-2 focus:ring-indigo-400
                       transition"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Description Field */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700">
            <FileText size={16} />
            Description
          </label>

          <textarea
            className="w-full border border-gray-300
                       rounded-lg px-4 py-2.5
                       text-xs sm:text-sm md:text-base
                       focus:outline-none focus:ring-2 focus:ring-indigo-400
                       transition resize-none"
            placeholder="Enter category description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2
                     bg-indigo-600 text-white
                     text-xs sm:text-sm md:text-base
                     py-2.5 rounded-lg
                     hover:bg-indigo-700
                     transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Plus size={18} />
              Create Category
            </>
          )}
        </button>

      </form>
    </div>
  );
};

export default CategoryCreationCard;