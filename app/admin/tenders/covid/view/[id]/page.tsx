"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Tender = {
  id: number;
  title: string;
  reference: string;
  published: string;
  start: string;
  end: string;
  fileUrl?: string;
};

export default function CovidTenderViewPage() {
  const { id } = useParams();
  const router = useRouter();
  const [tender, setTender] = useState<Tender | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("covid_tenders");
    if (saved) {
      const all: Tender[] = JSON.parse(saved);
      const found = all.find((t) => t.id === Number(id));
      if (found) setTender(found);
    }
  }, [id]);

  if (!tender) {
    return (
      <section className="p-6 bg-gray-50 min-h-screen">
        <button
          onClick={() => router.back()}
          className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          ← Back
        </button>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <p className="text-gray-600">Tender not found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Covid-19 Tender Details</h1>

        <div className="space-y-2 text-gray-700">
          <p><span className="font-semibold">Tender Title: </span>{tender.title}</p>
          <p><span className="font-semibold">Tender Reference No.: </span>{tender.reference}</p>
          <p><span className="font-semibold">Published Date: </span>{tender.published}</p>
          <p><span className="font-semibold">Start Date: </span>{tender.start}</p>
          <p><span className="font-semibold">End Date: </span>{tender.end}</p>
        </div>

        {tender.fileUrl && (
          <div className="space-y-3">
            <a
              href={tender.fileUrl}
              download
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Download Attachment
            </a>

            {/* PDF Preview */}
            <div className="mt-4 border rounded-lg overflow-hidden">
              <embed
                src={tender.fileUrl}
                type="application/pdf"
                width="100%"
                height="600px"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
