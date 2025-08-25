"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Certificate = {
  id: number;
  certNo: string;
  certName: string;
  issuedDate: string;
  file?: string; // base64 data url
};

export default function CertificateViewPage() {
  const params = useParams();
  const router = useRouter();
  const [certificate, setCertificate] = useState<Certificate | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("certificates");
    if (saved) {
      const list: Certificate[] = JSON.parse(saved);
      const found = list.find((c) => c.id === Number(params.id));
      if (found) setCertificate(found);
    }
  }, [params.id]);

  if (!certificate) {
    return (
      <section className="p-6">
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-600">Certificate not found.</p>
          <button
            onClick={() => router.push("/admin/certificates")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Back
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* Details */}
        <h1 className="text-xl font-bold text-gray-800">
          Certificate Details
        </h1>
        <div className="grid gap-4 text-sm">
          <div>
            <span className="font-semibold">Certificate No: </span>
            {certificate.certNo}
          </div>
          <div>
            <span className="font-semibold">Certificate Name: </span>
            {certificate.certName}
          </div>
          <div>
            <span className="font-semibold">Issued Date: </span>
            {certificate.issuedDate}
          </div>
        </div>

        {/* File Preview */}
        {certificate.file ? (
          <div className="mt-4">
            <h2 className="font-semibold text-gray-700 mb-2">Preview:</h2>
            {certificate.file.startsWith("data:application/pdf") ? (
              <object
                data={certificate.file}
                type="application/pdf"
                width="100%"
                height="600px"
                className="border rounded"
              >
                <p>
                  PDF preview not supported.{" "}
                  <a href={certificate.file} target="_blank" rel="noreferrer">
                    Download here
                  </a>
                  .
                </p>
              </object>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={certificate.file}
                alt={certificate.certName}
                className="max-h-[600px] border rounded"
              />
            )}
          </div>
        ) : (
          <p className="text-gray-500">No file uploaded.</p>
        )}

        {/* Back button */}
        <button
          onClick={() => router.push("/admin/certificates")}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Certificates
        </button>
      </div>
    </section>
  );
}
