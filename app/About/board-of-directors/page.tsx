// app/about/board-of-directors/page.tsx
"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";

export default function BoardOfDirectorsPage() {
  const directors = [
    "Chief Secretary / Principal Secretary / Secretary, Health, Medical Education & Family Welfare Department, GOJ, Chairman",
    "Additional Chief Secretary / Principal Secretary / Secretary, Finance Department, GOJ",
    "Principal Secretary / Secretary, Women & Child Development & Social Security Deptt., GOJ",
    "Mission Director, National Rural Health Mission, Jharkhand",
    "Managing Director, Jharkhand State Building Construction Corp Ltd.",
    "Director in Chief, Health Directorate, Government of Jharkhand",
    "Director, Health Education, Government of Jharkhand",
    "Deputy Secretary in Charge, Planning Section, Health Deptt., GOJ",
    "Director, Drugs Control Directorate, Government of Jharkhand",
  ];

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-blue-900 mb-10 text-center"
      >
        Board of Directors
      </motion.h1>

      {/* Directors Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {directors.map((name, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-white shadow-md rounded-xl p-5 flex items-start gap-3 hover:shadow-lg transition"
          >
            <Users className="w-6 h-6 text-blue-800 mt-1" />
            <p className="text-gray-700 text-sm leading-relaxed">{name}</p>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
