"use client";

import Image from "next/image";

export default function SOPPage() {
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="px-4 sm:px-6 lg:px-8 py-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Standard Operating Procedure (SOP)
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
            View the SOP image below or download it for reference.
          </p>
        </div>

        {/* Image Viewer */}
        <div className="p-4 sm:p-6 flex justify-center relative w-full h-[500px]">
          <Image
            src="/sop_logistics-qc.jpg"
            alt="Standard Operating Procedure"
            fill
            className="rounded-lg shadow-lg object-contain"
            priority
          />
        </div>

        {/* Download Button */}
        <div className="mt-6 text-center pb-6">
          <a
            href="/sop_logistics-qc.jpg"
            download
            className="inline-block w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Download SOP
          </a>
        </div>
      </div>
    </section>
  );
}
