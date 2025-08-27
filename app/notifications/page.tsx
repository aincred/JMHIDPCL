"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Bell } from "lucide-react";

type Notification = {
  id: number;
  title: string;
  date: string;
  fileUrl?: string;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("notifications");
    if (saved) {
      setNotifications(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-cyan-600 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-md">
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

      {/* Notifications List */}
      {notifications.length > 0 ? (
        <motion.ul
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="space-y-4"
        >
          <AnimatePresence>
            {notifications.map((n) => (
              <motion.li
                key={n.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                layout
                className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition-all border border-gray-200"
              >
                <p className="font-semibold text-gray-800 text-lg">{n.title}</p>
                <p className="text-sm text-gray-500">{n.date}</p>
                {n.fileUrl && (
                  <a
                    href={n.fileUrl}
                    target="_blank"
                    className="text-cyan-700 text-sm hover:underline mt-2 inline-block"
                  >
                    View File →
                  </a>
                )}
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <p className="text-center text-gray-600 text-lg">
          No notifications available.
        </p>
      )}
    </div>
  );
}
