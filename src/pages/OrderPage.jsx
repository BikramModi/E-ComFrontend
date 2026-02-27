// src/pages/OrderPage.jsx
import React from 'react';
import OrderList from '../components/landingComponents/OrderList';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-indigo-300 min-h-screen px-4 sm:px-6 md:px-10 py-4 sm:py-6 md:py-8">

      {/* Back Button */}
      <button
        onClick={() => navigate('/user-dashboard')}
        className="
          flex items-center 
          text-gray-700 
          hover:text-blue-600 
          font-medium 
          py-2 sm:py-3 
          px-2 sm:px-4 
          rounded-md 
          mb-4 sm:mb-6
        "
      >
        <ChevronLeft size={18} className="mr-2 sm:mr-3" />
        <span className="text-sm sm:text-base md:text-lg">Back</span>
      </button>

      {/* Order List */}
      <div className="space-y-6">
        <OrderList />
      </div>
    </div>
  );
};

export default OrderPage;