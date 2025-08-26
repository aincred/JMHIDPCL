// app/about/md-desk/page.tsx
"use client";

import { motion } from "framer-motion";

export default function MDDeskPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 text-center"
      >
        Managing Director’s Desk
      </motion.h1>

      {/* Card Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-lg rounded-2xl p-8 md:p-12 leading-relaxed text-gray-700 text-justify"
      >
        {/* MD Name */}
        <h2 className="text-xl font-semibold text-blue-800 mb-4">
          Managing Director <br />
          <span className="text-black text-base">JMHIDPCL</span>
        </h2>

        {/* Content */}
        <p className="mb-4">
          Jharkhand Medical and Health Infrastructure Development and Procurement
          Corporation Limited (JMHIDPCL) was established in 2013 at Ranchi,
          Jharkhand. Since then, JMHIDPCL has been working as a central
          procurement agency for the state of Jharkhand for procurement and supply
          of quality drugs, equipment, and diagnostic services in a timely manner
          and at the most optimal rate, thereby ensuring the development of an
          efficient healthcare system in Jharkhand.
        </p>

        <p className="mb-4">
          Over the years, JMHIDPCL has expanded its warehouse storage capacity and
          aims to establish warehouses in all 24 districts of Jharkhand. Efforts
          are underway for acquiring land and securing budgetary approval from the
          state government.
        </p>

        <p className="mb-4">
          JMHIDPCL is also committed to expanding the equipment infrastructure
          facilities. Procurement of state-of-the-art equipment is in process
          without compromising quality, bringing government hospital infrastructure
          on par with private hospitals. Alongside, JMHIDPCL is making rapid
          progress in supplying diagnostic equipment, reagents, and consumables to
          all government hospitals, ensuring that diagnostic tests are available in
          one place.
        </p>

        <p>
          Thus, JMHIDPCL is committed to ensuring access to quality healthcare in a
          transparent and equitable manner for every person in Jharkhand, by
          establishing state-of-the-art medical infrastructure, free supply of
          medicines, and diagnostic services to attain the highest standards of
          health.
        </p>
      </motion.div>
    </main>
  );
}
