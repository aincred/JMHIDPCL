"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { User, Layers } from "lucide-react";

// Type for each cell
type CellProps = {
  title: string;
  head: string;
  designation: string;
  members: string[];
};

// Type for Box props
type BoxProps = {
  title: string;
  icon?: React.ReactNode;
};

// Type for Connector props
type ConnectorProps = {
  children: React.ReactNode;
  small?: boolean;
};

export default function OrgChartDesign1() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-indigo-100 px-6 py-12 flex flex-col items-center">
      {/* Title */}
      <motion.h1
        className="text-4xl font-extrabold text-indigo-800 uppercase mb-12 tracking-wide drop-shadow"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Organogram
      </motion.h1>

      {/* Tree */}
      <div className="flex flex-col items-center space-y-12">
        {/* Managing Director */}
        <Connector>
          <Box title="Managing Director" icon={<User className="w-6 h-6 text-indigo-600" />} />
        </Connector>

        {/* Cell Incharge */}
        <Connector>
          <Box title="Cell Incharge" icon={<Layers className="w-6 h-6 text-blue-600" />} />
        </Connector>

        {/* Horizontal branch for child cells */}
        <div className="relative flex flex-wrap justify-center gap-8 mt-6">
          {/* Horizontal connecting line */}
          <div className="absolute top-0 left-0 w-full h-1 flex justify-center">
            <motion.div
              className="bg-gradient-to-r from-blue-400 to-indigo-500 h-1 rounded-full shadow-md"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>

          {cells.map((c, i) => (
            <div key={i} className="flex flex-col items-center">
              {/* Vertical connector for each cell */}
              <Connector small>
                <Cell {...c} />
              </Connector>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Scroll-based vertical connector
function Connector({ children, small = false }: ConnectorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // animates as element enters/leaves viewport
  });
  const height: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 1],
    [0, small ? 60 : 120]
  );

  return (
    <div className="relative flex flex-col items-center" ref={ref}>
      <motion.div
        className="w-1 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-full shadow-md"
        style={{ height }}
      />
      {children}
    </div>
  );
}

// Box for main roles
function Box({ title, icon }: BoxProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -3 }}
      className="bg-white/80 backdrop-blur-lg border border-indigo-200 rounded-xl px-8 py-4 text-center shadow-md hover:shadow-xl"
    >
      <div className="flex items-center justify-center mb-2">{icon}</div>
      <h2 className="font-bold text-indigo-700">{title}</h2>
    </motion.div>
  );
}

// Child cells
function Cell({ title, head, designation, members }: CellProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gradient-to-tr from-white via-blue-50 to-indigo-50 border border-indigo-200 rounded-lg p-5 shadow-lg w-72"
    >
      <h2 className="font-semibold text-indigo-700 border-b pb-2 mb-3">{title}</h2>
      <p className="text-sm font-bold text-gray-800">{head}</p>
      <p className="text-xs italic text-blue-600 mb-3">{designation}</p>
      <ul className="list-disc list-inside text-xs text-gray-700">
        {members.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </motion.div>
  );
}

// All cells data extracted from organogram
const cells = [
  {
    title: "MD Cell",
    head: "Mr. Arvind Kumar",
    designation: "Cell Incharge / I/C of MD Cell",
    members: ["Ms. Simpi Kumari (Office Assistant)"],
  },
  {
    title: "Procurement Cell",
    head: "Mr. Shailendra Kr. Shrivastava",
    designation: "Procurement Consultant / I/C General Manager (Procurement)",
    members: [
      "Mr. Hemant Kumar (IT Assistant)",
      "Mr. Asif Raza (IT Assistant)",
      "Mrs. Meghana Priya (DEO)",
      "Mrs. Archana Kumari (DEO)",
      "Mr. Jitendra Kumar (DEO)",
      "Mr. Naveen Kumar (DEO)",
      "Mrs. Kajal Kumari (DEO)",
      "Mr. Arpan Kr. Kashyap (DEO)",
      "Mr. Naitik (DEO)",
      "Mr. Nikhil Kumar (DEO)",
      "Mr. Kumar Mayank Singh (DEO)",
    ],
  },
  {
    title: "Finance & Accounts Cell",
    head: "Mr. Arvind Kumar",
    designation: "General Manager (Finance & Accounts)",
    members: [
      "Mrs. Mohini Verma (Company Secretary)",
      "Mrs. Kajal Kumari (Accountant)",
      "Mr. Rohit (Accountant)",
      "Ms. Akancha Kumari (DEO)",
      "Mrs. Radha Tirkey (DEO)",
      "Mr. Rishi Kumar Verma (DEO)",
    ],
  },
  {
    title: "HR & Administration Cell",
    head: "Mr. Hemant Kumar",
    designation: "General Manager (HR & Admin.)",
    members: ["Ms. Simpi Kumari (Office Assistant)"],
  },
  {
    title: "Logistic & Quality Cell",
    head: "Mr. Shailendra Kr. Shrivastava",
    designation: "I/C General Manager (Logistics & QC), PPP",
    members: [
      "Mr. Wilson Peter (Help Desk Manager Cum Store Keeper)",
      "MD Danish Quraishi (Office Assistant)",
      "Ms. Pratima Toppo (DEO)",
      "Mr. Balwant Kr. Singh (DEO)",
      "Mr. Ashish Kumar (DEO)",
    ],
  },
  {
    title: "Technical Advisor",
    head: "",
    designation: "",
    members: [
      
    ],
  },
  {
    title: "e-Aushadhi IT Cell",
    head: "CDAC Team",
    designation: "",
    members: [],
  },
];

