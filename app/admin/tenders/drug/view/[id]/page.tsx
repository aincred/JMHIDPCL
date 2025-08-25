"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Tender = {
  id: number;
  title: string;
  reference: string;
  published: string;
  start: string;
  end: string;
  fileUrl?: string;
};

export default function TenderViewPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params?.id);
  const [tender, setTender] = useState<Tender | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("drug_tenders");
    if (saved) {
      const all: Tender[] = JSON.parse(saved);
      const found = all.find((t) => t.id === id);
      if (found) setTender(found);
    }
  }, [id]);

  if (!tender) {
    return (
      <section className="p-6 bg-gray-50 min-h-screen flex justify-center items-center">
        <div className="bg-white p-6 rounded-xl shadow-md text-gray-600">
          Tender not found.
        </div>
      </section>
    );
  }

  return (
    <section className="p-6 bg-gray-50 min-h-screen flex justify-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl space-y-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-bold text-gray-800 border-b pb-2">
          Tender Details
        </h1>

        <div className="grid gap-2 text-gray-700 text-sm">
          <p>
            <span className="font-semibold">Tender Title:</span> {tender.title}
          </p>
          <p>
            <span className="font-semibold">Reference No.:</span>{" "}
            {tender.reference}
          </p>
          <p>
            <span className="font-semibold">Start Date:</span> {tender.start}
          </p>
          <p>
            <span className="font-semibold">End Date:</span> {tender.end}
          </p>
          <p>
            <span className="font-semibold">Published Date:</span>{" "}
            {tender.published}
          </p>
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

            <div className="border rounded-lg overflow-hidden">
              <iframe
                src={tender.fileUrl}
                width="100%"
                height="500px"
                className="rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
