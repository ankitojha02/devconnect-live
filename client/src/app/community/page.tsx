"use client";

import { motion } from "framer-motion";
import { Users, MessageCircle, Star } from "lucide-react";

const communities = [
  "MERN Stack",
  "DevOps Engineers",
  "Frontend Developers",
  "AI Engineers",
  "Open Source",
  "UI/UX Designers",
];

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="mb-4 text-yellow-400">
            COMMUNITY
          </p>

          <h1 className="text-5xl font-black md:text-7xl">
            Join Developer Communities
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            Explore communities, collaborate on projects and network with
            passionate developers.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {communities.map((community, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="rounded-[30px] border border-white/10 bg-[#111111] p-8"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400">
                <Users className="h-8 w-8 text-black" />
              </div>

              <h3 className="mb-4 text-2xl font-bold">
                {community}
              </h3>

              <div className="space-y-3 text-gray-400">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-yellow-400" />
                  Real-time discussion
                </div>

                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  Project collaboration
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-yellow-400" />
                  10K+ active members
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}