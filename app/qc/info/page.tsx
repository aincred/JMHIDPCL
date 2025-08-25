// app/other-info/page.tsx
"use client"

import { motion } from "framer-motion"

const infoPoints = [
  {
    title: "Blacklisted Firms",
    description:
      "Firms blacklisted or debarred are not allowed to participate in procurement. Their details are published on the JMHIDPCL website.",
  },
  {
    title: "Logistics & Supply Chain",
    description:
      "Medicines are tracked through e-Aushadhi portal, dispatched via clearance orders, transported to warehouses and districts, and tested for quality before distribution.",
  },
  {
    title: "Quality Test",
    description:
      "Samples are drawn by Drugs Inspectors as per Drugs & Cosmetics Act 1940. Based on test reports, recovery or replacement processes are initiated.",
  },
  {
    title: "Equipment Procurement",
    description:
      "Equipment procurement follows e-tendering with transparent procedures, pre-bid meetings, technical scrutiny, demos, and final L1 selection.",
  },
]

export default function OtherInformation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-10">
      <h1 className="text-4xl font-bold text-center text-indigo-800 dark:text-indigo-300 mb-12">
        Other Important Information
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {infoPoints.map((point, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              {point.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {point.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
