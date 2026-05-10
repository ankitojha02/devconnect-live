"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Code2,
  ArrowUpRight,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `transition duration-300 ${
      pathname === path
        ? "text-yellow-400 font-semibold"
        : "text-zinc-400 hover:text-yellow-400"
    }`;

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-yellow-500/10 bg-[#050505]">
      {/* GLOW */}
      <div className="absolute left-[-120px] top-[-120px] h-[250px] w-[250px] rounded-full bg-yellow-400/10 blur-3xl" />

      <div className="absolute bottom-[-120px] right-[-120px] h-[250px] w-[250px] rounded-full bg-yellow-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        {/* TOP CTA */}
        

        {/* MAIN FOOTER */}
        <div className="grid gap-14 border-b border-zinc-800 pb-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* BRAND */}
          <div>
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400">
                <Code2 className="h-7 w-7 text-black" />
              </div>

              <h1 className="text-3xl font-black text-white">
                DevConnect
              </h1>
            </div>

            <p className="leading-relaxed text-zinc-400">
              The next-generation developer community platform
              for builders, creators and innovators.
            </p>

            {/* SOCIAL */}
            <div className="mt-8 flex items-center gap-4">
              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 text-zinc-400 transition hover:border-yellow-400 hover:text-yellow-400"
              >
                <FaXTwitter className="h-5 w-5" />
              </a>

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 text-zinc-400 transition hover:border-yellow-400 hover:text-yellow-400"
              >
                <FaGithub className="h-5 w-5" />
              </a>

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 text-zinc-400 transition hover:border-yellow-400 hover:text-yellow-400"
              >
                <FaLinkedinIn className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* PLATFORM */}
          <div>
            <h3 className="mb-6 text-xl font-bold text-white">
              Platform
            </h3>

            <div className="flex flex-col gap-4">
              <Link
                href="/features"
                className={linkClass("/features")}
              >
                Features
              </Link>

              <Link
                href="/community"
                className={linkClass("/community")}
              >
                Community
              </Link>

              <Link
                href="/developers"
                className={linkClass("/developers")}
              >
                Developers
              </Link>
            </div>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="mb-6 text-xl font-bold text-white">
              Resources
            </h3>

            <div className="flex flex-col gap-4">
              <Link
                href="/docs"
                className={linkClass("/docs")}
              >
                Docs
              </Link>

              <Link
                href="/api"
                className={linkClass("/api")}
              >
                API
              </Link>

              <Link
                href="/support"
                className={linkClass("/support")}
              >
                Support
              </Link>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="mb-6 text-xl font-bold text-white">
              Stay Updated
            </h3>

            <p className="mb-6 leading-relaxed text-zinc-400">
              Get the latest developer news, features and updates from
              DevConnect.
            </p>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-yellow-400"
              />

              <button className="w-full rounded-2xl bg-yellow-400 px-5 py-4 font-bold text-black transition hover:scale-[1.02]">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col items-center justify-between gap-5 pt-8 text-center text-sm text-zinc-500 md:flex-row md:text-left">
          <p>
            © 2026 DevConnect. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/privacy"
              className={linkClass("/privacy")}
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className={linkClass("/terms")}
            >
              Terms
            </Link>

            <Link
              href="/security"
              className={linkClass("/security")}
            >
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}