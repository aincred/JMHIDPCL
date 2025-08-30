"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const supabase = createClientComponentClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Load profile from Supabase
  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("admin_profile")
        .select("*")
        .eq("id", 1) // fetch only the single profile row
        .single();

      if (error && error.code !== "PGRST116") {
        // PGRST116 = "No rows found"
        console.error("Error loading profile:", error.message);
        setLoading(false);
        return;
      }

      if (data) {
        // Found profile
        setName(data.name || "Admin User");
        setEmail(data.email || "admin@example.com");
        setAvatar(
          data.avatar ||
            "https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
        );
        setLastUpdated(data.updated_at);
      } else {
        // No row exists yet → create a default profile
        const defaultProfile = {
          id: 1,
          name: "Admin User",
          email: "admin@example.com",
          avatar:
            "https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff",
          updated_at: new Date().toISOString(),
        };

        const { error: insertError } = await supabase
          .from("admin_profile")
          .insert(defaultProfile);

        if (insertError) {
          console.error("Error inserting default profile:", insertError.message);
        } else {
          setName(defaultProfile.name);
          setEmail(defaultProfile.email);
          setAvatar(defaultProfile.avatar);
          setLastUpdated(defaultProfile.updated_at);
        }
      }

      setLoading(false);
    };

    loadProfile();
  }, [supabase]);

  // File upload → convert to base64 preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) setAvatar(reader.result.toString());
      };
      reader.readAsDataURL(file);
    }
  };

  // Save to Supabase
  const handleSave = async () => {
    setLoading(true);

    const { error } = await supabase.from("admin_profile").upsert({
      id: 1, // always overwrite row 1
      name,
      email,
      avatar,
      updated_at: new Date().toISOString(),
    });

    setLoading(false);

    if (error) {
      alert("❌ Failed to update profile");
    } else {
      alert("✅ Profile updated successfully!");
      setLastUpdated(new Date().toISOString());
    }
  };

  const avatarSrc =
    avatar && avatar.trim() !== ""
      ? avatar
      : "https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff";

  return (
    <div className="ml-64 mt-20 p-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="bg-white shadow rounded-lg p-6 max-w-lg space-y-6">
        {lastUpdated && (
          <p className="text-sm text-gray-500">
            Last updated: {new Date(lastUpdated).toLocaleString()}
          </p>
        )}

        {/* Avatar */}
        <div className="flex items-center space-x-4">
          <Image
            src={avatarSrc}
            alt="Avatar"
            width={64}
            height={64}
            className="w-16 h-16 rounded-full shadow-md border object-cover"
            unoptimized // ✅ Works for both base64 (data:) and remote URLs
          />

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
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" /> Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
}
