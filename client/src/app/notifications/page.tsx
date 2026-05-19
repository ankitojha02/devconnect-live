"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
  Bell,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

interface NotificationType {
  _id: string;

  type: string;

  sender: {
    name: string;
    avatar?: string;
  };

  createdAt: string;
}

export default function NotificationsPage() {

  const API =
    "https://devconnect-live.onrender.com/api";

  const router = useRouter();

  const [notifications,
    setNotifications] = useState<
      NotificationType[]
    >([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        const res = await fetch(
          `${API}/notifications`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        const data =
          await res.json();

        setNotifications(
          data.notifications || []
        );

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <main className="min-h-screen bg-black text-white">

      {/* TOPBAR */}

      <div className="sticky top-0 z-50 flex items-center gap-4 border-b border-zinc-800 bg-black p-4">

        <button
          onClick={() =>
            router.push("/feed")
          }

          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#111111]"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">

          <Bell className="h-7 w-7 text-yellow-400" />

          <h1 className="text-2xl font-black">
            Notifications
          </h1>
        </div>
      </div>

      {/* LIST */}

      <div className="mx-auto max-w-2xl space-y-4 p-4">

        {notifications.map((item) => (

          <motion.div
            key={item._id}

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            className="flex items-center gap-4 rounded-3xl border border-zinc-800 bg-[#111111] p-4"
          >

            <img
              src={
                item.sender?.avatar ||
                "/developers.png"
              }

              alt="user"

              className="h-14 w-14 rounded-2xl object-cover"
            />

            <div>

              <p className="text-sm text-zinc-300">

                <span className="font-bold text-white">
                  {item.sender?.name}
                </span>

                {" "}started following you.
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                {new Date(
                  item.createdAt
                ).toLocaleString()}
              </p>
            </div>
          </motion.div>
        ))}

        {notifications.length === 0 && (
          <div className="mt-20 text-center text-zinc-500">
            No notifications yet
          </div>
        )}
      </div>
    </main>
  );
}