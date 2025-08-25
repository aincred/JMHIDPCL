// app/about/organogram/page.tsx
"use client";

import { motion } from "framer-motion";

export default function OrganogramPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-blue-900 mb-10 text-center"
      >
        Organogram
      </motion.h1>

      {/* Hierarchy Tree */}
      <div className="flex flex-col items-center space-y-6">
        {/* Top */}
        <div className="bg-blue-900 text-white px-6 py-3 rounded-lg shadow-md font-semibold">
          Managing Director
        </div>

        {/* OSD */}
        <div className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-md font-semibold">
          OSD
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full">
          {/* Procurement */}
          <div className="bg-gray-100 border rounded-lg p-4 shadow">
            <h3 className="font-semibold text-blue-800 mb-2">Procurement Section</h3>
            <p className="text-sm">Sri Neel Ranjan Singh<br />General Manager (Procurement)</p>
            <div className="mt-2 text-xs text-gray-600">
              <p>Cell Incharge – Procurement Consultant</p>
              <ul className="list-disc list-inside mt-2">
                <li>Mr. Hemant Kumar (IT Assistant)</li>
                <li>Mr. Asif Raza (IT Assistant)</li>
                <li>Mrs. Meghana Priya (Computer Operator)</li>
                <li>Mrs. Archana Kumari (Computer Operator)</li>
                <li>Mr. Jitendra Kumar (Computer Operator)</li>
              </ul>
            </div>
          </div>

          {/* Finance & Accounts */}
          <div className="bg-gray-100 border rounded-lg p-4 shadow">
            <h3 className="font-semibold text-blue-800 mb-2">Finance & Accounts</h3>
            <p className="text-sm">Mr. Arvind Kumar<br />General Manager</p>
            <div className="mt-2 text-xs text-gray-600">
              <ul className="list-disc list-inside">
                <li>Mrs. Kajal Kumari (Accountant)</li>
                <li>Mr. Rohit Kumar (Accountant)</li>
              </ul>
            </div>
          </div>

          {/* HR & Admin */}
          <div className="bg-gray-100 border rounded-lg p-4 shadow">
            <h3 className="font-semibold text-blue-800 mb-2">HR & Administration</h3>
            <p className="text-sm">Sri Hemant Kumar<br />General Manager</p>
            <div className="mt-2 text-xs text-gray-600">
              <ul className="list-disc list-inside">
                <li>Ms. Simpi Kumari (Office Assistant)</li>
              </ul>
            </div>
          </div>

          {/* Logistic & Quality */}
          <div className="bg-gray-100 border rounded-lg p-4 shadow">
            <h3 className="font-semibold text-blue-800 mb-2">Logistic & Quality Control</h3>
            <p className="text-sm">Sri Raj Kumar Agrawal<br />General Manager (Logistics & QC)</p>
            <div className="mt-2 text-xs text-gray-600">
              <ul className="list-disc list-inside">
                <li>Mr. Vijay Kumar (Store Keeper)</li>
                <li>Md. Danish Quraishi (Office Assistant)</li>
                <li>e-Aushadhi IT C-DAC Team</li>
                <li>Mr. Wilson Peter (Helpdesk Manager)</li>
                <li>Ms. Pratima Toppo (Computer Operator)</li>
              </ul>
            </div>
          </div>

          {/* Company Secretary */}
          <div className="bg-gray-100 border rounded-lg p-4 shadow">
            <h3 className="font-semibold text-blue-800 mb-2">Company Secretary</h3>
            <p className="text-sm">Ms. Mohini Verma</p>
          </div>
        </div>

        {/* Technical Advisor */}
        <div className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg shadow-md font-medium mt-6">
          Technical Advisor
        </div>
      </div>
    </main>
  );
}
