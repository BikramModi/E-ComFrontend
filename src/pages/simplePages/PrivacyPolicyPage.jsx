import React from "react";
import {
  ShieldCheck,
  FileText,
  Lock,
  Users,
  Globe,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/landingComponents/Footer";
import GuestNavbar from "../../components/landingComponents/Navbar";
import GuestWelcomeList from "../../components/landingComponents/GuestWelcomeList";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-indigo-100">

      <GuestNavbar />

      {/* HEADER */}
      <section className="bg-indigo-600 text-white py-12 sm:py-16 px-4 sm:px-6 relative">

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute left-4 top-4 sm:left-6 sm:top-6 
          flex items-center gap-2 
          text-sm sm:text-base
          text-white/90 hover:text-white transition"
        >
          <ArrowLeft size={18} />
          Back Home
        </button>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-center px-2"
        >
          <ShieldCheck size={40} className="mx-auto mb-4 sm:size-12" />

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Privacy Policy
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-indigo-100 mt-3 max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we handle
            your personal data.
          </p>
        </motion.div>
      </section>

      {/* CONTENT */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 max-w-5xl mx-auto space-y-10 sm:space-y-12">

        {/* Section Block Reusable Style */}
        {[
          {
            icon: <FileText className="text-indigo-600" size={20} />,
            title: "Introduction",
            content:
              "This Privacy Policy describes how we collect, use, and protect your information when you use our website and services. By accessing or using our platform, you agree to the terms outlined in this policy.",
          },
          {
            icon: <Users className="text-indigo-600" size={20} />,
            title: "Information We Collect",
            content:
              "We may collect personal information such as your name, email address, contact details, and any other information you voluntarily provide. We also collect non-personal data such as browser type, device information, and usage statistics.",
          },
          {
            icon: <Globe className="text-indigo-600" size={20} />,
            title: "How We Use Your Information",
            list: [
              "To provide and improve our services",
              "To communicate with you regarding updates or support",
              "To ensure security and prevent fraudulent activities",
              "To comply with legal obligations",
            ],
          },
          {
            icon: <Lock className="text-indigo-600" size={20} />,
            title: "Data Security",
            content:
              "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.",
          },
          {
            icon: <ShieldCheck className="text-indigo-600" size={20} />,
            title: "Third-Party Services",
            content:
              "We may use trusted third-party services to operate our platform. These services have access to your information only to perform tasks on our behalf and are obligated to keep it confidential.",
          },
          {
            icon: <FileText className="text-indigo-600" size={20} />,
            title: "Changes to This Policy",
            content:
              "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. Continued use of our services indicates acceptance of the revised policy.",
          },
        ].map((section, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="space-y-3"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-2">
              {section.icon}
              {section.title}
            </h2>

            {section.content && (
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {section.content}
              </p>
            )}

            {section.list && (
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-2">
                {section.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}

        {/* Contact Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow p-5 sm:p-6"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3">
            Contact Us
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            If you have any questions about this Privacy Policy or our data
            practices, please contact us at{" "}
            <span className="text-indigo-600 font-semibold">
              support@yourcompany.com
            </span>.
          </p>
        </motion.div>
      </section>

      <GuestWelcomeList />
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;