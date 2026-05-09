"use client";

import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold">
          DevConnect 🚀
        </h1>

        <p className="mt-4 text-slate-400">
          The developers social platform
        </p>
      </motion.div>
    </main>
  );
}