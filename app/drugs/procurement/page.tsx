// app\drugs\procurement\page.tsx
"use client";

import { motion } from "framer-motion";

export default function ProcurementPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 text-center"
      >
        The Drug Procurement Process
      </motion.h1>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-justify"
      >
        <p>
          JMHIDPCL follows a <span className="font-semibold">transparent procurement procedure</span> 
          by inviting open tenders from reputed manufacturers. Indents for purchase of drugs are sent 
          by the respective Direct Demanding Officers of the State.
        </p>

        <p>
          Specifications for the purchase of drugs are prepared by the{" "}
          <span className="font-semibold">Expert Committee</span> for both Essential Drug List (EDL) 
          and non-EDL drugs, according to the requirements of hospitals. After quantifying the indents, 
          JMHIDPCL floats an online tender as per the purchase policy of CSPO, Health Department guidelines, 
          and decisions of the Board of Directors. Advertisements are also published in daily newspapers.
        </p>

        <h2 className="text-2xl font-semibold text-blue-800 mt-6 mb-3">
          Tender Scrutiny & Award Process
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Primary and technical scrutiny of the tender documents is done by the{" "}
            <span className="font-semibold">Technical Committee</span> as per tender terms.
          </li>
          <li>
            The agenda is submitted to the relevant procurement committee for review.
          </li>
          <li>
            Based on Technical Scrutiny reports, the{" "}
            <span className="font-semibold">Commercial Bids</span> of all acceptable offers are opened.
          </li>
          <li>
            A comparative statement is prepared and{" "}
            <span className="font-semibold">L1 Firm</span> (lowest bidder) is finalized and awarded the tender.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-800 mt-6 mb-3">
          Purchase Order & Payment
        </h2>
        <p>
          Purchase orders are issued based on the total demand received and the required schedule. 
          Payment against the bill of the particular purchase is processed and made by JMHIDPCL.
        </p>
      </motion.div>
    </main>
  );
}
