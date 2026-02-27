// src/components/common/FooterLayout.jsx
import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Home,
  ShoppingCart,
  Package,
  LifeBuoy,
} from "lucide-react";
import { Link } from "react-router-dom";

const AppFooter1 = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 sm:pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 
                      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
                      gap-8 sm:gap-10">

        {/* Logo & Description */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            E-Shop
          </h2>

          <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed">
            Your one-stop shop for all your needs. Find the best products,
            deals, and offers here.
          </p>

          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-white transition">
              <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a href="#" className="hover:text-white transition">
              <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a href="#" className="hover:text-white transition">
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a href="#" className="hover:text-white transition">
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-semibold text-white">
            Quick Links
          </h3>

          <Link to="/user-dashboard" className="flex items-center gap-2 text-xs sm:text-sm md:text-base hover:text-white transition">
            <Home className="w-4 h-4" /> Dashboard
          </Link>

          <Link to="/category" className="flex items-center gap-2 text-xs sm:text-sm md:text-base hover:text-white transition">
            <Package className="w-4 h-4" /> Categories
          </Link>

          <Link to="/cart" className="flex items-center gap-2 text-xs sm:text-sm md:text-base hover:text-white transition">
            <ShoppingCart className="w-4 h-4" /> Cart
          </Link>

          <Link to="/orders" className="flex items-center gap-2 text-xs sm:text-sm md:text-base hover:text-white transition">
            <Package className="w-4 h-4" /> Orders
          </Link>
        </div>

        {/* Customer Service */}
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-semibold text-white">
            Customer Service
          </h3>

          <Link to="/faq" className="flex items-center gap-2 text-xs sm:text-sm md:text-base hover:text-white transition">
            <LifeBuoy className="w-4 h-4" /> FAQ
          </Link>

          <Link to="/contact1" className="flex items-center gap-2 text-xs sm:text-sm md:text-base hover:text-white transition">
            <Mail className="w-4 h-4" /> Contact Us
          </Link>

          <Link to="/returns" className="flex items-center gap-2 text-xs sm:text-sm md:text-base hover:text-white transition">
            <Package className="w-4 h-4" /> Returns
          </Link>

          <Link to="/support" className="flex items-center gap-2 text-xs sm:text-sm md:text-base hover:text-white transition">
            <LifeBuoy className="w-4 h-4" /> Support
          </Link>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-semibold text-white">
            Contact
          </h3>

          <p className="flex items-start gap-2 text-gray-400 text-xs sm:text-sm md:text-base">
            <MapPin className="w-4 h-4 mt-1" />
            123 E-Shop Street, Kathmandu, Nepal
          </p>

          <p className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm md:text-base">
            <Phone className="w-4 h-4" />
            +977 980-123-4567
          </p>

          <p className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm md:text-base break-all">
            <Mail className="w-4 h-4" />
            support@eshop.com
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-500 text-xs sm:text-sm px-4">
        &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
      </div>
    </footer>
  );
};

export default AppFooter1;