import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  LayoutDashboard,
  Tags,
  ShoppingCart,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const AdminNavbar2 = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    {
      name: "Dashboard",
      path: "/seller/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Categories",
      path: "/seller/category",
      icon: <Tags size={18} />,
    },
    {
      name: "Orders",
      path: "/order",
      icon: <ShoppingCart size={18} />,
    },
    {
      name: "Users",
      path: "/users",
      icon: <Users size={18} />,
    },
  ];

  return (
    <>
      <nav className="w-full h-16 bg-gray-900 text-white flex items-center justify-between px-4 md:px-6 shadow-md sticky top-0 z-50">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <img
            src="https://w7.pngwing.com/pngs/384/470/png-transparent-retail-computer-icons-e-commerce-sales-mega-offer-miscellaneous-service-logo-thumbnail.png"
            alt="Logo"
            className="w-8 h-8 rounded-full"
          />
          <h1 className="text-lg md:text-xl font-bold text-purple-400">
            E-Shop Admin
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-2 text-sm lg:text-base transition-all duration-200 hover:text-purple-400 ${
                  isActive ? "text-purple-400 font-semibold" : ""
                }`
              }
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right Section (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <span className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-sm font-medium">
            {user?.name?.charAt(0)?.toUpperCase() || "A"}
          </span>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-sm hover:text-red-400 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 text-white px-6 py-6 space-y-6 shadow-lg">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 text-base transition hover:text-purple-400 ${
                  isActive ? "text-purple-400 font-semibold" : ""
                }`
              }
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}

          <div className="border-t border-gray-700 pt-4 flex items-center justify-between">
            <span className="text-sm font-medium">
              {user?.name || "Admin"}
            </span>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-sm hover:text-red-400 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNavbar2;