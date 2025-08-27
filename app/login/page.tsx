"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const savedEmail = localStorage.getItem("admin_email") || "admin";
    const savedPass = localStorage.getItem("admin_password") || "admin123";

    if (username === savedEmail && password === savedPass) {
      localStorage.setItem("admin_auth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials");
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
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6"
        />
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
