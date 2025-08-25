"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  LayoutDashboard, 
  FileText, 
  Image as ImageIcon, 
  LogOut, 
  Download, 
  FileSpreadsheet 
} from "lucide-react";

export default function SideNav() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-blue-800 text-white h-screen flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-4 flex items-center gap-2 border-b border-blue-700">
        <Image
          src="/jmh-logo.jpg"
          alt="logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="font-bold text-lg">JMHIDPCL Admin</span>
      </div>

      {/* Nav links */}
      <nav className="flex-1">
        <ul className="flex flex-col">
          <li className="border-b border-blue-700">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 p-3 hover:bg-blue-700"
            >
              <LayoutDashboard size={18} /> Dashboard
            </Link>
          </li>
          <li className="border-b border-blue-700">
            <Link
              href="/admin/certificates"
              className="flex items-center gap-2 p-3 hover:bg-blue-700"
            >
              <FileText size={18} /> Certificates
            </Link>
          </li>
          <li className="border-b border-blue-700">
            <Link
              href="/admin/gallery"
              className="flex items-center gap-2 p-3 hover:bg-blue-700"
            >
              <ImageIcon size={18} /> Gallery
            </Link>
          </li>
          <li className="border-b border-blue-700">
            <Link
              href="/admin/downloads"
              className="flex items-center gap-2 p-3 hover:bg-blue-700"
            >
              <Download size={18} /> Downloads
            </Link>
          </li>
          <li className="border-b border-blue-700">
            <Link
              href="/admin/tenders"
              className="flex items-center gap-2 p-3 hover:bg-blue-700"
            >
              <FileSpreadsheet size={18} /> Tenders
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="m-4 flex items-center justify-center gap-2 p-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
}
