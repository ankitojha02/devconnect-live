"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import AuthModal from "@/app/components/AuthModal";
import {
  MessageCircle,
  Bell,
  ShieldCheck,
  Zap,
  Globe,
  Layers3,
  Sparkles,
  Code2,
  Users,
  Rocket,
  Cpu,
  Database,
  GitBranch,
  CheckCircle2,
  Star,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Real-time Messaging",
    desc: "Instant chat system powered by Socket.io with smooth live communication.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    desc: "Get notified instantly for follows, likes, comments and messages.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    desc: "JWT authentication with encrypted passwords and protected APIs.",
  },
  {
    icon: Globe,
    title: "Global Developer Network",
    desc: "Connect with developers worldwide and grow your professional circle.",
  },
  {
    icon: Zap,
    title: "Fast Performance",
    desc: "Optimized with Next.js, TypeScript and modern rendering pipelines.",
  },
  {
    icon: Layers3,
    title: "Modern Feed System",
    desc: "Interactive social feed with scalable backend architecture.",
  },
];

export default function FeaturesPage() {
    const [openAuth, setOpenAuth] = useState(false);
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <AuthModal
  isOpen={openAuth}
  onClose={() => setOpenAuth(false)}
/>
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-120px] top-[100px] h-[350px] w-[350px] rounded-full bg-yellow-400/10 blur-3xl" />

        <div className="absolute right-[-100px] top-[800px] h-[350px] w-[350px] rounded-full bg-yellow-400/10 blur-3xl" />
      </div>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
        {/* HERO */}
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
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-xs text-yellow-300 sm:px-5 sm:text-sm">
            <Sparkles className="h-4 w-4" />
            Powerful Features
          </div>

          <h1 className="text-4xl font-black leading-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Everything Developers
            <span className="text-yellow-400">
              {" "}Need.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg md:text-xl">
            DevConnect combines social networking,
            collaboration tools, real-time communication
            and developer branding into one modern
            platform.
          </p>
        </motion.div>

        {/* FEATURES GRID */}
        <div className="mt-16 grid gap-6 sm:mt-24 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 80,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                viewport={{
                  once: true,
                }}
                whileHover={{
                  y: -8,
                }}
                className="rounded-3xl border border-yellow-500/10 bg-zinc-950 p-6 transition hover:border-yellow-400/30 sm:p-8"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-black sm:h-16 sm:w-16">
                  <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>

                <h2 className="mb-4 text-xl font-bold sm:text-2xl">
                  {feature.title}
                </h2>

                <p className="leading-relaxed text-zinc-400">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* BUILT FOR MODERN DEVELOPER */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          className="mt-24 rounded-[32px] border border-yellow-500/10 bg-gradient-to-r from-yellow-400/10 to-transparent p-6 sm:mt-32 sm:p-12"
        >
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-black leading-tight sm:text-5xl">
                Built For The
                <span className="text-yellow-400">
                  {" "}Modern Developer
                </span>
              </h2>

              <p className="mt-6 text-base leading-relaxed text-zinc-400 sm:text-lg">
                Share projects, collaborate with teams,
                build your developer identity and connect
                with thousands of engineers globally.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="rounded-3xl border border-zinc-800 bg-black p-6 sm:p-8">
                <Code2 className="mb-4 text-yellow-400" />

                <h3 className="text-3xl font-black sm:text-4xl">
                  25K+
                </h3>

                <p className="mt-2 text-zinc-400">
                  Projects Shared
                </p>
              </div>

              <div className="rounded-3xl border border-zinc-800 bg-black p-6 sm:p-8">
                <Globe className="mb-4 text-yellow-400" />

                <h3 className="text-3xl font-black sm:text-4xl">
                  150+
                </h3>

                <p className="mt-2 text-zinc-400">
                  Countries
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* WHY DEVCONNECT */}
        <section className="mt-24 sm:mt-36">
          <div className="text-center">
            <p className="mb-4 text-sm text-yellow-400 sm:text-base">
              WHY DEVCONNECT
            </p>

            <h2 className="text-4xl font-black sm:text-6xl md:text-7xl">
              More Than Just A
              <span className="text-yellow-400">
                {" "}Social Platform
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-xl">
              DevConnect helps developers build
              communities, showcase projects,
              collaborate globally and create their
              professional identity.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3">
            {[
              {
                icon: Users,
                title: "Developer Communities",
                desc: "Join thousands of active tech communities and connect with developers worldwide.",
              },
              {
                icon: Rocket,
                title: "Project Growth",
                desc: "Showcase your projects beautifully and increase visibility among recruiters.",
              },
              {
                icon: Cpu,
                title: "Modern Architecture",
                desc: "Built using scalable technologies like Next.js, Socket.io and MongoDB.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -10,
                  }}
                  className="rounded-[32px] border border-yellow-500/10 bg-zinc-950 p-6 sm:p-10"
                >
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-black sm:h-16 sm:w-16">
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                  </div>

                  <h3 className="mb-5 text-2xl font-bold sm:text-3xl">
                    {item.title}
                  </h3>

                  <p className="text-base leading-relaxed text-zinc-400 sm:text-lg">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* PLATFORM EVOLUTION */}
        <section className="mt-24 sm:mt-40">
          <div className="text-center">
            <p className="mb-4 text-yellow-400">
              PLATFORM EVOLUTION
            </p>

            <h2 className="text-4xl font-black sm:text-6xl md:text-7xl">
              Built With
              <span className="text-yellow-400">
                {" "}Future Technologies
              </span>
            </h2>
          </div>

          <div className="mt-14 space-y-6 sm:mt-24 sm:space-y-10">
            {[
              {
                icon: Database,
                title: "Scalable Backend",
                desc: "Node.js, Express and MongoDB architecture for handling massive traffic.",
              },
              {
                icon: GitBranch,
                title: "CI/CD Deployment",
                desc: "Automated deployment pipelines with GitHub and Vercel integration.",
              },
              {
                icon: Zap,
                title: "High Performance",
                desc: "Optimized frontend rendering and blazing fast loading experience.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: -50,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.15,
                  }}
                  className="flex flex-col gap-6 rounded-[32px] border border-yellow-500/10 bg-zinc-950 p-6 sm:p-10 lg:flex-row lg:gap-8"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-yellow-400 text-black sm:h-20 sm:w-20">
                    <Icon className="h-8 w-8 sm:h-10 sm:w-10" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-black sm:text-3xl">
                      {item.title}
                    </h3>

                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* FEATURE HIGHLIGHTS */}
        <section className="mt-24 sm:mt-40">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            <motion.div
              whileHover={{
                scale: 1.02,
              }}
              className="rounded-[32px] border border-yellow-500/10 bg-gradient-to-br from-yellow-400/10 to-transparent p-6 sm:rounded-[40px] sm:p-12"
            >
              <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-black sm:h-16 sm:w-16">
                  <Star className="h-7 w-7 fill-black sm:h-8 sm:w-8" />
                </div>

                <h2 className="text-3xl font-black sm:text-4xl">
                  Premium Developer Experience
                </h2>
              </div>

              <div className="space-y-5 sm:space-y-6">
                {[
                  "Smooth UI animations powered by Framer Motion",
                  "Modern social networking features",
                  "Developer-focused clean interface",
                  "Real-time collaboration experience",
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

            <motion.div
              whileHover={{
                scale: 1.02,
              }}
              className="rounded-[32px] border border-yellow-500/10 bg-zinc-950 p-6 sm:rounded-[40px] sm:p-12"
            >
              <p className="mb-4 text-yellow-400">
                DEVCONNECT ECOSYSTEM
              </p>

              <h2 className="text-3xl font-black leading-tight sm:text-5xl">
                Build Your
                <span className="text-yellow-400">
                  {" "}Developer Brand
                </span>
              </h2>

              <p className="mt-6 text-base leading-relaxed text-zinc-400 sm:text-lg">
                Create your professional identity,
                share projects, collaborate with
                developers and become visible in the
                global tech ecosystem.
              </p>

              <button className="mt-10 flex items-center gap-3 rounded-2xl bg-yellow-400 px-6 py-4 text-base font-bold text-black transition hover:scale-105 sm:px-8 sm:py-5 sm:text-lg">
                Explore Platform

                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mt-24 pb-10 sm:mt-40">
          <div className="rounded-[32px] border border-yellow-500/10 bg-gradient-to-r from-[#111111] to-[#0a0a0a] p-8 text-center sm:rounded-[50px] sm:p-14">
            <p className="mb-5 text-yellow-400">
              START YOUR JOURNEY
            </p>

            <h2 className="text-4xl font-black leading-tight sm:text-6xl md:text-7xl">
              Ready To Build The
              <span className="text-yellow-400">
                {" "}Future?
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-zinc-400 sm:mt-8 sm:text-xl">
              Join thousands of developers building
              projects, communities and opportunities
              together on DevConnect.
            </p>

           <button
  onClick={() => setOpenAuth(true)}
  className="mt-10 rounded-2xl bg-yellow-400 px-8 py-4 text-base font-black text-black transition hover:scale-105 sm:px-10 sm:py-5 sm:text-lg"
>
  Join DevConnect 🚀
</button>
          </div>
        </section>
      </section>
    </main>
  );
}