// app/about/our-team/page.tsx
"use client";

import { motion } from "framer-motion";

export default function OurTeamPage() {
  const sanctionedPosts = [
    "Managing Director",
    "GM. Procurement",
    "GM. Finance & Accounts",
    "GM. HR & Administration",
    "GM. Logistic & Quality Control",
  ];

  const staff = [
    { name: "Mr. Abu Imran", designation: "Managing Director", phone: "7739590391" },
  { name: "Sri Arvind Kumar", designation: "Cell Head", phone: "8051116825, 9431325769" },
  { name: "Sri Arvind Kumar", designation: "GM(Finance & Accounts)", phone: "8051116825, 9431325769" },
  { name: "Sri Hemant Kumar", designation: "GM(HR & Admin.)", phone: "8987678776" },
  { name: "Sri Shailendra Kumar Shrivastava", designation: "I/c GM(Procurement)", phone: "8709368893" },
  { name: "Sri Shailendra Kumar Shrivastava", designation: "I/c GM(Logistic & Quality Control)", phone: "8709368893" },
  { name: "Sri Shailendra Kumar Shrivastava", designation: "Procurement Consultant", phone: "8709368893" },
  { name: "Ms Mohini Verma", designation: "Company Secretary", phone: "8100080529" },
  { name: "M/s Tayal Jain & Co.", designation: "Chartered Accountant", phone: "7209421930" },
  { name: "Mr. Wilson Peter", designation: "I/c Store Keeper, JMHIDPCL", phone: "7992453218" },
  { name: "Mr. Wilson Peter", designation: "Helpdesk Manager", phone: "7992453218" },
  { name: "Mr. Hemant Kumar", designation: "IT Assistant", phone: "9771500075" },
  { name: "Mr. Asif Raza", designation: "IT Assistant", phone: "9431353941" },
  { name: "Mrs. Kajal Kumari (1)", designation: "Accountant", phone: "7488967645" },
  { name: "Mr. Rohit Kumar", designation: "Accountant", phone: "8797989495" },
  { name: "Miss Simpi Kumari", designation: "Office Assistant", phone: "7294838164" },
  { name: "Mr. Danish Quraishi", designation: "Office Assistant", phone: "8102568813" },
  { name: "Miss Pratima Toppo", designation: "Data Entry Operator", phone: "9905158992" },
  { name: "Mrs. Meghana Priya", designation: "Data Entry Operator", phone: "6205370605, 8651147093" },
  { name: "Mrs. Archana Kumari", designation: "Data Entry Operator", phone: "8709089586" },
  { name: "Mr. Jitendra Kumar", designation: "Data Entry Operator", phone: "7970556209" },
  { name: "Mr. Naveen Kumar", designation: "Data Entry Operator", phone: "7903816478" },
  { name: "Mr. Balwant Kumar Singh", designation: "Data Entry Operator", phone: "9631607220" },
  { name: "Mrs. Kajal Kumari (2)", designation: "Data Entry Operator", phone: "8210808556" },
  { name: "Ms. Akancha Kumari", designation: "Data Entry Operator", phone: "9608291690" },
  { name: "Mr. Arpan Kumar Kashyap", designation: "Data Entry Operator", phone: "9102370843" },
  { name: "Mr. Ashish Kumar", designation: "Data Entry Operator", phone: "7488590373" },
  { name: "Mr. Rishi Kumar Verma", designation: "Data Entry Operator", phone: "8294975482" },
  { name: "Mr. Naitik", designation: "Data Entry Operator", phone: "7004906708" },
  { name: "Mrs. Radha Tirkey", designation: "Data Entry Operator", phone: "8102495633" },
  { name: "Mr. Nikhil Kumar", designation: "Data Entry Operator", phone: "8789120886" },
  { name: "Mr. Kumar Mayank Singh", designation: "Data Entry Operator", phone: "9546277905" },
  { name: "Mr. Manoj Singh Chaudhary", designation: "Peon", phone: "8002483741" },
  { name: "Mrs. Shanta Tirkey", designation: "Peon", phone: "8092828909" }
  ];

  const itCell = [
   { name: "Mr. Priyanandan Prasad", designation: "Implementation Manager", phone: "7992372001" },
  { name: "Mr. Swet Kamal", designation: "Implementation Engineer", phone: "8002365555" },
  { name: "Mr. Prakash Jaiswal", designation: "IT Cell Executive", phone: "8860289500" },
  { name: "Mr. Goury Datta Sharma", designation: "Data Entry Operator", phone: "9534848052" },
  { name: "Mr. Ganga Sharma", designation: "Data Entry Operator", phone: "8210744091" }
  ];

  // Helper to convert multiple numbers into clickable links
  const renderPhone = (phone: string) =>
    phone.split(/[,/]/).map((num, i) => (
      <span key={i}>
        <a
          href={`tel:${num.trim()}`}
          className="text-blue-700 hover:underline"
        >
          {num.trim()}
        </a>
        {i < phone.split(/[,/]/).length - 1 && ", "}
      </span>
    ));

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 text-center"
      >
        Our Team
      </motion.h1>

      {/* Sanctioned Posts */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          5 Sanctioned Posts
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {sanctionedPosts.map((post, i) => (
            <li key={i}>{post}</li>
          ))}
        </ul>
      </section>

      {/* Staff Table */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          Administrative Officers & Office Staff
        </h2>
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full border-collapse">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="p-3 text-left text-sm">Sl. No</th>
                <th className="p-3 text-left text-sm">Name</th>
                <th className="p-3 text-left text-sm">Designation</th>
                <th className="p-3 text-left text-sm">Phone No.</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s, i) => (
                <tr
                  key={i}
                  className={`border-b hover:bg-blue-50 ${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-3 text-sm">{i + 1}</td>
                  <td className="p-3 text-sm">{s.name}</td>
                  <td className="p-3 text-sm">{s.designation}</td>
                  <td className="p-3 text-sm">{renderPhone(s.phone)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* IT CELL */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">IT CELL (C-DAC)</h2>
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full border-collapse">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="p-3 text-left text-sm">Sl. No</th>
                <th className="p-3 text-left text-sm">Name</th>
                <th className="p-3 text-left text-sm">Designation</th>
                <th className="p-3 text-left text-sm">Phone No.</th>
              </tr>
            </thead>
            <tbody>
              {itCell.map((s, i) => (
                <tr
                  key={i}
                  className={`border-b hover:bg-blue-50 ${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-3 text-sm">{i + 1}</td>
                  <td className="p-3 text-sm">{s.name}</td>
                  <td className="p-3 text-sm">{s.designation}</td>
                  <td className="p-3 text-sm">{renderPhone(s.phone)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
