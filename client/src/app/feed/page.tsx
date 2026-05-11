"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  MessageCircle,
  Send,
  Search,
  Users,
  ImageIcon,
  Bell,
  Home,
  Compass,
  PlusSquare,
  Settings,
} from "lucide-react";

interface PostType {
  _id: string;
  content: string;
  image?: string;
  likes: string[];
  comments: any[];

  author: {
    _id: string;
    name: string;
    username: string;
    avatar?: string;
    bio?: string;
  };
}

export default function FeedPage() {
  const API = "https://devconnect-live.onrender.com/api";

  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

useEffect(() => {
  const storedUser =
    localStorage.getItem("user");

  if (
    storedUser &&
    storedUser !== "undefined"
  ) {
    try {
      setUser(JSON.parse(storedUser));
    } catch (error) {
      console.log(error);
    }
  }
}, []);

  // ================= FETCH POSTS =================

const fetchPosts = async () => {
  try {
    const res = await fetch(`${API}/posts`);

    const data = await res.json();

    console.log("POST RESPONSE:", data);

    // SAFELY HANDLE ARRAY
    if (Array.isArray(data)) {
      setPosts(data);
    }

    else if (Array.isArray(data.posts)) {
      setPosts(data.posts);
    }

    else if (Array.isArray(data.data)) {
      setPosts(data.data);
    }

    else {
      setPosts([]);
    }

  } catch (error) {
    console.log(error);
    setPosts([]);
  }
};

  // ================= CREATE POST =================

  const createPost = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("text", text);

      if (image) {
        formData.append("image", image);
      }

      const res = await fetch(`${API}/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message || "Failed");
      }

      toast.success("Post created");

      setText("");
      setImage(null);

      fetchPosts();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ================= LIKE POST =================

  const likePost = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${API}/posts/${id}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  // ================= SEARCH USERS =================

  const searchUsers = async (value: string) => {
    try {
      setSearch(value);

      if (!value) {
        setUsers([]);
        return;
      }

      const res = await fetch(
        `${API}/user/search/users?search=${value}`
      );

      const data = await res.json();

      setUsers(data.users || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= FOLLOW USER =================

  const followUser = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API}/user/follow/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      toast.success(data.message || "Followed");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* ===================== TOP NAV ===================== */}

      <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          {/* LOGO */}

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400">
              <Home className="h-7 w-7 text-black" />
            </div>

            <h1 className="hidden text-3xl font-black sm:block">
              DevConnect
            </h1>
          </div>

          {/* SEARCH */}

          <div className="hidden w-full max-w-xl lg:block">
            <div className="flex items-center gap-3 rounded-2xl bg-[#111111] px-5 py-4">
              <Search className="h-5 w-5 text-yellow-400" />

              <input
                type="text"
                placeholder="Search developers..."
                value={search}
                onChange={(e) => searchUsers(e.target.value)}
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* NAV ICONS */}

          <div className="flex items-center gap-5">
            <button className="text-zinc-300 transition hover:text-yellow-400">
              <Home className="h-6 w-6" />
            </button>

            <button className="text-zinc-300 transition hover:text-yellow-400">
              <Compass className="h-6 w-6" />
            </button>

            <button className="text-zinc-300 transition hover:text-yellow-400">
              <Bell className="h-6 w-6" />
            </button>

            <button className="text-zinc-300 transition hover:text-yellow-400">
              <Settings className="h-6 w-6" />
            </button>

            <div className="h-12 w-12 overflow-hidden rounded-2xl bg-yellow-400">
             <img
          src={
            user?.avatar ||
            "/developers.png"
          }
          alt="profile"
          className="h-full w-full object-cover"
        />
            </div>
          </div>
        </div>
      </nav>

      {/* ===================== MAIN ===================== */}

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-[280px_1fr_320px] lg:px-8">
        {/* ================= LEFT SIDEBAR ================= */}

       {/* ================= LEFT SIDEBAR ================= */}

<aside className="hidden lg:block">
  <div className="sticky top-28 rounded-[32px] border border-zinc-800 bg-[#111111] p-6">
    <div className="flex flex-col items-center text-center">
      <div className="h-28 w-28 overflow-hidden rounded-3xl bg-yellow-400">
        <img
          src={
            user?.avatar ||
            "/developers.png"
          }
          alt="profile"
          className="h-full w-full object-cover"
        />
      </div>

      <h2 className="mt-5 text-2xl font-black">
        {user?.name || "Developer"}
      </h2>

      <p className="mt-2 text-zinc-400">
        @{user?.username || "username"}
      </p>

      <p className="mt-4 text-sm leading-relaxed text-zinc-500">
        {user?.bio ||
          "No bio added yet 🚀"}
      </p>

      {/* STATS */}

      <div className="mt-8 grid w-full grid-cols-3 gap-3">
        <div className="rounded-2xl bg-black p-4">
          <h3 className="text-xl font-black text-yellow-400">
            {posts?.length || 0}
          </h3>

          <p className="mt-1 text-xs text-zinc-500">
            Posts
          </p>
        </div>

        <div className="rounded-2xl bg-black p-4">
          <h3 className="text-xl font-black text-yellow-400">
            {user?.followers?.length || 0}
          </h3>

          <p className="mt-1 text-xs text-zinc-500">
            Followers
          </p>
        </div>

        <div className="rounded-2xl bg-black p-4">
          <h3 className="text-xl font-black text-yellow-400">
            {user?.following?.length || 0}
          </h3>

          <p className="mt-1 text-xs text-zinc-500">
            Following
          </p>
        </div>
      </div>

      <button
        onClick={() =>
          router.push("/profile")
        }
        className="mt-8 w-full rounded-2xl bg-yellow-400 px-5 py-4 font-bold text-black transition hover:scale-[1.02]"
      >
        Edit Profile
      </button>
    </div>
  </div>
</aside>

        {/* ================= FEED ================= */}

        <section>
          {/* CREATE POST */}

          <div className="rounded-[32px] border border-zinc-800 bg-[#111111] p-6">
            <div className="flex gap-4">
              <div className="h-14 w-14 overflow-hidden rounded-2xl bg-yellow-400">
               <img
  src={
    user?.avatar ||
    "/developers.png"
  }
  alt="profile"
  className="h-full w-full object-cover"
/>
              </div>

              <textarea
                placeholder="Share something with developers..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[120px] w-full resize-none rounded-2xl bg-black p-5 outline-none"
              />
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-zinc-800 px-5 py-3 text-zinc-400">
                <ImageIcon className="h-5 w-5 text-yellow-400" />

                Upload Image

                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    setImage(e.target.files?.[0] || null)
                  }
                />
              </label>

              <button
                onClick={createPost}
                disabled={loading}
                className="flex items-center justify-center gap-3 rounded-2xl bg-yellow-400 px-8 py-4 font-bold text-black transition hover:scale-105"
              >
                <PlusSquare className="h-5 w-5" />

                {loading ? "Posting..." : "Create Post"}
              </button>
            </div>
          </div>

          {/* POSTS */}

          <div className="mt-8 space-y-8">
            {Array.isArray(posts) && posts.map((post) => (
              <div
                key={post._id}
                className="rounded-[32px] border border-zinc-800 bg-[#111111] p-6"
              >
                {/* USER */}

                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 overflow-hidden rounded-2xl bg-yellow-400">
                   <img
  src={
    post.author?.avatar ||
    "/developers.png"
  }
  alt="avatar"
  className="h-full w-full object-cover"
/>
                  </div>

                  <div>
                    <h3 className="font-bold">
                      {post.author?.name}
                    </h3>

                    <p className="text-sm text-zinc-500">
                      @{post.author?.username}
                    </p>
                  </div>
                </div>

                {/* TEXT */}

                <p className="mt-6 text-lg leading-relaxed text-zinc-300">
                  {post.content}
                </p>

                {/* IMAGE */}

                {post.image && (
                  <img
                    src={post.image}
                    alt="post"
                    className="mt-6 max-h-[600px] w-full rounded-3xl object-cover"
                  />
                )}

                {/* ACTIONS */}

                <div className="mt-8 flex items-center gap-8 border-t border-zinc-800 pt-6">
                  <button
                    onClick={() => likePost(post._id)}
                    className="flex items-center gap-3 text-zinc-400 transition hover:text-red-500"
                  >
                    <Heart className="h-6 w-6" />

                    {post.likes?.length}
                  </button>

                  <button className="flex items-center gap-3 text-zinc-400 transition hover:text-yellow-400">
                    <MessageCircle className="h-6 w-6" />

                    {post.comments?.length}
                  </button>

                  <button className="flex items-center gap-3 text-zinc-400 transition hover:text-yellow-400">
                    <Send className="h-6 w-6" />

                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= RIGHT SIDEBAR ================= */}

        <aside className="space-y-8">
          {/* SEARCH USERS */}

          <div className="rounded-[32px] border border-zinc-800 bg-[#111111] p-6">
            <div className="mb-6 flex items-center gap-3">
              <Search className="h-6 w-6 text-yellow-400" />

              <h2 className="text-2xl font-black">
                Find Developers
              </h2>
            </div>

            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between rounded-2xl bg-black p-4"
                >
                  <div>
                    <h3 className="font-semibold">
                      {user.name}
                    </h3>

                    <p className="text-sm text-zinc-500">
                      @{user.username}
                    </p>
                  </div>

                  <button
                    onClick={() => followUser(user._id)}
                    className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-bold text-black"
                  >
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* TRENDING */}

          <div className="rounded-[32px] border border-zinc-800 bg-[#111111] p-6">
            <div className="mb-6 flex items-center gap-3">
              <Users className="h-6 w-6 text-yellow-400" />

              <h2 className="text-2xl font-black">
                Trending Communities
              </h2>
            </div>

            <div className="space-y-4">
              {[
                "MERN Stack",
                "Frontend Developers",
                "DevOps Engineers",
                "AI Engineers",
                "Open Source",
              ].map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-black px-5 py-4 transition hover:bg-yellow-400 hover:text-black"
                >
                  #{item}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}