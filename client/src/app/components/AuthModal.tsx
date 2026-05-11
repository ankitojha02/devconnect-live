"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { api } from "@/app/services/api";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({
  isOpen,
  onClose,
}: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const endpoint = isLogin
        ? "/api/auth/login"
        : "/api/auth/signup";

      const payload = isLogin
        ? {
            email: formData.email,
            password: formData.password,
          }
        : formData;

      const res = await api.post(endpoint, payload);

      Cookies.set("token", res.data.token);

       localStorage.setItem(
      "token",
      res.data.token
    );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success(
        isLogin
          ? "Login successful 🚀"
          : "Account created 🚀"
      );

      onClose();
      router.push("/feed");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-md rounded-[35px] border border-white/10 bg-[#0f0f0f] p-8 shadow-2xl"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              className="absolute right-5 top-5 rounded-full bg-white/5 p-2 transition hover:bg-white/10"
            >
              <X className="h-5 w-5 text-white" />
            </button>

            {/* HEADER */}
            <div className="mb-8">
              <h2 className="text-4xl font-black">
                {isLogin
                  ? "Welcome Back"
                  : "Create Account"}
              </h2>

              <p className="mt-3 text-gray-400">
                Join DevConnect and connect with
                developers globally.
              </p>
            </div>

            {/* FORM */}
            <div className="space-y-5">
              {!isLogin && (
                <>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-white/10 bg-[#161616] px-5 py-4 outline-none transition focus:border-yellow-400"
                  />

                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-white/10 bg-[#161616] px-5 py-4 outline-none transition focus:border-yellow-400"
                  />
                </>
              )}

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-[#161616] px-5 py-4 outline-none transition focus:border-yellow-400"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-[#161616] px-5 py-4 outline-none transition focus:border-yellow-400"
              />

              {/* BUTTON */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full rounded-2xl bg-yellow-400 py-4 text-lg font-bold text-black transition hover:scale-[1.02]"
              >
                {loading
                  ? "Please wait..."
                  : isLogin
                  ? "Login"
                  : "Create Account"}
              </button>
            </div>

            {/* TOGGLE */}
            <div className="mt-8 text-center text-gray-400">
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}

              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 font-semibold text-yellow-400"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}