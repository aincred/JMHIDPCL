// app/About/moa/page.tsx

export default function MOAPage() {
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden">
        {/* Header Section */}
        <div className="px-4 sm:px-6 lg:px-8 py-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-900 dark:text-gray-100">
            Memorandum of Association
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
            View or download the official Memorandum of Association (MOA) document below.
          </p>
        </div>

        {/* PDF Viewer */}
        <div className="p-4 sm:p-6">
          <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md">
            <iframe
              src="/moa.pdf" // Ensure this is inside `public/moa.pdf`
              className="w-full h-[400px] sm:h-[500px] lg:h-[650px]"
              style={{ border: "none" }}
            />
          </div>

          {/* Download Button */}
          <div className="mt-6 text-center">
            <a
              href="/moa.pdf"
              download
              className="inline-block w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Download MOA
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
