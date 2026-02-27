import { Link } from "react-router-dom";
import { LogIn, UserPlus, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const GuestWelcomeCard = () => {
  return (
    <div
      className="
        bg-linear-to-r from-indigo-600 to-purple-600
        rounded-2xl sm:rounded-3xl
        shadow-xl
        p-5 sm:p-6 md:p-8
        text-white
        flex flex-col lg:flex-row
        items-center
        justify-between
        gap-6
        text-center lg:text-left
      "
    >
      {/* Left Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4">

        {/* Icon */}
        <div className="bg-white/20 p-3 sm:p-4 rounded-2xl">
          <ShoppingBag
            className="animate-bounce"
            size={28}
          />
        </div>

        {/* Text */}
        <div>
          <h2
            className="
              text-xl sm:text-2xl md:text-3xl lg:text-4xl
              font-extrabold
              flex items-center
              justify-center lg:justify-start
              gap-2
            "
          >
            Welcome to E-Shop
            <motion.span
              animate={{ rotate: [0, 20, -10, 20, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block origin-bottom"
            >
              👋
            </motion.span>
          </h2>

          <p
            className="
              text-sm sm:text-base md:text-lg
              text-white/90
              mt-2
              max-w-md
            "
          >
            Login or create an account to start shopping,
            track orders and get the best deals!
          </p>
        </div>
      </div>

      {/* Right Buttons */}
      <div
        className="
          flex flex-col sm:flex-row
          gap-3 sm:gap-4
          w-full sm:w-auto
        "
      >
        <Link
          to="/login"
          className="
            flex items-center justify-center gap-2
            bg-white text-indigo-700
            px-4 sm:px-6
            py-2.5 sm:py-3
            text-sm sm:text-base
            rounded-xl
            font-semibold
            shadow
            hover:scale-105
            transition
          "
        >
          <LogIn size={18} />
          Login
        </Link>

        <Link
          to="/register"
          className="
            flex items-center justify-center gap-2
            bg-black/20 border border-white/30 text-white
            px-4 sm:px-6
            py-2.5 sm:py-3
            text-sm sm:text-base
            rounded-xl
            font-semibold
            hover:bg-black/30
            transition
          "
        >
          <UserPlus size={18} />
          Register
        </Link>
      </div>
    </div>
  );
};

export default GuestWelcomeCard;