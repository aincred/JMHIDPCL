// app/about/organogram/page.tsx
"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";

export default function OrganogramPage() {
  const sections = [
    {
      title: "Procurement Section",
      manager: "Sri Neel Ranjan Singh",
      designation: "General Manager (Procurement)",
      members: [
        "Mr. Hemant Kumar (IT Assistant)",
        "Mr. Asif Raza (IT Assistant)",
        "Mrs. Meghana Priya (Computer Operator)",
        "Mrs. Archana Kumari (Computer Operator)",
        "Mr. Jitendra Kumar (Computer Operator)",
      ],
      color: "cyan",
    },
    {
      title: "Finance & Accounts",
      manager: "Mr. Arvind Kumar",
      designation: "General Manager",
      members: ["Mrs. Kajal Kumari (Accountant)", "Mr. Rohit Kumar (Accountant)"],
      color: "green",
    },
    {
      title: "HR & Administration",
      manager: "Sri Hemant Kumar",
      designation: "General Manager",
      members: ["Ms. Simpi Kumari (Office Assistant)"],
      color: "yellow",
    },
    {
      title: "Logistic & Quality Control",
      manager: "Sri Raj Kumar Agrawal",
      designation: "General Manager (Logistics & QC)",
      members: [
        "Mr. Vijay Kumar (Store Keeper)",
        "Md. Danish Quraishi (Office Assistant)",
        "e-Aushadhi IT C-DAC Team",
        "Mr. Wilson Peter (Helpdesk Manager)",
        "Ms. Pratima Toppo (Computer Operator)",
      ],
      color: "purple",
    },
    {
      title: "Company Secretary",
      manager: "Ms. Mohini Verma",
      designation: "",
      members: [],
      color: "pink",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-12 text-center drop-shadow-md"
      >
        Organogram
      </motion.h1>

      {/* Top Management */}
      <div className="flex flex-col items-center space-y-8 mb-12">
        <div className="bg-blue-900 text-white px-10 py-4 rounded-3xl shadow-xl font-semibold text-center text-lg md:text-xl">
          Managing Director
        </div>
        <div className="bg-gray-800 text-white px-8 py-3 rounded-2xl shadow-md font-semibold text-center text-base md:text-lg">
          OSD
        </div>
      </div>

      {/* Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {sections.map((sec, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="border-l-4 border-[color:var(--tw-color)] shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
            style={{
              borderColor: sec.color === "cyan" ? "#06b6d4" :
                           sec.color === "green" ? "#16a34a" :
                           sec.color === "yellow" ? "#eab308" :
                           sec.color === "purple" ? "#7c3aed" :
                           "#ec4899",
            }}
          >
            <div className={`bg-[${sec.color}-200] px-6 py-4`}>
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-gray-800" />
                <h3 className="font-bold text-gray-800">{sec.title}</h3>
              </div>
            </div>
            <div className="p-6 bg-white">
              <p className="font-semibold text-gray-700">{sec.manager}</p>
              {sec.designation && <p className="text-gray-600 text-sm mb-2">{sec.designation}</p>}
              {sec.members.length > 0 && (
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  {sec.members.map((m, idx) => (
                    <li key={idx}>{m}</li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Technical Advisor */}
      <div className="flex justify-center">
        <div className="bg-gray-200 text-gray-800 px-10 py-3 rounded-3xl shadow-md font-medium text-center text-lg md:text-xl">
          Technical Advisor
        </div>
      </div>
    </main>
  );
}
