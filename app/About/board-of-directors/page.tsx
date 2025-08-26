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
    <main className="max-w-7xl mx-auto px-6 py-16">
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-12 text-center"
      >
        Board of Directors
      </motion.h1>

      {/* Directors Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {directors.map((name, i) => {
          const isEven = i % 2 === 0;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`flex flex-col items-center text-center p-6 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 ${
                isEven ? "bg-cyan-50" : "bg-green-50"
              }`}
            >
              <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-md mb-4">
                <Users className={`w-8 h-8 ${isEven ? "text-cyan-700" : "text-green-700"}`} />
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{name}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </main>
  );
}
