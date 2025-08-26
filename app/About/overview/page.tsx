"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16 space-y-16">

      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-12 text-center drop-shadow-md"
      >
        About Us
      </motion.h1>

      {/* About Text Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="space-y-6 text-gray-700 leading-relaxed bg-gradient-to-r from-white to-gray-50 rounded-3xl shadow-xl p-8 md:p-12 text-justify"
      >
        <p>
          <strong>
            Jharkhand Medical and Health Infrastructure Development and Procurement Corporation Limited (JMHIDPCL)
          </strong>{" "}
          was established in 2013 at Ranchi, Jharkhand, under the Department of Health, Medical Education and Family Welfare, Government of Jharkhand,
          and is responsible for procurement, storage, and distribution of medicines, surgical goods, medical equipment/instruments, and more.
        </p>

        <p>
          With the evolving healthcare landscape, JMHIDPCL was incorporated under the Companies Act 1956 as a public undertaking on 24th May 2013
          to develop new processes and upgrade existing ones for efficient healthcare delivery.
        </p>

        <p>
          The Government of Jharkhand (GoJ) is committed to providing timely and effective healthcare services. Ensuring availability of quality drugs,
          proper medical services, and well-maintained facilities is crucial for public health.
        </p>

        <p>
          The <strong>Main objective</strong> of JMHIDPCL is to unify procurement of drugs, equipment, and logistics, maintain high quality, reduce costs,
          promote accessibility, and improve efficiency across government health institutions in Jharkhand.
        </p>
      </motion.div>

      {/* Profiles Section */}
      <section className="py-16">
        <motion.div
          className="grid gap-10 md:grid-cols-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Profile 1 */}
          <div className="relative p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 bg-white border-l-4 border-blue-800">
            <div className="flex justify-center -mt-16">
              <Image
                src="/shree_ajoy.jpeg"
                alt="Ajoy Kumar Singh"
                width={140}
                height={140}
                className="rounded-full border-4 border-white shadow-lg"
              />
            </div>
            <div className="text-center mt-4">
              <h3 className="text-xl font-bold text-black">Shri AJOY KUMAR SINGH, I.A.S.</h3>
              <span className="inline-block mt-2 px-3 py-1 text-sm bg-cyan-100 text-cyan-800 rounded-full font-medium">
                ADDITIONAL CHIEF SECRETARY, Health, GoJ
              </span>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                Oversees health programs and medical infrastructure across Jharkhand.
              </p>
            </div>
          </div>

          {/* Profile 2 */}
          <div className="relative p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 bg-white border-l-4 border-blue-800">
            <div className="flex justify-center -mt-16">
              <Image
                src="/shre_abu_imran.jpg"
                alt="Abu Imran"
                width={140}
                height={140}
                className="rounded-full border-4 border-white shadow-lg"
              />
            </div>
            <div className="text-center mt-4">
              <h3 className="text-xl font-bold text-black">Shri Abu Imran, I.A.S.</h3>
              <span className="inline-block mt-2 px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full font-medium">
                Managing Director (JMHIDPCL)
              </span>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                Manages day-to-day operations and ensures timely procurement and distribution of medical supplies.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
