"use client";

import {
  useEffect,
  useState,
  useRef,
} from "react";

import {
  ArrowLeft,
  Send,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import { socket } from "@/app/lib/socket";



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

  const [onlineUsers, setOnlineUsers] =
  useState<string[]>([]);

  const messagesEndRef =
  useRef<HTMLDivElement | null>(
    null
  );

  const [mobileChatOpen, setMobileChatOpen] =
    useState(false);

 useEffect(() => {
  const storedUser =
    localStorage.getItem("user");

  if (storedUser) {

    const parsedUser =
      JSON.parse(storedUser);

    setCurrentUser(parsedUser);

    // JOIN SOCKET ROOM

    socket.emit(
      "join",
      parsedUser._id
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

      

        setText("");

      } catch (error) {
        console.log(error);

        toast.error(
          "Message failed"
        );
      }
    };


    useEffect(() => {

  socket.on(
    "newMessage",
    (newMessage) => {

      // ONLY CURRENT CHAT

      if (
        newMessage.sender ===
          selectedUser?._id ||

        newMessage.receiver ===
          selectedUser?._id
      ) {
        setMessages((prev) => [
          ...prev,
          newMessage,
        ]);
      }
    }
  );

  return () => {
    socket.off("newMessage");
  };

}, [selectedUser]);

// ONLINE USERS

useEffect(() => {

  socket.on(
    "onlineUsers",
    (users) => {

      setOnlineUsers(users);

    }
  );

  return () => {
    socket.off("onlineUsers");
  };

}, []);

// AUTO SCROLL

useEffect(() => {

  messagesEndRef.current?.
    scrollIntoView({
      behavior: "smooth",
    });

}, [messages]);

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

  <div className="flex items-center gap-2">

    <h3 className="font-bold">
      {user.name}
    </h3>

    {onlineUsers.includes(
      user._id
    ) && (
      <div className="h-2 w-2 rounded-full bg-green-500" />
    )}

  </div>

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

  <div className="flex items-center gap-2">

    <h2 className="font-bold">
      {selectedUser.name}
    </h2>

    {onlineUsers.includes(
      selectedUser._id
    ) ? (
      <span className="text-xs text-green-500">
        Online
      </span>
    ) : (
      <span className="text-xs text-zinc-500">
        Offline
      </span>
    )}

  </div>

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

              <div ref={messagesEndRef} />
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

  onKeyDown={(e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  }}

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