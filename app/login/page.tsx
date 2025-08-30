"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Loader2 } from "lucide-react"; // spinner icon

export default function AdminLogin() {
  const supabase = createClientComponentClient();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // get the latest saved admin credentials
    const { data, error } = await supabase
      .from("admin_settings")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1)
      .single();

    setLoading(false);

    if (error || !data) {
      setError("⚠️ Could not load admin credentials");
      return;
    }

    if (username === data.email && password === data.password) {
      localStorage.setItem("admin_auth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("❌ Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-2xl w-96 border border-gray-200"
      >
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/jmh-logo.jpg"
            alt="JMHIDPCL Logo"
            width={80}
            height={80}
            className="rounded-full shadow-md"
          />
          <h1 className="text-2xl font-bold mt-3 text-gray-800">Admin Login</h1>
          <p className="text-gray-500 text-sm mt-1">
            Sign in to manage your dashboard
          </p>
        </div>

        {error && (
          <p className="text-red-500 bg-red-50 border border-red-200 px-3 py-2 rounded-md text-sm mb-4">
            {error}
          </p>
        )}

        <Input
          placeholder="Username / Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4"
          disabled={loading}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6"
          disabled={loading}
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </div>
  );
}
