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
  comments: {
  _id?: string;
  text: string;
  user?: {
    name?: string;
    username?: string;
  };
}[];

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
  const [commentText, setCommentText] =
  useState<{ [key: string]: string }>({});

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
    const token =
  localStorage.getItem("token");

const res = await fetch(
  `${API}/posts`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

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

      formData.append("content", text);

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

      setPosts((prev) => [
  data.post,
  ...prev,
]);

    //   fetchPosts();
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

     if (value.trim().length < 2) {
  setUsers([]);
  return;
}

     const token =
  localStorage.getItem("token");

const res = await fetch(
  `${API}/user/search/users?search=${value}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      const data = await res.json();

      setUsers(data.users || []);
    } catch (error) {
      console.log(error);
    }
  };


// ================= ADD COMMENT =================

const addComment = async (
  postId: string
) => {
  try {
    const token =
      localStorage.getItem("token");

    const text =
      commentText[postId];

    if (!text?.trim()) {
      return toast.error(
        "Write a comment"
      );
    }

    const res = await fetch(
      `${API}/posts/${postId}/comment`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          text,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return toast.error(
        data.message ||
          "Comment failed"
      );
    }

    toast.success("Comment added");

    setCommentText((prev) => ({
      ...prev,
      [postId]: "",
    }));

    fetchPosts();

  } catch (error) {
    console.log(error);

    toast.error(
      "Something went wrong"
    );
  }
};


// ================= CHECK FOLLOWING =================

const isFollowing = (
  id: string
) => {
  return user?.following?.includes(id);
};

  // ================= FOLLOW USER =================
// ================= FOLLOW / UNFOLLOW USER =================

const followUser = async (
  id: string
) => {
  try {
    const token =
      localStorage.getItem("token");

    const endpoint =
      isFollowing(id)
        ? `${API}/user/unfollow/${id}`
        : `${API}/user/follow/${id}`;

    const res = await fetch(
      endpoint,
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return toast.error(
        data.message
      );
    }

    toast.success(data.message);

    // UPDATE LOCAL USER STATE

    let updatedFollowing =
      [...(user?.following || [])];

    if (isFollowing(id)) {
      updatedFollowing =
        updatedFollowing.filter(
          (f: string) => f !== id
        );
    }

    else {
      updatedFollowing.push(id);
    }

    const updatedUser = {
      ...user,
      following: updatedFollowing,
    };

    setUser(updatedUser);

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

  } catch (error) {
    console.log(error);

    toast.error(
      "Something went wrong"
    );
  }
};

  return (
    <main className="min-h-screen bg-black text-white">
      {/* ===================== TOP NAV ===================== */}

      <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          {/* LOGO */}

          <div className="flex items-start gap-3 sm:items-center sm:gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400">
              <Home className="h-7 w-7 text-black" />
            </div>

            <h1 className="hidden text-3xl font-black sm:block">
              DevConnect
            </h1>
          </div>

          {/* SEARCH */}

        <div className="relative hidden w-full max-w-xl lg:block">
  <div className="flex items-center gap-3 rounded-2xl bg-[#111111] px-5 py-4">
    <Search className="h-5 w-5 text-yellow-400" />

    <input
      type="text"
      placeholder="Search developers..."
      value={search}
      onChange={(e) =>
        searchUsers(e.target.value)
      }
      className="w-full bg-transparent outline-none"
    />
  </div>

  {/* SEARCH RESULTS */}

  {users.length > 0 && (
    <div className="absolute left-0 right-0 top-20 z-50 rounded-3xl border border-zinc-800 bg-[#111111] p-3 shadow-2xl">
      <div className="max-h-[400px] space-y-3 overflow-y-auto">
        {users.map((dev) => (
          <div
            key={dev._id}
            className="flex items-center justify-between rounded-2xl bg-black p-4 transition hover:bg-zinc-900"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-2xl bg-yellow-400">
                <img
                  src={
                    dev?.avatar ||
                    "/developers.png"
                  }
                  alt="user"
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <h3 className="font-bold">
                  {dev.name}
                </h3>

                <p className="text-sm text-zinc-500">
                  @{dev.username}
                </p>

                <p className="text-xs text-zinc-600">
                  {dev.bio ||
                    "Developer"}
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                followUser(dev._id)
              }
              className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
  isFollowing(dev._id)
    ? "bg-zinc-700 text-white"
    : "bg-yellow-400 text-black"
}`}
            >
              {isFollowing(dev._id)
  ? "Following"
  : "Follow"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )}
</div>

          {/* NAV ICONS */}

          <div className="flex items-center gap-3 sm:gap-5">
<button className="hidden text-zinc-300 transition hover:text-yellow-400 sm:block">
              <Home className="h-6 w-6" />
            </button>

<button className="hidden text-zinc-300 transition hover:text-yellow-400 sm:block">
              <Compass className="h-6 w-6" />
            </button>

<button className="hidden text-zinc-300 transition hover:text-yellow-400 sm:block">
              <Bell className="h-6 w-6" />
            </button>

<button className="hidden text-zinc-300 transition hover:text-yellow-400 sm:block">
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


      {/* MOBILE SEARCH */}
{/* MOBILE SEARCH */}

<div className="border-b border-zinc-800 bg-black px-3 py-3 lg:hidden">
  <div className="relative">
    <div className="flex items-center gap-3 rounded-2xl bg-[#111111] px-4 py-3">
      <Search className="h-5 w-5 text-yellow-400" />

      <input
        type="text"
        placeholder="Search developers..."
        value={search}
        onChange={(e) =>
          searchUsers(e.target.value)
        }
        className="w-full bg-transparent text-sm outline-none"
      />
    </div>

    {/* MOBILE SEARCH RESULTS */}

    {users.length > 0 && (
      <div className="absolute left-0 right-0 top-16 z-50 rounded-3xl border border-zinc-800 bg-[#111111] p-3 shadow-2xl">
        <div className="max-h-[350px] space-y-3 overflow-y-auto">
          {users.map((dev) => (
            <div
              key={dev._id}
              className="flex items-center justify-between rounded-2xl bg-black p-3"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-2xl bg-yellow-400">
                  <img
                    src={
                      dev?.avatar ||
                      "/developers.png"
                    }
                    alt="user"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-bold">
                    {dev.name}
                  </h3>

                  <p className="text-xs text-zinc-500">
                    @{dev.username}
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  followUser(dev._id)
                }
               className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
  isFollowing(dev._id)
    ? "bg-zinc-700 text-white"
    : "bg-yellow-400 text-black"
}`}
              >
                {isFollowing(dev._id)
  ? "Following"
  : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
</div>

      {/* ===================== MAIN ===================== */}

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-3 py-4 sm:px-4 md:px-5 lg:grid-cols-[260px_1fr_300px] lg:gap-8 lg:px-8 lg:py-8">
        {/* ================= LEFT SIDEBAR ================= */}

       {/* ================= LEFT SIDEBAR ================= */}

<aside className="order-1 lg:order-none">
 <div className="rounded-[32px] border border-zinc-800 bg-[#111111] p-5 lg:sticky lg:top-28 lg:p-6">
    <div className="flex flex-col items-center text-center">
      <div className="h-20 w-20 overflow-hidden rounded-3xl bg-yellow-400 lg:h-28 lg:w-28">
        <img
          src={
            user?.avatar ||
            "/developers.png"
          }
          alt="profile"
          className="h-full w-full object-cover"
        />
      </div>

      <h2 className="mt-4 text-xl font-black lg:text-2xl">
        {user?.name || "Developer"}
      </h2>

      <p className="mt-1 text-sm text-zinc-400">
        @{user?.username || "username"}
      </p>

      <p className="mt-3 text-xs leading-relaxed text-zinc-500 lg:text-sm">
        {user?.bio ||
          "No bio added yet 🚀"}
      </p>

      {/* STATS */}
<div className="mt-6 grid w-full grid-cols-3 gap-2 sm:gap-3">
  <div className="rounded-2xl bg-black px-2 py-4 sm:px-3 lg:px-4">
    <h3 className="text-lg font-black text-yellow-400 sm:text-xl">
      {posts?.length || 0}
    </h3>

    <p className="mt-1 text-[11px] text-zinc-500 sm:text-xs">
      Posts
    </p>
  </div>

  <div className="rounded-2xl bg-black px-2 py-4 sm:px-3 lg:px-4">
    <h3 className="text-lg font-black text-yellow-400 sm:text-xl">
      {user?.followers?.length || 0}
    </h3>

    <p className="mt-1 break-words text-[10px] leading-tight text-zinc-500 sm:text-xs">
      Followers
    </p>
  </div>

  <div className="rounded-2xl bg-black px-2 py-4 sm:px-3 lg:px-4">
    <h3 className="text-lg font-black text-yellow-400 sm:text-xl">
      {user?.following?.length || 0}
    </h3>

    <p className="mt-1 break-words text-[10px] leading-tight text-zinc-500 sm:text-xs">
      Following
    </p>
  </div>
</div>

      <button
        onClick={() =>
          router.push("/profile")
        }
        className="mt-6 w-full rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-bold text-black transition hover:scale-[1.02] lg:py-4 lg:text-base"
      >
        Edit Profile
      </button>
    </div>
  </div>
</aside>

        {/* ================= FEED ================= */}

      <section className="order-2">
          {/* CREATE POST */}

          <div className="rounded-[28px] border border-zinc-800 bg-[#111111] p-4 sm:p-5 lg:p-6">
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
                className="min-h-[100px] w-full resize-none rounded-2xl bg-black p-4 text-sm outline-none sm:min-h-[120px] sm:p-5 sm:text-base"
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
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-yellow-400 px-6 py-3 font-bold text-black transition hover:scale-105 sm:w-auto sm:px-8 sm:py-4"
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
                className="rounded-[28px] border border-zinc-800 bg-[#111111] p-4 sm:p-5 lg:p-6"
              >
                {/* USER */}

                <div className="flex items-start gap-3 sm:items-center sm:gap-4">
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

  <p className="mt-1 text-xs text-zinc-600">
    {post.author?.bio}
  </p>
</div>
                </div>

                {/* TEXT */}

                <p className="mt-5 text-sm leading-relaxed text-zinc-300 sm:text-base lg:text-lg">
                  {post.content}
                </p>

                {/* IMAGE */}

                {post.image && (
                  <img
                    src={post.image}
                    alt="post"
                    className="mt-5 max-h-[500px] w-full rounded-2xl object-cover sm:rounded-3xl"
                  />
                )}

                {/* ACTIONS */}

                <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-zinc-800 pt-5">


                  {/* COMMENT INPUT */}

<div className="mt-5 flex flex-col gap-3 sm:flex-row">
  <input
    type="text"
    placeholder="Write a comment..."
    value={
      commentText[post._id] || ""
    }
    onChange={(e) =>
      setCommentText((prev) => ({
        ...prev,
        [post._id]:
          e.target.value,
      }))
    }
    className="flex-1 rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none"
  />

  <button
    onClick={() =>
      addComment(post._id)
    }
    className="rounded-2xl bg-yellow-400 px-5 py-3 font-bold text-black sm:w-auto"
  >
    Comment
  </button>
</div>

{/* COMMENTS */}

<div className="mt-5 space-y-3">
  {post.comments?.map(
    (comment, index) => (
      <div
        key={index}
        className="rounded-2xl bg-black p-4"
      >
        <p className="text-sm font-bold text-yellow-400">
          @
          {comment.user
            ?.username ||
            "developer"}
        </p>

        <p className="mt-1 text-sm text-zinc-300">
          {comment.text}
        </p>
      </div>
    )
  )}
</div>


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

        <aside className="order-3 hidden space-y-8 lg:block">
          {/* SEARCH USERS */}

          <div className="rounded-[28px] border border-zinc-800 bg-[#111111] p-4 sm:p-5 lg:p-6">
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

          <div className="rounded-[28px] border border-zinc-800 bg-[#111111] p-4 sm:p-5 lg:p-6">
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