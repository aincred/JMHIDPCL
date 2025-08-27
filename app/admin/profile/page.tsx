"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  // Load stored profile
  useEffect(() => {
    const savedName = localStorage.getItem("profile_name") || "Admin User";
    const savedEmail = localStorage.getItem("profile_email") || "admin@example.com";
    const savedAvatar =
      localStorage.getItem("profile_avatar") ||
      "https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff";
    setName(savedName);
    setEmail(savedEmail);
    setAvatar(savedAvatar);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) setAvatar(reader.result.toString());
      };
      reader.readAsDataURL(file); // Convert image to base64 for preview + storage
    }
  };

  const handleSave = () => {
    localStorage.setItem("profile_name", name);
    localStorage.setItem("profile_email", email);
    localStorage.setItem("profile_avatar", avatar);
    alert("✅ Profile updated!");
  };

  // Fallback avatar if empty
  const avatarSrc =
    avatar && avatar.trim() !== ""
      ? avatar
      : "https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff";

  return (
    <div className="ml-64 mt-20 p-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="bg-white shadow rounded-lg p-6 max-w-lg space-y-6">
        {/* Avatar */}
        <div className="flex items-center space-x-4">
          {avatarSrc.startsWith("data:") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarSrc}
              alt="Avatar"
              className="w-16 h-16 rounded-full shadow-md border object-cover"
            />
          ) : (
            <Image
              src={avatarSrc}
              alt="Avatar"
              width={64}
              height={64}
              className="rounded-full shadow-md border object-cover"
              unoptimized // allow external URL (ui-avatars.com)
            />
          )}

          <div>
            <label className="cursor-pointer bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 inline-block">
              Upload from Gallery
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
          />
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
