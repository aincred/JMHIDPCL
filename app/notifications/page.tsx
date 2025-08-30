"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bell } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type Notification = {
  id: number;
  title: string;
  date: string;
  file_public_url?: string;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        console.error("Error fetching notifications:", error);
      } else {
        setNotifications(data as Notification[]);
      }
      setLoading(false);
    };

    fetchNotifications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-800 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-md">
            <Bell className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">All Notifications</h1>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 text-cyan-700 hover:underline font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </div>

      {/* Notifications Table */}
      {loading ? (
        <p className="text-center text-gray-600 text-lg mt-10">Loading...</p>
      ) : notifications.length > 0 ? (
        <div className="overflow-x-auto shadow-lg rounded-xl">
          <table className="w-full border-collapse bg-white rounded-xl overflow-hidden">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Title</th>
                <th className="px-6 py-3 text-left font-semibold">Date</th>
                <th className="px-6 py-3 text-center font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((n, i) => (
                <tr
                  key={n.id}
                  className={`border-t ${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-cyan-50 transition`}
                >
                  <td className="px-6 py-3 text-gray-800">{n.title}</td>
                  <td className="px-6 py-3 text-gray-600">{n.date}</td>
                  <td className="px-6 py-3 text-center">
                    {n.file_public_url ? (
                      <a
                        href={n.file_public_url}
                        target="_blank"
                        className="inline-block px-4 py-1.5 text-sm font-medium text-white bg-cyan-600 rounded-full shadow hover:bg-cyan-700 transition"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-gray-400">No File</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg mt-10">
          No notifications available.
        </p>
      )}
    </div>
  );
}
