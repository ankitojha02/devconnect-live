"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Camera,
  Save,
  User,
  FileText,
} from "lucide-react";

export default function ProfilePage() {
  const API =
    "https://devconnect-live.onrender.com/api";

  const [user, setUser] = useState<any>(null);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const [avatar, setAvatar] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);


  const router = useRouter();
  // ================= LOAD USER =================

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (
      storedUser &&
      storedUser !== "undefined"
    ) {
      try {
        const parsed = JSON.parse(storedUser);

        setUser(parsed);

        setName(parsed.name || "");
        setBio(parsed.bio || "");
      } catch (error) {
        console.log("Invalid user JSON");
      }
    }
  }, []);

  // ================= UPDATE PROFILE =================

  const updateProfile = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    const res = await fetch(
      `${API}/user/profile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          bio,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return toast.error(
        data.message || "Update failed"
      );
    }

    // UPDATE UI
    setUser(data.user);

    // UPDATE LOCAL STORAGE
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    toast.success(
      "Profile updated successfully 🚀"
    );

    // REDIRECT TO FEED
    setTimeout(() => {
      router.push("/feed");
    }, 1000);
  } catch (error) {
    console.log(error);

    toast.error(
      "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
};

  // ================= UPLOAD AVATAR =================

  const uploadAvatar = async () => {
    try {
      if (!avatar) {
        return toast.error(
          "Select image first"
        );
      }

      const token =
        localStorage.getItem("token");

      const formData = new FormData();

      // IMPORTANT
      formData.append("image", avatar);

      const res = await fetch(
        `${API}/user/avatar`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return toast.error(
          data.message || "Upload failed"
        );
      }

      // UPDATE UI
      setUser(data.user);

      // UPDATE LOCAL STORAGE
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      toast.success(
        "Avatar updated 🚀"
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
      <div className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
        {/* ================= HEADER ================= */}

        <div className="rounded-[40px] border border-zinc-800 bg-[#111111] p-6 sm:p-8 lg:p-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
            {/* ================= AVATAR ================= */}

            <div className="flex flex-col items-center">
              <div className="relative h-40 w-40 overflow-hidden rounded-[40px] border border-zinc-800 bg-yellow-400">
                <Image
                  src={
                    user?.avatar ||
                    "/developers.png"
                  }
                  alt="avatar"
                  fill
                  sizes="160px"
                  priority
                  className="object-cover"
                />
              </div>

              {/* CHANGE PHOTO */}

              <label className="mt-6 flex cursor-pointer items-center gap-3 rounded-2xl border border-zinc-700 bg-black px-5 py-3 text-sm text-zinc-300 transition hover:border-yellow-400">
                <Camera className="h-5 w-5 text-yellow-400" />

                Change Photo

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) =>
                    setAvatar(
                      e.target.files?.[0] ||
                        null
                    )
                  }
                />
              </label>

              {/* UPLOAD BUTTON */}

              <button
                onClick={uploadAvatar}
                className="mt-4 rounded-2xl bg-yellow-400 px-6 py-3 font-bold text-black transition hover:scale-105"
              >
                Upload
              </button>
            </div>

            {/* ================= INFO ================= */}

            <div className="flex-1">
              <h1 className="text-4xl font-black sm:text-5xl lg:text-6xl">
                Edit Profile
              </h1>

              <p className="mt-4 text-zinc-400">
                Customize your developer
                identity.
              </p>

              {/* ================= FORM ================= */}

              <div className="mt-10 space-y-6">
                {/* NAME */}

                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm text-zinc-400">
                    <User className="h-4 w-4 text-yellow-400" />

                    Full Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(
                        e.target.value
                      )
                    }
                    className="w-full rounded-2xl border border-zinc-800 bg-black px-5 py-4 outline-none transition focus:border-yellow-400"
                  />
                </div>

                {/* BIO */}

                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm text-zinc-400">
                    <FileText className="h-4 w-4 text-yellow-400" />

                    Bio
                  </label>

                  <textarea
                    value={bio}
                    onChange={(e) =>
                      setBio(
                        e.target.value
                      )
                    }
                    placeholder="Tell developers about yourself..."
                    className="min-h-[180px] w-full resize-none rounded-2xl border border-zinc-800 bg-black px-5 py-4 outline-none transition focus:border-yellow-400"
                  />
                </div>

                {/* SAVE BUTTON */}

                <button
                  onClick={updateProfile}
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-yellow-400 px-8 py-4 font-bold text-black transition hover:scale-[1.02] sm:w-fit"
                >
                  <Save className="h-5 w-5" />

                  {loading
                    ? "Saving..."
                    : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= PROFILE PREVIEW ================= */}

        <div className="mt-10 rounded-[40px] border border-zinc-800 bg-[#111111] p-6 sm:p-8">
          <p className="mb-8 text-sm font-semibold tracking-widest text-yellow-400">
            PROFILE PREVIEW
          </p>

          <div className="flex flex-col items-center text-center">
            <div className="h-32 w-32 overflow-hidden rounded-[32px] border border-zinc-800 bg-yellow-400">
              <Image
                src={
                  user?.avatar ||
                  "/developers.png"
                }
                alt="avatar"
                width={300}
                height={300}
                className="h-full w-full object-cover"
              />
            </div>

            <h2 className="mt-6 text-3xl font-black">
              {name || "Developer"}
            </h2>

            <p className="mt-3 max-w-2xl leading-relaxed text-zinc-400">
              {bio ||
                "Your developer bio will appear here."}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}