"use client"

import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <main id="main" className="max-w-6xl mx-auto px-6 py-12">
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 text-center"
      >
        About Us
      </motion.h1>

      {/* About Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="space-y-5 text-gray-700 leading-relaxed bg-white rounded-2xl shadow-md p-6 md:p-10"
      >
        <p>
          <strong>
            Jharkhand Medical and Health Infrastructure Development and
            Procurement Corporation Limited (JMHIDPCL)
          </strong>{" "}
          was established in 2013 at Ranchi Jharkhand, under the aegis of
          Department of Health, Medical Education and Family Welfare, Government
          of Jharkhand and was entrusted with the functions of procurement of
          medicines, surgical goods, medical equipment/instrument and others
          under Govt. of Jharkhand (GoJ).
        </p>

        <p>
          With the changes in the healthcare arena there was a felt need of
          developing new as well as upgrading the existing functioning and
          processes of Department of Health, Medical Education and Family
          Welfare, Government of Jharkhand. Consequently, JMHIDPCL was
          incorporated under the Companies Act 1956 as a public undertaking on
          24th May 2013.
        </p>

        <p>
          Government of Jharkhand (GoJ) is committed to provide timely and
          effective Health Care Services to the people of Jharkhand. A majority
          of the poor population depends on Public/Government Health Care
          Systems. Ensuring the availability of good quality drugs, medical
          services, and proper construction and maintenance of facilities is
          crucial.
        </p>

        <p>
          The <strong>Main objective</strong> of the Corporation is to unify the
          procurement of drugs, equipment, and other logistics in order to
          maintain high quality, reduce costs, promote accessibility, and
          improve efficiency across government health institutions in Jharkhand.
        </p>
      </motion.div>
    </main>
  )
}
