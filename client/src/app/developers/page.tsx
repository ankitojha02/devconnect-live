"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import AuthModal from "@/app/components/AuthModal";

import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Code2,
  Code2Icon,
  Globe,
  Layers3,
  MessageCircle,
  Rocket,
  Sparkles,
  Star,
  Users,
  Terminal
} from "lucide-react";

const developers = [
  {
    name: "Ankit Ojha",
    role: "Full Stack Developer",
    stack: "MERN • DevOps • Next.js",
  },
  {
    name: "Rahul Kumar",
    role: "Frontend Developer",
    stack: "React • TypeScript • UI/UX",
  },
  {
    name: "Aman Raj",
    role: "Backend Engineer",
    stack: "Node.js • APIs • MongoDB",
  },
  {
    name: "Priya Sharma",
    role: "UI/UX Designer",
    stack: "Figma • Motion • Branding",
  },
  {
    name: "Sanjay Verma",
    role: "DevOps Engineer",
    stack: "Docker • AWS • CI/CD",
  },
  {
    name: "Ritika Singh",
    role: "MERN Stack Developer",
    stack: "MongoDB • Express • React",
  },
];

export default function DevelopersPage() {
  const [openAuth, setOpenAuth] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* AUTH MODAL */}
      <AuthModal
        isOpen={openAuth}
        onClose={() => setOpenAuth(false)}
      />

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-100px] top-0 h-[350px] w-[350px] rounded-full bg-yellow-400/10 blur-3xl" />

        <div className="absolute bottom-0 right-[-100px] h-[350px] w-[350px] rounded-full bg-yellow-400/10 blur-3xl" />
      </div>

      {/* HERO SECTION */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT */}
          <motion.div
            initial={{
              opacity: 0,
              y: 60,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-5 py-2 text-sm text-yellow-300">
              <Sparkles className="h-4 w-4" />
              Global Developer Network
            </div>

            <div>
              <h1 className="text-5xl font-black leading-tight sm:text-6xl md:text-7xl xl:text-8xl">
                Meet Amazing
                <span className="text-yellow-400">
                  {" "}Developers
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg md:text-xl">
                Connect with talented developers,
                collaborate on projects, showcase
                your skills and build your developer
                identity globally with DevConnect.
              </p>
            </div>

            <div className="flex flex-col gap-5 sm:flex-row">
              <button
                onClick={() => setOpenAuth(true)}
                className="flex items-center justify-center gap-3 rounded-2xl bg-yellow-400 px-8 py-5 text-lg font-bold text-black transition hover:scale-105"
              >
                Join Developers
                <ArrowRight className="h-5 w-5" />
              </button>

              <button className="rounded-2xl border border-white/10 bg-[#111111] px-8 py-5 text-lg font-semibold transition hover:border-yellow-400">
                Explore Community
              </button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-5 pt-6 sm:grid-cols-4">
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
                  className="rounded-3xl border border-yellow-500/10 bg-[#111111] p-5 text-center"
                >
                  <h3 className="text-2xl font-black text-yellow-400">
                    {item.number}
                  </h3>

                  <p className="mt-2 text-sm text-zinc-400">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT ILLUSTRATION */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1,
            }}
            className="relative"
          >
            <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400/20 blur-3xl" />

            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="relative z-10"
            >
              <Image
                src="/developers.png"
                alt="Developers Illustration"
                width={900}
                height={900}
                priority
                className="w-full object-contain"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* DEVELOPERS GRID */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-10">
        <div className="text-center">
          <p className="mb-4 text-yellow-400">
            TOP DEVELOPERS
          </p>

          <h2 className="text-4xl font-black sm:text-5xl md:text-6xl">
            Explore Developer Profiles
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base text-zinc-400 sm:text-lg">
            Discover developers from multiple domains,
            technologies and communities.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {developers.map((dev, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -10,
              }}
              className="rounded-[32px] border border-yellow-500/10 bg-[#111111] p-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="h-20 w-20 rounded-3xl bg-yellow-400" />

                <div className="rounded-2xl bg-yellow-400/10 px-4 py-2 text-sm text-yellow-400">
                  Available
                </div>
              </div>

              <h3 className="text-2xl font-bold">
                {dev.name}
              </h3>

              <p className="mt-2 text-zinc-400">
                {dev.role}
              </p>

              <div className="mt-5 rounded-2xl border border-white/5 bg-black/40 p-4">
                <p className="text-sm text-yellow-300">
                  {dev.stack}
                </p>
              </div>

             <div className="mt-6 flex items-center gap-4 text-zinc-400">
  <Terminal className="h-5 w-5" />
  <Globe className="h-5 w-5" />
  <MessageCircle className="h-5 w-5" />
</div>

              <button
                onClick={() => setOpenAuth(true)}
                className="mt-8 w-full rounded-2xl bg-yellow-400 px-6 py-4 font-semibold text-black transition hover:scale-[1.02]"
              >
                View Profile
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY DEVELOPERS LOVE DEVCONNECT */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* LEFT */}
          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="rounded-[40px] border border-yellow-500/10 bg-gradient-to-br from-yellow-400/10 to-transparent p-8 sm:p-12"
          >
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                <Star className="h-8 w-8 fill-black" />
              </div>

              <h2 className="text-3xl font-black sm:text-4xl">
                Why Developers Love Us
              </h2>
            </div>

            <div className="space-y-6">
              {[
                "Real-time communication system",
                "Beautiful developer portfolio showcase",
                "Community collaboration ecosystem",
                "Modern scalable architecture",
                "Premium UI/UX experience",
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
            className="rounded-[40px] border border-yellow-500/10 bg-[#111111] p-8 sm:p-12"
          >
            <p className="mb-4 text-yellow-400">
              DEVELOPER ECOSYSTEM
            </p>

            <h2 className="text-4xl font-black leading-tight sm:text-5xl">
              Build Your
              <span className="text-yellow-400">
                {" "}Professional Brand
              </span>
            </h2>

            <p className="mt-6 text-base leading-relaxed text-zinc-400 sm:text-lg">
              Create your professional developer
              identity, showcase projects, build
              communities and collaborate globally.
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
                <Layers3 className="mb-4 text-yellow-400" />

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

      {/* HIRING SECTION */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-10">
        <div className="rounded-[40px] border border-yellow-500/10 bg-gradient-to-r from-[#111111] to-[#0a0a0a] p-8 sm:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-yellow-400">
                HIRING & NETWORKING
              </p>

              <h2 className="text-4xl font-black leading-tight sm:text-6xl">
                Connect With
                <span className="text-yellow-400">
                  {" "}Top Talent
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                Discover developers, startups and
                communities while growing your
                technical network globally.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                {
                  icon: Briefcase,
                  title: "Hiring Opportunities",
                },
                {
                  icon: Rocket,
                  title: "Startup Collaboration",
                },
                {
                  icon: Code2,
                  title: "Open Source Projects",
                },
                {
                  icon: Users,
                  title: "Tech Communities",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={index}
                    whileHover={{
                      y: -5,
                    }}
                    className="rounded-3xl border border-white/5 bg-black/30 p-6"
                  >
                    <Icon className="mb-5 text-yellow-400" />

                    <h3 className="text-xl font-bold">
                      {item.title}
                    </h3>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-10">
        <div className="rounded-[40px] border border-yellow-500/10 bg-[#111111] p-10 text-center sm:p-16">
          <p className="mb-4 text-yellow-400">
            JOIN DEVCONNECT
          </p>

          <h2 className="text-4xl font-black leading-tight sm:text-6xl md:text-7xl">
            Ready To Connect With
            <span className="text-yellow-400">
              {" "}Developers?
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-xl">
            Join thousands of developers building
            projects, communities and opportunities
            together on DevConnect.
          </p>

          <button
            onClick={() => setOpenAuth(true)}
            className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-yellow-400 px-8 py-5 text-lg font-black text-black transition hover:scale-105"
          >
            Join DevConnect

            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </main>
  );
}