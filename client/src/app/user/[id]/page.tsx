"use client";

import { useEffect, useState } from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  ArrowLeft,
  Home,
} from "lucide-react";

interface UserType {
  _id: string;
  name: string;
  username: string;
  bio?: string;
  avatar?: string;
  followers?: any[];
  following?: any[];
}

interface PostType {
  _id: string;
  content: string;
  image?: string;

  author: {
    _id: string;
    name: string;
    username: string;
    avatar?: string;
  };
}

export default function UserProfilePage() {

  const API =
    "https://devconnect-live.onrender.com/api";

  const params = useParams();

  const router = useRouter();

  const [user, setUser] =
    useState<UserType | null>(null);

  const [posts, setPosts] =
    useState<PostType[]>([]);

  const [currentUser, setCurrentUser] =
  useState<any>(null);

 useEffect(() => {

  fetchUser();

  const storedUser =
    localStorage.getItem("user");

  if (storedUser) {

    setCurrentUser(
      JSON.parse(storedUser)
    );

  }

}, []);

  const fetchUser = async () => {
    try {

      const token =
        localStorage.getItem("token");

      // ================= USER =================

      const userRes = await fetch(
        `${API}/user/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userData =
        await userRes.json();

      setUser(userData);

      // ================= POSTS =================

      const postRes = await fetch(
        `${API}/posts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const postData =
        await postRes.json();

      const userPosts =
        postData.filter(
          (post: PostType) =>
            post.author?._id ===
            params.id
        );

      setPosts(userPosts);

    } catch (error) {
      console.log(error);
    }
  };

const isMutualFollow =

  currentUser?.following?.includes(
    user?._id
  ) &&

  user?.following?.some(
    (f: any) =>
      f._id === currentUser?._id
  );

  return (

    <main className="min-h-screen bg-black text-white">

      {/* ================= NAVBAR ================= */}

      <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-black/90 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

          {/* LEFT */}

          <div className="flex items-center gap-3 sm:gap-5">

            {/* BACK */}

            <button
              onClick={() =>
                router.push("/feed")
              }
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#111111] transition hover:bg-yellow-400 hover:text-black"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            {/* LOGO */}

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 sm:h-14 sm:w-14">
                <Home className="h-6 w-6 text-black sm:h-7 sm:w-7" />
              </div>

              <h1 className="text-2xl font-black sm:text-4xl">
                DevConnect
              </h1>

            </div>

          </div>

        </div>

      </nav>

      {/* ================= PAGE ================= */}

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">

        {/* ================= PROFILE CARD ================= */}

        <div className="rounded-[32px] border border-zinc-800 bg-[#111111] p-6 sm:p-8 lg:p-10">

          <div className="flex flex-col items-center text-center">

            {/* AVATAR */}

            <div className="h-28 w-28 overflow-hidden rounded-3xl bg-yellow-400 sm:h-36 sm:w-36">
              <img
                src={
                  user?.avatar ||
                  "/developers.png"
                }
                alt="profile"
                className="h-full w-full object-cover"
              />
            </div>

            {/* NAME */}

            <h1 className="mt-5 text-3xl font-black sm:text-5xl">
              {user?.name}
            </h1>

            {/* USERNAME */}

            <p className="mt-2 text-base text-zinc-400 sm:text-lg">
              @{user?.username}
            </p>

            {/* BIO */}

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500 sm:text-base">
              {user?.bio ||
                "Developer"}
            </p>

            {/* STATS */}

            <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-8">

              <div className="text-center">

                <h3 className="text-2xl font-black text-yellow-400 sm:text-3xl">
                  {posts.length}
                </h3>

                <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
                  Posts
                </p>

              </div>

              <div className="text-center">

                <h3 className="text-2xl font-black text-yellow-400 sm:text-3xl">
                  {user?.followers?.length || 0}
                </h3>

                <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
                  Followers
                </p>

              </div>

              <div className="text-center">

                <h3 className="text-2xl font-black text-yellow-400 sm:text-3xl">
                  {user?.following?.length || 0}
                </h3>

                <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
                  Following
                </p>

              </div>

            </div>


            {/* MESSAGE BUTTON */}

{
  isMutualFollow && (

    <button
      onClick={() =>
        router.push(
          `/messages/${user?._id}`
        )
      }
      className="mt-8 rounded-2xl bg-yellow-400 px-8 py-4 text-sm font-bold text-black transition hover:scale-105 sm:text-base"
    >
      Message
    </button>

  )
}

          </div>

        </div>

        {/* ================= POSTS ================= */}

        <div className="mt-8 space-y-6">

          {posts.map((post) => (

            <div
              key={post._id}
              className="rounded-[28px] border border-zinc-800 bg-[#111111] p-5 sm:p-6"
            >

              <p className="text-base leading-relaxed text-zinc-300 sm:text-lg">
                {post.content}
              </p>

              {post.image && (

                <img
                  src={post.image}
                  alt="post"
                  className="mt-5 max-h-[600px] w-full rounded-3xl object-cover"
                />

              )}

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}