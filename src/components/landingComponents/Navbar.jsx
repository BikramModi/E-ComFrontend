import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, Info, FileText, Phone, Store, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const GuestNavbar = () => {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search.trim())}`);
      setMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl sm:text-2xl font-extrabold text-indigo-600"
        >
          <motion.div
            animate={{ x: [0, -2, 2, -2, 2, 0], rotate: [0, -2, 2, -2, 2, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            <Store size={24} className="sm:w-7 sm:h-7" />
          </motion.div>

          <span className="inline-block">
            <motion.span
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              E
            </motion.span>
            -Shop
          </span>
        </Link>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-xl mx-6 relative"
        >
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-l-xl border text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-4 md:px-5 rounded-r-xl text-sm md:text-base hover:from-indigo-700 hover:to-purple-700 transition"
          >
            Search
          </button>
        </form>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm md:text-base">
          <Link to="/about" className="flex items-center gap-1 hover:text-indigo-600">
            <Info size={18} />
            About
          </Link>

          <Link to="/blog" className="flex items-center gap-1 hover:text-indigo-600">
            <FileText size={18} />
            Blog
          </Link>

          <Link to="/contact" className="flex items-center gap-1 hover:text-indigo-600">
            <Phone size={18} />
            Contact
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4 bg-white border-t">

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </form>

          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-sm hover:text-indigo-600"
          >
            <Info size={18} />
            About Us
          </Link>

          <Link
            to="/blog"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-sm hover:text-indigo-600"
          >
            <FileText size={18} />
            Blog
          </Link>

          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-sm hover:text-indigo-600"
          >
            <Phone size={18} />
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default GuestNavbar;