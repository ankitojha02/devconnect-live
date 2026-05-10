"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Globe,
  Layers3,
  MessageCircle,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Zap,
  CheckCircle2,
  Code2,
} from "lucide-react";

const docsSections = [
  {
    icon: Users,
    title: "What is DevConnect?",
    desc: "DevConnect is a modern social platform designed specifically for developers to connect, collaborate, network and grow together.",
  },
  {
    icon: Globe,
    title: "Why DevConnect?",
    desc: "Traditional social platforms are not built for developers. DevConnect focuses on projects, communities, networking and real-time collaboration.",
  },
  {
    icon: Rocket,
    title: "Career Growth",
    desc: "Build your developer identity, showcase projects and connect with recruiters, startups and engineering communities.",
  },
  {
    icon: MessageCircle,
    title: "Real-Time Networking",
    desc: "Chat instantly with developers worldwide using modern real-time communication features.",
  },
  {
    icon: Layers3,
    title: "Developer Communities",
    desc: "Join communities based on technologies like MERN, DevOps, AI, Frontend, UI/UX and Open Source.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Professional",
    desc: "A clean, professional and developer-focused environment built for meaningful collaboration.",
  },
];

export default function DocsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-120px] top-[-100px] h-[350px] w-[350px] rounded-full bg-yellow-400/10 blur-3xl" />

        <div className="absolute bottom-[-100px] right-[-100px] h-[350px] w-[350px] rounded-full bg-yellow-400/10 blur-3xl" />
      </div>

      {/* HERO SECTION */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-24 lg:px-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-5 py-2 text-sm text-yellow-300">
            <Sparkles className="h-4 w-4" />
            DevConnect Documentation
          </div>

          <h1 className="mt-8 text-5xl font-black leading-tight sm:text-6xl md:text-7xl xl:text-8xl">
            Everything About
            <span className="text-yellow-400">
              {" "}DevConnect
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg md:text-xl">
            Learn what DevConnect is, why developers love it,
            how communities work and why it is becoming the
            next-generation networking platform for developers.
          </p>

          <button className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-yellow-400 px-8 py-5 text-lg font-bold text-black transition hover:scale-105">
            Explore Documentation
            <ArrowRight className="h-5 w-5" />
          </button>
        </motion.div>

        {/* STATS */}
        <div className="mt-20 grid grid-cols-2 gap-5 md:grid-cols-4">
          {[
            {
              number: "35K+",
              label: "Developers",
            },
            {
              number: "120+",
              label: "Communities",
            },
            {
              number: "80K+",
              label: "Projects",
            },
            {
              number: "150+",
              label: "Countries",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -5,
              }}
              className="rounded-3xl border border-yellow-500/10 bg-[#111111] p-6 text-center sm:p-8"
            >
              <h2 className="text-3xl font-black text-yellow-400 sm:text-5xl">
                {item.number}
              </h2>

              <p className="mt-3 text-sm text-zinc-400 sm:text-base">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DOCUMENTATION GRID */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mb-16 text-center">
          <p className="mb-4 text-yellow-400">
            DOCUMENTATION
          </p>

          <h2 className="text-4xl font-black sm:text-5xl md:text-6xl">
            Explore The Platform
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Understand how DevConnect helps developers
            connect, collaborate and grow professionally.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {docsSections.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                whileHover={{
                  y: -10,
                }}
                className="rounded-[32px] border border-yellow-500/10 bg-zinc-950 p-8"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="mb-4 text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="leading-relaxed text-zinc-400">
                  {item.desc}
                </p>

                <button className="mt-8 flex items-center gap-2 text-yellow-400 transition hover:gap-4">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* WHY DEVCONNECT */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* LEFT */}
          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="rounded-[40px] border border-yellow-500/10 bg-gradient-to-br from-yellow-400/10 to-transparent p-8 sm:p-12"
          >
            <p className="mb-4 text-yellow-400">
              WHY DEVCONNECT
            </p>

            <h2 className="text-4xl font-black leading-tight sm:text-5xl">
              Built For
              <span className="text-yellow-400">
                {" "}Modern Developers
              </span>
            </h2>

            <div className="mt-10 space-y-6">
              {[
                "Focused completely on developers",
                "Real-time collaboration & messaging",
                "Professional networking environment",
                "Project showcasing & portfolio growth",
                "Communities for every tech stack",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4"
                >
                  <CheckCircle2 className="mt-1 text-yellow-400" />

                  <p className="text-base text-zinc-300 sm:text-lg">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="rounded-[40px] border border-yellow-500/10 bg-zinc-950 p-8 sm:p-12"
          >
            <p className="mb-4 text-yellow-400">
              PLATFORM BENEFITS
            </p>

            <h2 className="text-4xl font-black leading-tight sm:text-5xl">
              More Than Just A
              <span className="text-yellow-400">
                {" "}Social Platform
              </span>
            </h2>

            <p className="mt-6 text-base leading-relaxed text-zinc-400 sm:text-lg">
              DevConnect combines networking, communities,
              project collaboration and developer branding
              into one modern ecosystem.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-5">
              <div className="rounded-3xl border border-white/5 bg-black/30 p-6">
                <Users className="mb-4 text-yellow-400" />

                <h3 className="text-3xl font-black">
                  35K+
                </h3>

                <p className="mt-2 text-zinc-400">
                  Active Developers
                </p>
              </div>

              <div className="rounded-3xl border border-white/5 bg-black/30 p-6">
                <BookOpen className="mb-4 text-yellow-400" />

                <h3 className="text-3xl font-black">
                  120+
                </h3>

                <p className="mt-2 text-zinc-400">
                  Communities
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="rounded-[40px] border border-yellow-500/10 bg-[#111111] p-8 sm:p-14">
          <div className="text-center">
            <p className="mb-4 text-yellow-400">
              CORE FEATURES
            </p>

            <h2 className="text-4xl font-black sm:text-5xl md:text-6xl">
              What Makes DevConnect Special
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: MessageCircle,
                title: "Real-Time Chat",
                desc: "Connect instantly with developers worldwide.",
              },
              {
                icon: Briefcase,
                title: "Career Opportunities",
                desc: "Discover internships and developer jobs.",
              },
              {
                icon: Star,
                title: "Developer Branding",
                desc: "Build your professional identity online.",
              },
              {
                icon: Code2,
                title: "Project Showcase",
                desc: "Share projects and collaborate globally.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -8,
                  }}
                  className="rounded-3xl border border-white/5 bg-black/30 p-8"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                    <Icon className="h-8 w-8" />
                  </div>

                  <h3 className="text-2xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-relaxed text-zinc-400">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="rounded-[40px] border border-yellow-500/10 bg-gradient-to-r from-[#111111] to-[#0a0a0a] p-10 text-center sm:p-16">
          <p className="mb-4 text-yellow-400">
            JOIN DEVCONNECT
          </p>

          <h2 className="text-4xl font-black leading-tight sm:text-6xl md:text-7xl">
            Ready To Join The
            <span className="text-yellow-400">
              {" "}Developer Community?
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-xl">
            Connect with developers, collaborate on projects,
            showcase your skills and grow your technical identity.
          </p>

          <button className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-yellow-400 px-8 py-5 text-lg font-black text-black transition hover:scale-105">
            Get Started
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </main>
  );
}