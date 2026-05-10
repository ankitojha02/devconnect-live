"use client";

import { motion } from "framer-motion";

const developers = [
  {
    name: "Ankit Ojha",
    role: "Full Stack Developer",
  },
  {
    name: "Rahul Kumar",
    role: "Frontend Developer",
  },
  {
    name: "Aman Raj",
    role: "Backend Developer",
  },
  {
    name: "Priya Sharma",
    role: "UI/UX Designer",
  },
  {
    name: "Sanjay Verma",
    role: "DevOps Engineer",
  },
  {
    name: "Ritika Singh",
    role: "MERN Stack Developer",
  },
];

export default function DevelopersPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="mb-4 text-yellow-400">
            DEVELOPERS
          </p>

          <h1 className="text-5xl font-black md:text-7xl">
            Meet Developers
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            Connect with talented developers and collaborate on exciting
            projects.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {developers.map((dev, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="rounded-[30px] border border-white/10 bg-[#111111] p-8"
            >
              <div className="mb-6 h-24 w-24 rounded-3xl bg-yellow-400" />

              <h3 className="text-2xl font-bold">
                {dev.name}
              </h3>

              <p className="mt-2 text-gray-400">
                {dev.role}
              </p>

              <button className="mt-6 rounded-2xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:scale-105">
                View Profile
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}