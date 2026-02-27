import { Link } from "react-router-dom";
import { Tag } from "lucide-react";

const CategoriesCard = ({ id, name, description }) => {
  return (
    <Link
      to={`/category/${id}`}
      className="group 
                 bg-linear-to-br from-blue-50 to-blue-100 
                 rounded-xl shadow-md 
                 p-4 sm:p-5 lg:p-6
                 flex flex-col items-center text-center
                 transition
                 sm:hover:shadow-xl 
                 sm:hover:scale-105"
    >
      {/* Icon */}
      <div className="bg-blue-200 
                      p-3 sm:p-4 lg:p-5 
                      rounded-full 
                      mb-3 sm:mb-4 
                      flex items-center justify-center">
        <Tag className="text-blue-700 
                        w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
      </div>

      {/* Name */}
      <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl 
                     font-bold text-gray-800 
                     mb-1 sm:mb-2 
                     line-clamp-1">
        {name}
      </h3>

      {/* Description */}
      <p className="text-xs sm:text-sm lg:text-base 
                    text-gray-600 
                    line-clamp-2">
        {description}
      </p>
    </Link>
  );
};

export default CategoriesCard;