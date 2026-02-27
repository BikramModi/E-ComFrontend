import {
  User,
  Mail,
  Shield,
  Trash2,
  ChevronDown
} from "lucide-react";

const UsersCard = ({ user, onDelete, onChangeRole }) => {
  const roleStyles = {
    admin: "bg-red-100 text-red-600",
    seller: "bg-blue-100 text-blue-600",
    user: "bg-gray-100 text-gray-600",
  };

  return (
    <div
      className="bg-gray-300 border border-gray-200 rounded-2xl
                 p-4 sm:p-6 shadow-sm hover:shadow-md
                 transition-all duration-300
                 flex flex-col sm:flex-row
                 sm:items-center sm:justify-between gap-5"
    >
      {/* User Info Section */}
      <div className="flex flex-col gap-2">

        {/* Name */}
        <h3 className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-semibold text-gray-800">
          <User size={18} className="text-gray-500" />
          {user.name}
        </h3>

        {/* Email */}
        <p className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 break-all">
          <Mail size={16} className="text-gray-400" />
          {user.email}
        </p>

        {/* Role Badge */}
        <span
          className={`mt-1 inline-flex items-center gap-1
                     text-xs sm:text-sm px-3 py-1 rounded-full font-medium
                     ${roleStyles[user.role]}`}
        >
          <Shield size={14} />
          {user.role.toUpperCase()}
        </span>
      </div>

      {/* Actions Section */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full sm:w-auto">

        {/* Role Dropdown */}
        <div className="relative w-full sm:w-auto">
          <select
            value={user.role}
            onChange={(e) => onChangeRole(user._id, e.target.value)}
            className="appearance-none w-full sm:w-auto
                       border border-gray-300 rounded-lg
                       px-3 py-2 pr-8
                       text-xs sm:text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-400
                       transition"
          >
            <option value="user">User</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>

          {/* Dropdown Icon */}
          <ChevronDown
            size={16}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(user._id)}
          className="flex items-center justify-center gap-2
                     bg-red-600 text-white
                     text-xs sm:text-sm md:text-base
                     px-4 py-2 rounded-lg
                     hover:bg-red-700
                     transition w-full sm:w-auto"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default UsersCard;