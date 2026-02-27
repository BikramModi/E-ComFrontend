import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomButton from "../components/common/CustomButton";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSendCode = (e) => {
    e.preventDefault();
    alert("Reset code sent to your email (mock)");
    setStep(2);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Password reset successful (mock)");

    setStep(1);
    setEmail("");
    setCode("");
    setPassword("");
    setConfirmPassword("");
    navigate("/login");
  };

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center 
      bg-gray-100 px-4 sm:px-6"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white shadow-xl rounded-2xl 
        p-6 sm:p-8 
        w-full max-w-sm sm:max-w-md md:max-w-lg 
        overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl 
              font-bold text-center mb-2">
                Forgot Password
              </h2>

              <p className="text-xs sm:text-sm md:text-base 
              text-center text-gray-600 mb-6">
                Enter your email to receive a reset code
              </p>

              <form onSubmit={handleSendCode} className="space-y-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 sm:py-3 
                  text-sm sm:text-base 
                  border rounded-lg 
                  focus:outline-none focus:ring-2 
                  focus:ring-indigo-500"
                />

                <CustomButton text="Send Reset Code" />
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl 
              font-bold text-center mb-2">
                Reset Password
              </h2>

              <p className="text-xs sm:text-sm md:text-base 
              text-center text-gray-600 mb-6">
                Enter code and your new password
              </p>

              <form onSubmit={handleResetPassword} className="space-y-4">
                <input
                  type="text"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="6-digit code"
                  className="w-full px-4 py-2.5 sm:py-3 
                  text-sm sm:text-base 
                  border rounded-lg text-center 
                  tracking-widest 
                  focus:outline-none focus:ring-2 
                  focus:ring-indigo-500"
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password"
                  className="w-full px-4 py-2.5 sm:py-3 
                  text-sm sm:text-base 
                  border rounded-lg 
                  focus:outline-none focus:ring-2 
                  focus:ring-indigo-500"
                />

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full px-4 py-2.5 sm:py-3 
                  text-sm sm:text-base 
                  border rounded-lg 
                  focus:outline-none focus:ring-2 
                  focus:ring-indigo-500"
                />

                <CustomButton text="Reset Password" />
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

export default ForgotPasswordPage;