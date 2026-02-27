import { Link } from "react-router-dom";
import { Users, Tags, ShoppingCart } from "lucide-react";

const SellerHomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 px-4 sm:px-6 lg:px-8 py-10">
      
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-6 sm:p-10 lg:p-14 text-center">

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4">
          Welcome, Seller 👋
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10">
          Manage your products, track your orders, and grow your business with ease.
        </p>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">

          {/* Users */}
          <Link
            to="/users"
            className="group flex flex-col items-center justify-center gap-3 bg-green-600 text-white py-6 sm:py-8 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-green-700 hover:scale-105 shadow-md"
          >
            <Users size={24} className="group-hover:scale-110 transition" />
            Users
          </Link>

          {/* Categories */}
          <Link
            to="/seller/category"
            className="group flex flex-col items-center justify-center gap-3 bg-blue-600 text-white py-6 sm:py-8 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-blue-700 hover:scale-105 shadow-md"
          >
            <Tags size={24} className="group-hover:scale-110 transition" />
            My Categories
          </Link>

          {/* Orders */}
          <Link
            to="/order"
            className="group flex flex-col items-center justify-center gap-3 bg-purple-600 text-white py-6 sm:py-8 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-purple-700 hover:scale-105 shadow-md"
          >
            <ShoppingCart size={24} className="group-hover:scale-110 transition" />
            My Orders
          </Link>

        </div>
      </div>
    </div>
  );
};

export default SellerHomePage;