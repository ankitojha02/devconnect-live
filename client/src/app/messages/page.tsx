"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
  Send,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

interface UserType {
  _id: string;
  name: string;
  username: string;
  avatar?: string;
}

interface MessageType {
  _id: string;
  sender: string;
  receiver: string;
  text: string;
}

export default function MessagesPage() {
  const API =
    "https://devconnect-live.onrender.com/api";

  const router = useRouter();

  const [currentUser, setCurrentUser] =
    useState<any>(null);

  const [followingUsers, setFollowingUsers] =
    useState<UserType[]>([]);

  const [selectedUser, setSelectedUser] =
    useState<UserType | null>(null);

  const [messages, setMessages] =
    useState<MessageType[]>([]);

  const [text, setText] =
    useState("");

  const [mobileChatOpen, setMobileChatOpen] =
    useState(false);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setCurrentUser(
        JSON.parse(storedUser)
      );
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchFollowingUsers();
    }
  }, [currentUser]);

  const fetchFollowingUsers =
    async () => {
      try {
        const token =
          localStorage.getItem("token");

        const res = await fetch(
          `${API}/user/${currentUser._id}/following`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data =
          await res.json();

        setFollowingUsers(
          data.following || []
        );

      } catch (error) {
        console.log(error);
      }
    };

  const openChat = async (
    user: UserType
  ) => {
    try {
      setSelectedUser(user);

      setMobileChatOpen(true);

      const token =
        localStorage.getItem("token");

      const res = await fetch(
        `${API}/message/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        await res.json();

      setMessages(
        data.messages || []
      );

    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage =
    async () => {
      try {
        if (!text.trim()) return;

        const token =
          localStorage.getItem("token");

        const res = await fetch(
          `${API}/message/send`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify({
              receiverId:
                selectedUser?._id,

              text,
            }),
          }
        );

        const data =
          await res.json();

        if (!res.ok) {
          return toast.error(
            data.message
          );
        }

        setMessages((prev) => [
          ...prev,
          data.data,
        ]);

        setText("");

      } catch (error) {
        console.log(error);

        toast.error(
          "Message failed"
        );
      }
    };

  return (
    <main className="flex h-screen bg-black text-white">

      {/* SIDEBAR */}

      <motion.div
        initial={{
          x: -50,
          opacity: 0,
        }}

        animate={{
          x: 0,
          opacity: 1,
        }}

        className={`${
          mobileChatOpen
            ? "hidden md:flex"
            : "flex"
        } w-full flex-col border-r border-zinc-800 bg-[#111111] md:w-[340px]`}
      >
        {/* TOP */}

        <div className="flex items-center justify-between border-b border-zinc-800 p-4">

          <div className="flex items-center gap-3">

            <button
              onClick={() =>
                router.push("/feed")
              }

              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black transition hover:bg-yellow-400 hover:text-black"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <h1 className="text-2xl font-black">
              Messages
            </h1>
          </div>
        </div>

        {/* USERS */}

        <div className="flex-1 space-y-2 overflow-y-auto p-3">

          {followingUsers.map((user) => (

            <motion.button
              whileHover={{
                scale: 1.02,
              }}

              whileTap={{
                scale: 0.98,
              }}

              key={user._id}

              onClick={() =>
                openChat(user)
              }

              className="flex w-full items-center gap-3 rounded-2xl p-3 transition hover:bg-black"
            >
              <img
                src={
                  user.avatar ||
                  "/developers.png"
                }

                alt="user"

                className="h-14 w-14 rounded-2xl object-cover"
              />

              <div className="text-left">
                <h3 className="font-bold">
                  {user.name}
                </h3>

                <p className="text-sm text-zinc-500">
                  @{user.username}
                </p>
              </div>
            </motion.button>

          ))}
        </div>
      </motion.div>

      {/* CHAT AREA */}

      <motion.div
        initial={{
          opacity: 0,
        }}

        animate={{
          opacity: 1,
        }}

        className={`${
          mobileChatOpen
            ? "flex"
            : "hidden md:flex"
        } flex-1 flex-col`}
      >

        {selectedUser ? (
          <>
            {/* TOP */}

            <div className="flex items-center gap-3 border-b border-zinc-800 bg-[#111111] p-4">

              {/* MOBILE BACK */}

              <button
                onClick={() =>
                  setMobileChatOpen(false)
                }

                className="flex h-10 w-10 items-center justify-center rounded-xl bg-black md:hidden"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>

              <img
                src={
                  selectedUser.avatar ||
                  "/developers.png"
                }

                alt="user"

                className="h-12 w-12 rounded-2xl object-cover"
              />

              <div>
                <h2 className="font-bold">
                  {selectedUser.name}
                </h2>

                <p className="text-sm text-zinc-500">
                  @{selectedUser.username}
                </p>
              </div>
            </div>

            {/* MESSAGES */}

            <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">

              {messages.map((msg) => {

                const isOwn =
                  msg.sender ===
                  currentUser._id;

                return (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}

                    animate={{
                      opacity: 1,
                      y: 0,
                    }}

                    key={msg._id}

                    className={`flex ${
                      isOwn
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[260px] rounded-2xl px-4 py-3 text-sm sm:max-w-[320px] sm:text-base ${
                        isOwn
                          ? "bg-yellow-400 text-black"
                          : "bg-[#111111]"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* INPUT */}

            <div className="border-t border-zinc-800 bg-[#111111] p-3 sm:p-4">

              <div className="flex items-center gap-3">

                <input
                  type="text"

                  value={text}

                  onChange={(e) =>
                    setText(e.target.value)
                  }

                  placeholder="Type message..."

                  className="flex-1 rounded-2xl bg-black px-4 py-3 text-sm outline-none sm:text-base"
                />

                <motion.button
                  whileTap={{
                    scale: 0.95,
                  }}

                  onClick={sendMessage}

                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black"
                >
                  <Send className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </>
        ) : (
          <div className="hidden flex-1 items-center justify-center text-zinc-500 md:flex">
            Select a chat
          </div>
        )}
      </motion.div>
    </main>
  );
}