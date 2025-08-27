"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  LayoutDashboard, 
  FileText, 
  Image as ImageIcon, 
  ClipboardList, 
  FileSpreadsheet, 
  Users, 
  FileArchive, 
  FileCheck, 
  Bell 
} from "lucide-react";

export default function SideNav() {
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
    href="/admin/our-team"
    className="flex items-center gap-2 p-3 hover:bg-blue-700"
  >
    <Users size={18} /> Our Team
  </Link>
</li>
          <li className="border-b border-blue-700">
            <Link
              href="/admin/uplaod"
              className="flex items-center gap-2 p-3 hover:bg-blue-700"
            >
              <ClipboardList size={18} /> Upload Pdf
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
          <li className="border-b border-blue-700">
            <Link
              href="/admin/rc-holders"
              className="flex items-center gap-2 p-3 hover:bg-blue-700"
            >
              <Users size={18} /> R C Holders
            </Link>
          </li>
          <li className="border-b border-blue-700">
            <Link
              href="/admin/rate-contract"
              className="flex items-center gap-2 p-3 hover:bg-blue-700"
            >
              <FileArchive size={18} /> Rate Contract
            </Link>
          </li>
          <li className="border-b border-blue-700">
            <Link
              href="/admin/item-wise-rate"
              className="flex items-center gap-2 p-3 hover:bg-blue-700"
            >
              <FileCheck size={18} /> Item Wise Rate Contract
            </Link>
          </li>
          <li className="border-b border-blue-700">
            <Link
              href="/admin/notifications"
              className="flex items-center gap-2 p-3 hover:bg-blue-700"
            >
              <Bell size={18} /> Notifications
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
