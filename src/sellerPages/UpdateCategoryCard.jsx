import { useState } from "react";
import { FolderEdit, Tag, FileText, Save } from "lucide-react";

const UpdateCategoryCard = ({ category, onUpdate }) => {
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(
    category.description || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ name, description });
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white p-5 sm:p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200">

      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <FolderEdit className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
          Update Category
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name */}
        <div>
          <label className="flex items-center gap-2 font-semibold text-sm sm:text-base mb-2 text-gray-700">
            <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            Name
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="flex items-center gap-2 font-semibold text-sm sm:text-base mb-2 text-gray-700">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            Description
          </label>
          <textarea
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-700 transition cursor-pointer"
        >
          <Save className="w-4 h-4 sm:w-5 sm:h-5" />
          Update Category
        </button>
      </form>
    </div>
  );
};

export default UpdateCategoryCard;