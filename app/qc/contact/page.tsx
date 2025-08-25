// app/contact/page.tsx
"use client"

import { motion } from "framer-motion"

const contacts = [
  {
    id: 1,
    name: "Mr. Wilson Peter",
    designation: "Data Entry Operator",
    phone: "7992453218",
  },
  // Add more contacts here...
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-10">
      <h1 className="text-4xl font-bold text-center text-blue-800 dark:text-blue-300 mb-10">
        Contact Details of Functionaries
      </h1>

      <div className="overflow-x-auto max-w-4xl mx-auto">
        <motion.table
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full border-collapse bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
        >
          <thead className="bg-blue-600 dark:bg-blue-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left">S/N</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Designation</th>
              <th className="px-6 py-3 text-left">Phone No.</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c, index) => (
              <motion.tr
                key={c.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(59,130,246,0.1)" }}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <td className="px-6 py-4">{c.id}</td>
                <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-200">{c.name}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{c.designation}</td>
                <td className="px-6 py-4 text-blue-600 dark:text-blue-400 font-semibold">{c.phone}</td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </div>
  )
}
