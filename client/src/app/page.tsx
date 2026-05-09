"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Code2,
  Globe,
  Heart,
  Layers3,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const features = [
  {
    icon: MessageCircle,
    title: "Real-time Chat",
    desc: "Instant developer messaging with Socket.io.",
  },
  {
    icon: Globe,
    title: "Global Community",
    desc: "Connect with developers worldwide.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    desc: "Likes, follows and updates in real-time.",
  },
  {
    icon: Layers3,
    title: "Developer Feed",
    desc: "Modern algorithmic social feed experience.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Platform",
    desc: "JWT auth and scalable backend architecture.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Optimized Next.js performance with CI/CD.",
  },
];

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-[#0d0d0d] text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-200px] top-[-200px] h-[500px] w-[500px] rounded-full bg-yellow-400/10 blur-3xl" />
        <div className="absolute bottom-[-200px] right-[-200px] h-[500px] w-[500px] rounded-full bg-yellow-400/10 blur-3xl" />
      </div>

      {/* NAVBAR */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400">
            <Code2 className="h-7 w-7 text-black" />
          </div>

          <h1 className="text-4xl font-black tracking-tight">
            DevConnect
          </h1>
        </motion.div>

        <div className="hidden items-center gap-10 md:flex">
          <a className="cursor-pointer text-gray-300 transition hover:text-yellow-400">
            Features
          </a>

          <a className="cursor-pointer text-gray-300 transition hover:text-yellow-400">
            Community
          </a>

          <a className="cursor-pointer text-gray-300 transition hover:text-yellow-400">
            Developers
          </a>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="rounded-2xl bg-yellow-400 px-8 py-4 text-lg font-bold text-black"
          >
            Get Started
          </motion.button>
        </div>
      </nav>

      {/* HERO */}
      <section className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-16 px-6 py-10 lg:grid-cols-2 lg:px-10">
        {/* LEFT */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-5 py-2 text-sm text-yellow-300 backdrop-blur-md">
            <Sparkles className="h-4 w-4" />
            Developer Social Platform
          </div>

          <div className="space-y-6">
            <h1 className="text-6xl font-black leading-none tracking-tight md:text-8xl">
              Connect.
              <br />
              Build.
              <br />
              <span className="text-yellow-400">
                Grow.
              </span>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl">
              The modern social platform for developers to connect,
              collaborate, showcase projects, chat in real-time,
              and build a strong developer network.
            </p>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-8 py-5 text-lg font-bold text-black shadow-2xl shadow-yellow-400/20"
            >
              Start Networking
              <ArrowRight className="h-5 w-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl border border-white/10 bg-[#171717] px-8 py-5 text-lg font-semibold text-white"
            >
              Explore Platform
            </motion.button>
          </div>

          {/* BIG LEFT CARD */}
          <motion.div
            whileHover={{ y: -5 }}
            className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[#171717] p-8"
          >
            {/* Glow */}
            <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-yellow-400/10 to-transparent" />

            {/* Top */}
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-widest text-yellow-400">
                  Developer Reputation
                </p>

                <h2 className="mt-3 text-5xl font-black">
                  98%
                </h2>

                <p className="mt-3 max-w-sm text-gray-400">
                  Build your personal developer brand through
                  projects, networking, contributions and
                  collaborations.
                </p>
              </div>

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-yellow-400"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-400 text-3xl font-black text-black">
                  A+
                </div>
              </motion.div>
            </div>

            {/* Bottom stats */}
            <div className="relative z-10 mt-10 grid grid-cols-3 gap-5">
              <div className="rounded-2xl bg-black/40 p-5">
                <h3 className="text-3xl font-black text-yellow-400">
                  25K+
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Developers
                </p>
              </div>

              <div className="rounded-2xl bg-black/40 p-5">
                <h3 className="text-3xl font-black text-yellow-400">
                  10K+
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Projects
                </p>
              </div>

              <div className="rounded-2xl bg-black/40 p-5">
                <h3 className="text-3xl font-black text-yellow-400">
                  50K+
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Messages
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT UI */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="rounded-[40px] border border-white/10 bg-[#171717] p-6 shadow-2xl">
            {/* USERS */}
            <div className="mb-6 flex items-center gap-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ y: -6 }}
                  className="text-center"
                >
                  <div className="h-16 w-16 rounded-2xl border-2 border-yellow-400 bg-gray-700" />

                  <p className="mt-2 text-xs text-gray-300">
                    Dev {item}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* FEED CARD */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="rounded-[30px] bg-[#0d0d0d] p-6"
            >
              <div className="mb-5 flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-yellow-400" />

                <div>
                  <h3 className="text-2xl font-bold">
                    Ankit Ojha
                  </h3>

                  <p className="text-sm text-gray-400">
                    Full Stack Developer
                  </p>
                </div>
              </div>

              <p className="mb-5 text-gray-300">
                🚀 Successfully deployed DevConnect with
                Next.js, TypeScript, Socket.io, MongoDB,
                CI/CD and scalable backend architecture.
              </p>

              <div className="h-72 rounded-[30px] bg-gradient-to-br from-yellow-400/30 via-transparent to-transparent" />

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-5 text-gray-300">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-yellow-400" />
                    1.5k
                  </div>

                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-yellow-400" />
                    402
                  </div>
                </div>

                <button className="rounded-xl bg-yellow-400 px-5 py-2 font-semibold text-black">
                  Follow
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-20 text-center"
        >
          <p className="mb-4 text-yellow-400">
            POWERFUL FEATURES
          </p>

          <h2 className="text-5xl font-black md:text-6xl">
            Designed For Modern Developers
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            A complete developer ecosystem combining social
            networking, collaboration, communication and
            project showcasing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                whileHover={{
                  y: -10,
                }}
                className="rounded-[30px] border border-white/10 bg-[#171717] p-8"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400">
                  <Icon className="h-8 w-8 text-black" />
                </div>

                <h3 className="mb-4 text-2xl font-bold">
                  {feature.title}
                </h3>

                <p className="leading-relaxed text-gray-400">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Card 1 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-[35px] border border-white/10 bg-[#171717] p-8"
          >
            <TrendingUp className="mb-6 h-12 w-12 text-yellow-400" />

            <h2 className="text-5xl font-black">
              120%
            </h2>

            <p className="mt-3 text-gray-400">
              Faster networking growth for developers.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-[35px] border border-white/10 bg-[#171717] p-8"
          >
            <Users className="mb-6 h-12 w-12 text-yellow-400" />

            <h2 className="text-5xl font-black">
              25K+
            </h2>

            <p className="mt-3 text-gray-400">
              Developers already connected worldwide.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-[35px] border border-white/10 bg-[#171717] p-8"
          >
            <Star className="mb-6 h-12 w-12 text-yellow-400" />

            <h2 className="text-5xl font-black">
              4.9★
            </h2>

            <p className="mt-3 text-gray-400">
              Highly rated modern social developer platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 lg:px-10">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="mx-auto max-w-7xl rounded-[40px] border border-yellow-400/20 bg-gradient-to-r from-[#171717] to-[#101010] p-14 text-center"
        >
          <h2 className="text-5xl font-black leading-tight md:text-7xl">
            Join The Future
            <br />
            Of Developer Networking
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            Build your profile, connect with developers,
            showcase projects and collaborate globally
            using DevConnect.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-10 rounded-2xl bg-yellow-400 px-10 py-5 text-lg font-black text-black shadow-2xl shadow-yellow-400/20"
          >
            Launch DevConnect 🚀
          </motion.button>
        </motion.div>
      </section>
    </main>
  );
}