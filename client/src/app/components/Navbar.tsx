"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AuthModal from "@/app/components/AuthModal";

const navLinks = [
  {
    name: "Features",
    path: "/features",
  },
  {
    name: "Community",
    path: "/community",
  },
  {
    name: "Developers",
    path: "/developers",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  const [openAuth, setOpenAuth] = useState(false);

  return (
    <>
      {/* AUTH MODAL */}
      <AuthModal
        isOpen={openAuth}
        onClose={() => setOpenAuth(false)}
      />

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 border-b border-yellow-500/10 bg-black/70 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-6 lg:px-10">
          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{
                rotate: 10,
                scale: 1.05,
              }}
              className="rounded-2xl bg-yellow-400 p-3"
            >
              <Code2 className="h-6 w-6 text-black" />
            </motion.div>

            <h1 className="text-2xl font-black sm:text-3xl">
              DevConnect
            </h1>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.path;

              return (
                <Link
                  key={index}
                  href={link.path}
                  className={`relative text-lg font-medium transition ${
                    isActive
                      ? "text-yellow-400"
                      : "text-gray-300 hover:text-yellow-400"
                  }`}
                >
                  {link.name}

                  {isActive && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute -bottom-2 left-0 h-[2px] w-full bg-yellow-400"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            {/* GET STARTED */}
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.96,
              }}
              onClick={() => setOpenAuth(true)}
              className="hidden rounded-2xl bg-yellow-400 px-6 py-3 font-bold text-black shadow-lg shadow-yellow-400/20 transition md:block"
            >
              Get Started
            </motion.button>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-xl border border-white/10 p-2 md:hidden"
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              className="overflow-hidden border-t border-white/10 bg-[#0d0d0d] md:hidden"
            >
              <div className="flex flex-col gap-6 px-6 py-6">
                {navLinks.map((link, index) => {
                  const isActive =
                    pathname === link.path;

                  return (
                    <Link
                      key={index}
                      href={link.path}
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className={`text-lg font-medium transition ${
                        isActive
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}

                <button
                  onClick={() => {
                    setOpenAuth(true);
                    setMenuOpen(false);
                  }}
                  className="rounded-2xl bg-yellow-400 px-6 py-4 font-bold text-black"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}