import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  FileText,
  IndianRupee,
  Layers,
  Image as ImageIcon,
  Plus,
  Loader2,
  ArrowLeft,
} from "lucide-react";

const AddProductCard = ({ categories, onSubmit, loading }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("originalPrice", originalPrice);
    formData.append("stock", stock);
    formData.append("category", category);
    if (image) formData.append("image", image);

    onSubmit(formData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-300 p-4 sm:p-6 md:p-8 rounded-2xl shadow-md border">

      {/* 🔙 Back Button */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm sm:text-base text-gray-600 hover:text-black mb-4 transition"
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        Back
      </button>

      {/* Title */}
      <h2 className="text-lg sm:text-2xl font-bold mb-6 flex items-center justify-center gap-2 text-gray-800">
        <Package className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
        Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Product Name */}
          <div>
            <label className="flex items-center gap-2 text-sm sm:text-base font-medium mb-1 text-gray-700">
              <Package className="w-4 h-4 text-blue-600" />
              Product Name
            </label>
            <input
              className="border p-2.5 text-sm sm:text-base w-full rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="flex items-center gap-2 text-sm sm:text-base font-medium mb-1 text-gray-700">
              <IndianRupee className="w-4 h-4 text-green-600" />
              Price
            </label>
            <input
              type="number"
              className="border p-2.5 text-sm sm:text-base w-full rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* Original Price */}
          <div>
            <label className="flex items-center gap-2 text-sm sm:text-base font-medium mb-1 text-gray-700">
              <IndianRupee className="w-4 h-4 text-gray-500" />
              Original Price
            </label>
            <input
              type="number"
              className="border p-2.5 text-sm sm:text-base w-full rounded-lg focus:ring-2 focus:ring-gray-400 outline-none"
              placeholder="Enter original price"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
            />
          </div>

          {/* Stock */}
          <div>
            <label className="flex items-center gap-2 text-sm sm:text-base font-medium mb-1 text-gray-700">
              <Layers className="w-4 h-4 text-purple-600" />
              Stock
            </label>
            <input
              type="number"
              className="border p-2.5 text-sm sm:text-base w-full rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Enter stock quantity"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="flex items-center gap-2 text-sm sm:text-base font-medium mb-1 text-gray-700">
            <FileText className="w-4 h-4 text-indigo-600" />
            Description
          </label>
          <textarea
            className="border p-2.5 text-sm sm:text-base w-full rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        {/* Category */}
        <div>
          <label className="flex items-center gap-2 text-sm sm:text-base font-medium mb-1 text-gray-700">
            <Layers className="w-4 h-4 text-orange-600" />
            Category
          </label>
          <select
            className="border p-2.5 text-sm sm:text-base w-full rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image */}
        <div>
          <label className="flex items-center gap-2 text-sm sm:text-base font-medium mb-2 text-gray-700">
            <ImageIcon className="w-4 h-4 text-pink-600" />
            Product Image
          </label>

          <input
            type="file"
            accept="image/*"
            className="border p-2.5 text-sm sm:text-base w-full rounded-lg bg-gray-50"
            onChange={handleImageChange}
          />

          {preview && (
            <div className="mt-3 flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="h-28 sm:h-32 object-contain rounded-lg border"
              />
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          disabled={loading}
          className="w-full bg-green-600 text-white py-2.5 sm:py-3 rounded-lg
          flex items-center justify-center gap-2 text-sm sm:text-base font-medium
          hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Add Product
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProductCard;