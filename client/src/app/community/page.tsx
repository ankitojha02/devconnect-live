"use client";

import { motion } from "framer-motion";
import {
  Users,
  MessageCircle,
  Star,
  Sparkles,
  Globe,
  Rocket,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Layers3,
  Zap,
  Code2,
} from "lucide-react";

const communities = [
  {
    name: "MERN Stack",
    members: "12K+ Members",
    desc: "Build scalable full stack applications using MongoDB, Express, React and Node.js.",
  },
  {
    name: "DevOps Engineers",
    members: "8K+ Members",
    desc: "Discuss CI/CD pipelines, Docker, Kubernetes and cloud infrastructure.",
  },
  {
    name: "Frontend Developers",
    members: "15K+ Members",
    desc: "Explore React, Next.js, animations and modern frontend experiences.",
  },
  {
    name: "AI Engineers",
    members: "9K+ Members",
    desc: "Collaborate on machine learning, AI apps and intelligent systems.",
  },
  {
    name: "Open Source",
    members: "20K+ Members",
    desc: "Contribute to open-source projects and collaborate globally.",
  },
  {
    name: "UI/UX Designers",
    members: "7K+ Members",
    desc: "Share modern UI inspirations, Figma designs and UX experiences.",
  },
];

export default function CommunityPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-100px] top-0 h-[350px] w-[350px] rounded-full bg-yellow-400/10 blur-3xl" />

        <div className="absolute bottom-0 right-[-100px] h-[350px] w-[350px] rounded-full bg-yellow-400/10 blur-3xl" />
      </div>

      {/* HERO SECTION */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-10 lg:py-24">
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
            Developer Communities
          </div>

          <h1 className="mt-8 text-5xl font-black leading-tight sm:text-6xl md:text-7xl xl:text-8xl">
            Connect With
            <span className="text-yellow-400">
              {" "}Global Communities
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg md:text-xl">
            Explore thousands of developer communities,
            collaborate on projects, share knowledge and
            build your network with passionate developers.
          </p>

          <button className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-yellow-400 px-8 py-5 text-lg font-bold text-black transition hover:scale-105">
            Join Community
            <ArrowRight className="h-5 w-5" />
          </button>
        </motion.div>

        {/* STATS */}
        <div className="mt-20 grid grid-cols-2 gap-5 md:grid-cols-4">
          {[
            {
              number: "120+",
              label: "Communities",
            },
            {
              number: "35K+",
              label: "Developers",
            },
            {
              number: "500K+",
              label: "Messages",
            },
            {
              number: "80K+",
              label: "Projects",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -5,
              }}
              className="rounded-3xl border border-yellow-500/10 bg-[#111111] p-5 text-center sm:p-8"
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

      {/* COMMUNITY CARDS */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-10">
        <div className="text-center">
          <p className="mb-4 text-yellow-400">
            TOP COMMUNITIES
          </p>

          <h2 className="text-4xl font-black sm:text-5xl md:text-6xl">
            Explore Popular Tech Communities
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base text-zinc-400 sm:text-lg">
            Join communities that match your skills,
            interests and career goals.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {communities.map((community, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -10,
              }}
              className="rounded-[32px] border border-yellow-500/10 bg-[#111111] p-8"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400">
                <Users className="h-8 w-8 text-black" />
              </div>

              <h3 className="text-2xl font-bold">
                {community.name}
              </h3>

              <p className="mt-3 text-yellow-400">
                {community.members}
              </p>

              <p className="mt-5 leading-relaxed text-zinc-400">
                {community.desc}
              </p>

              <div className="mt-8 space-y-4 text-zinc-400">
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-yellow-400" />
                  Real-time discussions
                </div>

                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-yellow-400" />
                  Project collaboration
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-yellow-400" />
                  Active networking
                </div>
              </div>

              <button className="mt-8 w-full rounded-2xl bg-yellow-400 px-6 py-4 font-semibold text-black transition hover:scale-[1.02]">
                Join Community
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* LEFT */}
          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="rounded-[40px] border border-yellow-500/10 bg-gradient-to-br from-yellow-400/10 to-transparent p-8 sm:p-12"
          >
            <p className="mb-4 text-yellow-400">
              WHY JOIN COMMUNITIES
            </p>

            <h2 className="text-4xl font-black leading-tight sm:text-5xl">
              Learn, Collaborate &
              <span className="text-yellow-400">
                {" "}Grow Together
              </span>
            </h2>

            <div className="mt-10 space-y-6">
              {[
                "Build connections with developers globally",
                "Collaborate on open-source projects",
                "Get career opportunities and referrals",
                "Participate in tech discussions and events",
                "Learn from experienced engineers",
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
              COMMUNITY BENEFITS
            </p>

            <h2 className="text-4xl font-black leading-tight sm:text-5xl">
              Everything You Need
              <span className="text-yellow-400">
                {" "}To Grow
              </span>
            </h2>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {[
                {
                  icon: Globe,
                  title: "Global Reach",
                },
                {
                  icon: Rocket,
                  title: "Career Growth",
                },
                {
                  icon: Layers3,
                  title: "Project Sharing",
                },
                {
                  icon: ShieldCheck,
                  title: "Safe Community",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="rounded-3xl border border-white/5 bg-black/30 p-6"
                  >
                    <Icon className="mb-5 text-yellow-400" />

                    <h3 className="text-xl font-bold">
                      {item.title}
                    </h3>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PLATFORM HIGHLIGHTS */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-10">
        <div className="rounded-[40px] border border-yellow-500/10 bg-gradient-to-r from-[#111111] to-[#0a0a0a] p-8 sm:p-14">
          <div className="text-center">
            <p className="mb-4 text-yellow-400">
              COMMUNITY EXPERIENCE
            </p>

            <h2 className="text-4xl font-black sm:text-5xl md:text-6xl">
              Designed For
              <span className="text-yellow-400">
                {" "}Modern Developers
              </span>
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: MessageCircle,
                title: "Real-Time Chat",
                desc: "Instant communication with developers worldwide.",
              },
              {
                icon: Users,
                title: "Developer Networking",
                desc: "Build meaningful connections and communities.",
              },
              {
                icon: Zap,
                title: "Fast Experience",
                desc: "Blazing fast modern UI powered by Next.js.",
              },
              {
                icon: Code2,
                title: "Project Collaboration",
                desc: "Collaborate and showcase your projects globally.",
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
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-10">
        <div className="rounded-[40px] border border-yellow-500/10 bg-[#111111] p-10 text-center sm:p-16">
          <p className="mb-4 text-yellow-400">
            JOIN THE COMMUNITY
          </p>

          <h2 className="text-4xl font-black leading-tight sm:text-6xl md:text-7xl">
            Ready To Connect With
            <span className="text-yellow-400">
              {" "}Developers?
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-xl">
            Join thousands of developers sharing
            ideas, projects and opportunities together
            on DevConnect communities.
          </p>

          <button className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-yellow-400 px-8 py-5 text-lg font-black text-black transition hover:scale-105">
            Explore Communities
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </main>
  );
}