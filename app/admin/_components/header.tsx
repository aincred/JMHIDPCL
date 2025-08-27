"use client";
import Link from "next/link";
import { useState } from "react";
import { Settings, LogOut, User } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-blue-800 text-white flex items-center justify-between px-6 py-6 border-b fixed top-0 left-64 right-0 z-15">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold">JMHIDPCL Control Portal</h1>
      </div>

      <div className="flex items-center gap-6 relative">
        <span>Welcome, Administrator</span>

        {/* Settings Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-full hover:bg-blue-700 transition"
          >
            <Settings size={22} />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg overflow-hidden z-20">
              <Link
                href="/admin/profile"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <User size={18} /> Profile
              </Link>

              <Link
                href="/admin/settings"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <Settings size={18} /> Settings
              </Link>

              <button
                onClick={() => {
                  localStorage.removeItem("admin_auth");
                  window.location.href = "/login";
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
