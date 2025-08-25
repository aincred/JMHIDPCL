// app/about/e-aushadhi/page.tsx
"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function EAushadhiPage() {
  const features = [
    "Top down Approach helps Head Quarter in better Monitoring & Control down the line.",
    "Help in better Planning & Execution at all administrative level.",
    "Efficient control on supply & Inventory.",
    "Comprehensive Package for Centralized Supply Chain Management System.",
    "Optimal Performance with high number of users.",
    "Quality Control on Drugs, Monitoring & Control on Quality of Drugs.",
    "Online Drug Distribution to Patient on DDC.",
    "Provision to enter the Rate contract with suppliers.",
    "Store, Maintain, Update, Search & Display information related to drugs through centralized Database server across multiple stores including Medical College/DH/SDH/CHCs/UCHC/UPHC & PHCs.",
    "Ease of Demand Generation and forecast.",
    "Online Indenting from DWH to Head Quarter on annual demand basis or need based request for purchase basis.",
    "Purchase Order generation based on consolidated Indenting at District Level.",
    "Online Purchase Order generation to suppliers through Supplier Interface.",
    "Ease of entering Challan at DWH against the issued Purchase Order.",
    "Online issue of Drug based on Drug Purchase and Availability.",
    "Provision to maintain expiry date / shelf life for an item wherever applicable.",
    "Ability of online tracking of Drug Inventory in all Institutions across the State.",
    "Help in better planning, execution and control on demand and supply.",
    "Ability to generate customized Reports.",
    "Ability to generate Dynamic Reports using built-in dynamic report system.",
    "Various alert generation facility with different colors e.g. for expired items, re-order level, Quarantine etc.",
    "Ability to locate drugs using a number of search criteria in all Institutions.",
    "Provision to link all drug warehouses hierarchically to understand their physical as well as functional structure.",
    "Inter DWH Drug Transfer with proper control by HQ.",
  ];

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 text-center"
      >
        About e-Aushadhi
      </motion.h1>

      {/* Intro */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-gray-700 text-lg leading-relaxed mb-10 text-justify"
      >
        e-Aushadhi is a web based application which deals with the management of
        stock of various drugs, sutures and surgical items required by various
        SDH, CHC, UCHC, PHC, UPHC & DH of the state. It helps in determining the
        needs of various Sub-stores such that all the required drugs are
        constantly issued by WH to its Sub-store, and further to patients by DDC
        without delay.
      </motion.p>

      {/* Features */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-2xl font-semibold text-blue-800 mb-6"
      >
        Features of e-Aushadhi
      </motion.h2>

      <div className="grid sm:grid-cols-2 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03, duration: 0.5 }}
            className="flex items-start bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <CheckCircle className="text-blue-700 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
            <p className="text-gray-800 text-sm md:text-base">{feature}</p>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
