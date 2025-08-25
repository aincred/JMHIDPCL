// app/logistics/page.tsx
"use client";

import Image from "next/image";
import { ClipboardList, CheckCircle, Truck, Package } from "lucide-react";

export default function LogisticsPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      {/* Title */}
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold text-blue-900">
          Logistics & Supply Chain
        </h1>
        <p className="text-gray-600 text-lg">
          Ensuring smooth procurement, distribution, and quality testing of medicines
        </p>
      </header>

      {/* Logistics Section */}
      <section>
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-blue-800 mb-6">
          <ClipboardList className="h-6 w-6 text-blue-600" />
          Key Responsibilities
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Enter medicine details in e-Aushadhi Portal (Batch no., Mfg. date, Expiry date).",
            "Issue Dispatch Clearance Order after Technical Advisor’s report verification.",
            "Receive medicines/consumables in Central Warehouse & District Stores.",
            "Ensure continuous adequacy planning based on demand & purchase orders.",
            "Issue work orders to transporters for timely delivery to districts.",
            "Send medicine samples to Quality Cell for quality testing.",
            "Issue Quality Clearance Certificate after NABL test report approval.",
            "Generate warehouse receipt for tracking and further process.",
            "Coordinate with Civil Surgeons/Storekeepers for medicine lifting.",
          ].map((point, i) => (
            <div
              key={i}
              className="bg-white border shadow rounded-xl p-4 flex gap-3 hover:shadow-lg transition"
            >
              <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-1" />
              <p className="text-gray-700">{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Supply Chain Flow Images */}
      <section>
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-blue-800 mb-6">
          <Truck className="h-6 w-6 text-blue-600" />
          Supply Chain Flow
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-xl border bg-white shadow overflow-hidden">
            <Image
              src="/suppy-chain-1.jpg"
              alt="Supply Chain Flow 1"
              width={800}
              height={500}
              className="w-full h-auto"
            />
          </div>
          <div className="rounded-xl border bg-white shadow overflow-hidden">
            <Image
              src="/suppy-chain-2.jpg"
              alt="Supply Chain Flow 2"
              width={800}
              height={500}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Quality Test Section */}
      <section>
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-blue-800 mb-6">
          <Package className="h-6 w-6 text-blue-600" />
          Quality Test Process
        </h2>

        <div className="bg-gradient-to-r from-blue-50 to-green-50 border rounded-2xl p-6 shadow space-y-4">
          <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
            <li>Testing as per the Drugs & Cosmetics Act, 1940.</li>
            <li>
              Drugs Inspectors collect samples from depots & ensure statutory
              provisions.
            </li>
            <li>
              Additional samples are drawn from Health Institution supplies for
              quality assurance.
            </li>
            <li>
              Recovery/Replacement is initiated if drugs are sub-standard or
              spurious.
            </li>
            <li>Debarring policy is followed strictly for non-compliant firms.</li>
            <li>
              Names of debarred firms are published on the JMHIDPCL website.
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
