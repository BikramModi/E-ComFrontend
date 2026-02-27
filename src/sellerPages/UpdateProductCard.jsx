import {
  Package,
  FileText,
  DollarSign,
  Layers,
  Image as ImageIcon,
  Tag,
  Save,
  Loader2,
} from "lucide-react";

const UpdateProductCard = ({
  categories,
  form,
  setForm,
  onSubmit,
  loading,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("originalPrice", form.originalPrice);
    formData.append("stock", form.stock);
    formData.append("category", form.category);

    if (form.image) {
      formData.append("image", form.image);
    }

    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 md:p-8">

      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <Package className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
          Update Product
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name */}
        <div>
          <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-700 mb-2">
            <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            Name
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:py-2.5 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-700 mb-2">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            Description
          </label>
          <textarea
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:py-2.5 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        {/* Responsive Grid for Prices & Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div>
            <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-700 mb-2">
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              Price
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Price"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-700 mb-2">
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              Original Price
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Original Price"
              value={form.originalPrice}
              onChange={(e) =>
                setForm({ ...form, originalPrice: e.target.value })
              }
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-700 mb-2">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              Stock
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) =>
                setForm({ ...form, stock: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* Category (Disabled) */}
        <div>
          <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-700 mb-2">
            <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            Category
          </label>
          <input
            type="text"
            value={
              categories.find((c) => c._id === form.category)?.name ||
              "Loading..."
            }
            disabled
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed text-sm sm:text-base"
          />
        </div>

        {/* Image Preview */}
        {form.preview && (
          <div className="flex justify-center">
            <img
              src={form.preview}
              alt="Preview"
              className="h-32 sm:h-40 object-cover rounded-xl border shadow"
            />
          </div>
        )}

        {/* Image Upload */}
        <div>
          <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-700 mb-2">
            <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base"
            onChange={(e) =>
              setForm({
                ...form,
                image: e.target.files[0],
                preview: URL.createObjectURL(
                  e.target.files[0]
                ),
              })
            }
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Update Product
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateProductCard;