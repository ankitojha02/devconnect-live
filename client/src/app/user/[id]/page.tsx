"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

  const [user, setUser] =
    useState<UserType | null>(null);

  const [posts, setPosts] = useState<
    PostType[]
  >([]);

  useEffect(() => {
    fetchUser();
  }, []);

 const fetchUser = async () => {
  try {
    const token =
      localStorage.getItem("token");

    // ================= USER INFO =================

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

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white">

      {/* PROFILE CARD */}

      <div className="mx-auto max-w-4xl rounded-[32px] border border-zinc-800 bg-[#111111] p-6">

        <div className="flex flex-col items-center text-center">

          <div className="h-32 w-32 overflow-hidden rounded-3xl bg-yellow-400">
            <img
              src={
                user?.avatar ||
                "/developers.png"
              }
              alt="profile"
              className="h-full w-full object-cover"
            />
          </div>

          <h1 className="mt-5 text-4xl font-black">
            {user?.name}
          </h1>

          <p className="mt-2 text-zinc-400">
            @{user?.username}
          </p>

          <p className="mt-4 max-w-xl text-zinc-500">
            {user?.bio ||
              "Developer"}
          </p>

          <div className="mt-6 flex items-center gap-8">

  <div className="text-center">
    <h3 className="text-2xl font-black text-yellow-400">
      {posts.length}
    </h3>

    <p className="text-sm text-zinc-500">
      Posts
    </p>
  </div>

  <div className="text-center">
    <h3 className="text-2xl font-black text-yellow-400">
      {user?.followers?.length || 0}
    </h3>

    <p className="text-sm text-zinc-500">
      Followers
    </p>
  </div>

  <div className="text-center">
    <h3 className="text-2xl font-black text-yellow-400">
      {user?.following?.length || 0}
    </h3>

    <p className="text-sm text-zinc-500">
      Following
    </p>
  </div>

</div>
        </div>
      </div>

      {/* POSTS */}

      <div className="mx-auto mt-8 max-w-4xl space-y-6">

        {posts.map((post) => (
          <div
            key={post._id}
            className="rounded-[32px] border border-zinc-800 bg-[#111111] p-6"
          >
            <p className="text-lg text-zinc-300">
              {post.content}
            </p>

            {post.image && (
              <img
                src={post.image}
                alt="post"
                className="mt-5 w-full rounded-3xl"
              />
            )}
          </div>
        ))}

      </div>
    </main>
  );
}