import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft, PackageX } from "lucide-react";
import UpdateStatusCard from "./UpdateStatusCard";
import api from "../api/axios";
import { toast } from "react-toastify";

const UpdateStatusList = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      const res = await api.get(`/orders/${id}/adminonly`);
      setOrder(res.data.order);
    } catch (err) {
      toast.error("Failed to load order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const updateStatus = async (status) => {
    try {
      await api.patch(`/orders/${id}/adminonly`, { status });
      setOrder((prev) => ({ ...prev, status }));
      toast.success("Status updated successfully ✅");
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-indigo-300 flex flex-col items-center justify-center px-4">
        <Loader2 className="animate-spin w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 mb-3" />
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 text-center">
          Loading order...
        </p>
      </div>
    );
  }

  /* ================= NOT FOUND ================= */
  if (!order) {
    return (
      <div className="min-h-screen bg-indigo-300 flex flex-col items-center justify-center px-4">
        <PackageX className="w-8 h-8 sm:w-10 sm:h-10 text-red-500 mb-3" />
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 text-center">
          Order not found
        </p>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    );
  }

  /* ================= MAIN ================= */
  return (
    <div className="min-h-screen bg-indigo-300 px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-white shadow-sm px-3 py-2 rounded-lg hover:bg-gray-100 transition text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Back
          </button>

          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800 text-center flex-1">
            Update Order Status
          </h1>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
          <UpdateStatusCard order={order} onUpdate={updateStatus} />
        </div>

      </div>
    </div>
  );
};

export default UpdateStatusList;