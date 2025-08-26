// // app/logistics/sop/page.tsx
// "use client";

// import { motion } from "framer-motion";

// const sopData = [
//   {
//     step: 1,
//     description: "Manufacturer / Bidder to send the In-house report of Medicine with batch no. to JMHIDPCL",
//     timeline: "3-4 days",
//   },
//   {
//     step: 2,
//     description: "Send the In-house test report to Technical Advisor for necessary action / comments",
//     timeline: "2 days",
//   },
//   {
//     step: 3,
//     description: "After approval of Technical Advisor, issue the dispatch clearance order for supply of the medicine of particular batch",
//     timeline: "1 day",
//   },
//   {
//     step: 4,
//     description: "Receive the medicine in Central warehouse/District according to Purchase order",
//     timeline: "Within 60 days",
//   },
//   {
//     step: 5,
//     description: "Sample collection from Central warehouse/district for National Accreditation Board for Testing and Calibration Laboratories (NABL) test",
//     timeline: "3-4 days",
//   },
//   {
//     step: 6,
//     description: "Sample coding-decoding, packing and sent through courier to NABL laboratory",
//     timeline: "3-4 days",
//   },
//   {
//     step: 7,
//     description: "NABL laboratory testing",
//     timeline: "For sterile items 15 days\nFor Non-sterile items 21 days",
//   },
//   {
//     step: 8,
//     description: "NABL report sent to Technical Advisor for further comment/action",
//     timeline: "2 days",
//   },
//   {
//     step: 9,
//     description: "If report is satisfactory, then issue the Quality Clearance certificate for distribution / consumption",
//     timeline: "1 day",
//   },
// ];

// export default function SOPPage() {
//   return (
//     <main className="max-w-6xl mx-auto px-6 py-12">
//       {/* Title */}
//       <motion.h1
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 text-center"
//       >
//         SOP of Logistic & Quality Check
//       </motion.h1>

//       {/* SOP Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border rounded-lg shadow-lg divide-y divide-gray-200">
//           <thead className="bg-blue-900 text-white">
//             <tr>
//               <th className="py-3 px-4 text-left">SL. No.</th>
//               <th className="py-3 px-4 text-left">SOP of Logistic & Q.C.</th>
//               <th className="py-3 px-4 text-left">Timeline</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {sopData.map((item, index) => (
//               <motion.tr
//                 key={index}
//                 initial={{ opacity: 0, y: 10 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.3, delay: index * 0.1 }}
//                 className="hover:bg-blue-50 transition-colors"
//               >
//                 <td className="py-3 px-4 font-medium text-blue-800">{item.step}</td>
//                 <td className="py-3 px-4 text-gray-700 whitespace-pre-line">{item.description}</td>
//                 <td className="py-3 px-4 text-gray-700 whitespace-pre-line">{item.timeline}</td>
//               </motion.tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Footer / Notes */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6, delay: sopData.length * 0.1 }}
//         className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md text-gray-700 text-sm"
//       >
//         <p>Above timeline to be ensured by G M Logistic, Cell In charge (Logistic) and OSD, JMHIDPCL.</p>
//         <p className="mt-2">
//           Memo No: <strong>IMC-WH-14/DWH-16/06/882</strong> | Date: <strong>29/07/2021</strong>
//         </p>
//       </motion.div>
//     </main>
//   );
// }

// app/logistics/sop/page.tsx
"use client";

import { motion } from "framer-motion";

const sopData = [
  { step: 1, description: "Manufacturer / Bidder to send the In-house report of Medicine with batch no. to JMHIDPCL", timeline: "3-4 days" },
  { step: 2, description: "Send the In-house test report to Technical Advisor for necessary action / comments", timeline: "2 days" },
  { step: 3, description: "After approval of Technical Advisor, issue the dispatch clearance order for supply of the medicine of particular batch", timeline: "1 day" },
  { step: 4, description: "Receive the medicine in Central warehouse/District according to Purchase order", timeline: "Within 60 days" },
  { step: 5, description: "Sample collection from Central warehouse/district for NABL test", timeline: "3-4 days" },
  { step: 6, description: "Sample coding-decoding, packing and sent through courier to NABL laboratory", timeline: "3-4 days" },
  { step: 7, description: "NABL laboratory testing", timeline: "Sterile items: 15 days\nNon-sterile items: 21 days" },
  { step: 8, description: "NABL report sent to Technical Advisor for further comment/action", timeline: "2 days" },
  { step: 9, description: "If report is satisfactory, then issue the Quality Clearance certificate for distribution / consumption", timeline: "1 day" },
];

export default function SOPPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-12 text-center"
      >
        SOP of Logistics & Quality Check
      </motion.h1>

      {/* Timeline Cards */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 w-1 bg-blue-200 h-full"></div>

        <div className="space-y-8">
          {sopData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-start"
            >
              {/* Step Circle */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center z-10">
                {item.step}
              </div>

              {/* Card */}
              <div className="ml-6 p-6 bg-white rounded-xl shadow-lg border border-gray-200 w-full hover:shadow-xl transition-shadow">
                <p className="text-gray-800 font-medium whitespace-pre-line">{item.description}</p>
                <p className="mt-2 text-sm text-gray-500">Timeline: <span className="font-semibold text-blue-700">{item.timeline}</span></p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer / Notes */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: sopData.length * 0.1 }}
        className="mt-12 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600 shadow-md text-gray-700 text-sm"
      >
        <p>Above timeline to be ensured by G M Logistic, Cell In charge (Logistic) and OSD, JMHIDPCL.</p>
        <p className="mt-2">
          Memo No: <strong>IMC-WH-14/DWH-16/06/882</strong> | Date: <strong>29/07/2021</strong>
        </p>
      </motion.div>
    </main>
  );
}
