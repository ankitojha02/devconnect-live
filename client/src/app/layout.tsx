"use client";

import "./globals.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // HIDE NAVBAR + FOOTER
  // ON AUTHENTICATED PAGES

  const hideLayout =
    pathname.startsWith("/feed") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/user/") ||
    pathname.startsWith("/messages") || pathname.startsWith("/notifications");

  return (
    <html lang="en">
      <body className="bg-black text-white">
        {!hideLayout && <Navbar />}

        {children}

        {!hideLayout && <Footer />}
      </body>
    </html>
  );
}