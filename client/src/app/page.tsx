"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import AuthModal from "@/app/components/AuthModal";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  Code2,
  Globe,
  Layers3,
  MessageCircle,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Zap,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Real-Time Messaging",
    desc: "Chat instantly with developers worldwide using Socket.io.",
  },
  {
    icon: Layers3,
    title: "Developer Feed",
    desc: "Explore trending developer projects and communities.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    desc: "Get real-time alerts for follows, likes and messages.",
  },
  {
    icon: Globe,
    title: "Global Community",
    desc: "Collaborate with developers from across the globe.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    desc: "JWT-based authentication with secure APIs.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Powered by Next.js, TypeScript and modern deployment.",
  },
];

const stats = [
  {
    number: "25K+",
    label: "Developers",
  },
  {
    number: "150K+",
    label: "Messages",
  },
  {
    number: "12K+",
    label: "Projects",
  },
];

const techStack = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Socket.io",
  "MongoDB",
  "Express.js",
  "Node.js",
];



export default function HomePage() {

const [openAuth, setOpenAuth] = useState(false);
  return (
    <main className="overflow-hidden bg-black text-white">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-150px] top-[-100px] h-[450px] w-[450px] rounded-full bg-yellow-400/10 blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] h-[450px] w-[450px] rounded-full bg-yellow-400/10 blur-3xl" />
      </div>

<>
  <Toaster position="top-right" />

  <AuthModal
    isOpen={openAuth}
    onClose={() => setOpenAuth(false)}
  />

  {/* YOUR WHOLE PAGE JSX */}
</>


      {/* NAVBAR */}
     
      {/* HERO SECTION */}
      <section className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-20 px-6 py-10 lg:grid-cols-2 lg:px-10">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-5 py-2 text-sm text-yellow-300">
            <Sparkles className="h-4 w-4" />
            Developer Social Platform
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl font-black leading-[0.95] sm:text-7xl md:text-8xl">
              Connect.
              <br />
              Build.
              <br />
              <span className="text-yellow-400">
                Grow.
              </span>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl">
              A modern social network for developers to connect,
              collaborate, showcase projects and grow their technical
              identity globally.
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col gap-5 sm:flex-row">
            <button 
              onClick={() => setOpenAuth(true)}
              className="flex items-center justify-center gap-3 rounded-2xl bg-yellow-400 px-8 py-5 text-lg font-bold text-black shadow-2xl shadow-yellow-400/20 transition hover:scale-105"
            >
              Start Building
              <ArrowRight className="h-5 w-5" />
            </button>

            <button className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#151515] px-8 py-5 text-lg font-semibold transition hover:border-yellow-400">
              <Play className="h-5 w-5 text-yellow-400" />
              Watch Demo
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4 pt-6">
            {stats.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="rounded-3xl border border-white/10 bg-[#111111] p-5"
              >
                <h2 className="text-2xl font-black text-yellow-400 md:text-4xl">
                  {item.number}
                </h2>

                <p className="mt-2 text-sm text-gray-400 md:text-base">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE PNG ILLUSTRATION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          {/* GLOW */}
          <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400/20 blur-3xl" />

          {/* FLOATING BADGES */}
          

          {/* MAIN ILLUSTRATION */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
            className="relative z-10"
          >
            <Image
              src="/3d.png"
              alt="DevConnect UI"
              width={900}
              height={900}
              priority
              className="w-full object-contain drop-shadow-[0_0_50px_rgba(255,204,0,0.25)]"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mb-20 text-center">
          <p className="mb-4 text-yellow-400">
            POWERFUL FEATURES
          </p>

          <h2 className="text-5xl font-black md:text-6xl">
            Designed For Developers
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            Everything you need to network, collaborate and grow as a
            developer in one powerful platform.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                whileHover={{
                  y: -10,
                }}
                className="rounded-[32px] border border-white/10 bg-[#111111] p-8 transition"
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

      {/* SHOWCASE SECTION */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-28 lg:grid-cols-2 lg:px-10">
        {/* LEFT */}
        <motion.div
          whileInView={{
            opacity: [0, 1],
            x: [-40, 0],
          }}
          viewport={{ once: true }}
          className="rounded-[40px] border border-white/10 bg-[#111111] p-10"
        >
          <p className="mb-4 text-yellow-400">
            WHY DEVCONNECT
          </p>

          <h2 className="text-5xl font-black leading-tight">
            Build Your Developer Identity.
          </h2>

          <div className="mt-10 space-y-6">
            {[
              "Showcase your projects beautifully.",
              "Connect with recruiters and developers.",
              "Build communities around your tech stack.",
              "Grow your professional developer presence.",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4"
              >
                <CheckCircle2 className="mt-1 h-6 w-6 text-yellow-400" />

                <p className="text-lg text-gray-300">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          whileInView={{
            opacity: [0, 1],
            x: [40, 0],
          }}
          viewport={{ once: true }}
          className="rounded-[40px] border border-white/10 bg-[#111111] p-10"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-black">
              Community Ratings
            </h3>

            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="fill-yellow-400" />
              <Star className="fill-yellow-400" />
              <Star className="fill-yellow-400" />
              <Star className="fill-yellow-400" />
              <Star className="fill-yellow-400" />
            </div>
          </div>

          <div className="mt-10 space-y-5">
            {[
              "Beautiful and modern social experience",
              "Built for developers by developers",
              "Highly scalable architecture",
              "Real-time communication and engagement",
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/5 bg-[#0d0d0d] p-5"
              >
                <p className="text-lg text-gray-300">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* TECH STACK */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="rounded-[40px] border border-white/10 bg-[#111111] p-10">
          <div className="text-center">
            <p className="mb-4 text-yellow-400">
              MODERN TECH STACK
            </p>

            <h2 className="text-5xl font-black">
              Built With Modern Technologies
            </h2>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.05,
                }}
                className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 px-6 py-4 text-lg font-semibold text-yellow-300"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-28 pt-28 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-[45px] border border-yellow-400/20 bg-gradient-to-r from-[#121212] to-[#0d0d0d] p-14 text-center">
          <h2 className="text-5xl font-black leading-tight md:text-6xl">
            Join The Future Of
            <br />
            Developer Networking
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            Connect with developers, showcase your skills, build projects
            and grow your technical career with DevConnect.
          </p>

          <button 
            onClick={() => setOpenAuth(true)}
            className="mt-10 rounded-2xl bg-yellow-400 px-10 py-5 text-lg font-black text-black transition hover:scale-105"
          >
            Start Building 🚀
          </button>
        </div>
      </section>

      {/* ================= EXTRA SECTIONS ================= */}

{/* TESTIMONIALS */}
<section className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
  <div className="mb-16 text-center">
    <p className="mb-4 text-yellow-400">
      COMMUNITY LOVE
    </p>

    <h2 className="text-4xl font-black md:text-6xl">
      Developers Are Loving DevConnect
    </h2>

    <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
      Join thousands of developers collaborating, networking and building
      amazing projects together.
    </p>
  </div>

  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
    {[
      {
        name: "Rahul Verma",
        role: "Frontend Developer",
        text: "DevConnect helped me connect with amazing developers and land freelance opportunities.",
      },
      {
        name: "Ananya Sharma",
        role: "Full Stack Engineer",
        text: "The real-time community and project sharing experience feels premium and modern.",
      },
      {
        name: "Aman Khan",
        role: "Backend Developer",
        text: "Best developer networking platform UI I’ve ever seen. Super clean and engaging.",
      },
    ].map((item, index) => (
      <motion.div
        key={index}
        whileHover={{ y: -10 }}
        className="rounded-[32px] border border-white/10 bg-[#111111] p-8"
      >
        <div className="mb-5 flex items-center gap-1 text-yellow-400">
          <Star className="fill-yellow-400" />
          <Star className="fill-yellow-400" />
          <Star className="fill-yellow-400" />
          <Star className="fill-yellow-400" />
          <Star className="fill-yellow-400" />
        </div>

        <p className="leading-relaxed text-gray-300">
          "{item.text}"
        </p>

        <div className="mt-8 flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-yellow-400" />

          <div>
            <h4 className="text-lg font-bold">
              {item.name}
            </h4>

            <p className="text-sm text-gray-400">
              {item.role}
            </p>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</section>

{/* PLATFORM STATS */}
<section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
  <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
    {[
      {
        number: "500K+",
        label: "Messages Sent",
      },
      {
        number: "80K+",
        label: "Projects Shared",
      },
      {
        number: "35K+",
        label: "Active Developers",
      },
      {
        number: "120+",
        label: "Communities",
      },
    ].map((item, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.03 }}
        className="rounded-[30px] border border-white/10 bg-[#111111] p-8 text-center"
      >
        <h3 className="text-3xl font-black text-yellow-400 md:text-5xl">
          {item.number}
        </h3>

        <p className="mt-3 text-gray-400">
          {item.label}
        </p>
      </motion.div>
    ))}
  </div>
</section>

{/* FAQ SECTION */}
<section className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
  <div className="mb-16 text-center">
    <p className="mb-4 text-yellow-400">
      FAQ
    </p>

    <h2 className="text-4xl font-black md:text-6xl">
      Frequently Asked Questions
    </h2>
  </div>

  <div className="space-y-6">
    {[
      {
        q: "What is DevConnect?",
        a: "DevConnect is a developer-focused social platform for networking, collaboration and project showcasing.",
      },
      {
        q: "Is DevConnect free to use?",
        a: "Yes, the platform is completely free for developers and creators.",
      },
      {
        q: "Does it support real-time messaging?",
        a: "Yes, DevConnect uses Socket.io for real-time communication.",
      },
      {
        q: "Can I showcase my projects?",
        a: "Absolutely. You can create posts, share projects and build your portfolio identity.",
      },
    ].map((faq, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.01 }}
        className="rounded-[28px] border border-white/10 bg-[#111111] p-7"
      >
        <h3 className="text-xl font-bold">
          {faq.q}
        </h3>

        <p className="mt-3 leading-relaxed text-gray-400">
          {faq.a}
        </p>
      </motion.div>
    ))}
  </div>
</section>

{/* FOOTER */}

    </main>
  );
}