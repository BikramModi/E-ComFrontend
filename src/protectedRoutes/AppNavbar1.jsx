import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  LayoutGrid,
  Package,
  LogOutIcon,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useCart } from "./CartContext";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const AppNavbar1 = () => {
  const { logout } = useAuth();
  const { cartCount, hideBadge, setHideBadge } = useCart();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search.trim())}`);
      setSearch("");
      setMobileOpen(false);
    }
  };

  const handleCartClick = () => {
    setHideBadge(true);
    navigate("/cart");
    setMobileOpen(false);
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;

    logout();
    toast.success("Logged out successfully 👋");
    navigate("/login");
  };

  return (
    <nav className="bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/user-dashboard"
          className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide"
        >
          🛒 E-Shop
        </Link>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-lg mx-6"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 text-sm md:text-base 
            rounded-l-lg text-black bg-blue-100 
            focus:outline-none"
          />
          <button className="px-4 bg-black/20 rounded-r-lg hover:bg-black/30 transition">
            <Search size={18} />
          </button>
        </form>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm md:text-base">

          {/* Cart */}
          <button
            onClick={handleCartClick}
            className="relative flex items-center gap-1 hover:text-yellow-300 transition"
          >
            <ShoppingCart size={20} />
            {!hideBadge && cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          <Link to="/category" className="flex items-center gap-1 hover:text-yellow-300">
            <LayoutGrid size={16} /> Category
          </Link>

          <Link to="/orders" className="flex items-center gap-1 hover:text-yellow-300">
            <Package size={16} /> Orders
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-white text-blue-600 
            px-3 py-1.5 rounded-lg text-sm md:text-base 
            font-semibold hover:bg-gray-100 transition"
          >
            <LogOutIcon size={16} /> Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-indigo-700 px-4 pb-4 space-y-4">

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="flex mt-2">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-l-lg text-black"
            />
            <button className="px-3 bg-black/20 rounded-r-lg">
              <Search size={16} />
            </button>
          </form>

          <button
            onClick={handleCartClick}
            className="flex items-center gap-2 text-sm"
          >
            <ShoppingCart size={18} />
            Cart ({cartCount})
          </button>

          <Link
            to="/category"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 text-sm"
          >
            <LayoutGrid size={18} /> Category
          </Link>

          <Link
            to="/orders"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 text-sm"
          >
            <Package size={18} /> Orders
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white text-blue-600 
            px-4 py-2 rounded-lg text-sm font-semibold"
          >
            <LogOutIcon size={18} /> Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default AppNavbar1;