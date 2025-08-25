"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Link from "next/link";

// Lazy load upload form
const CertificatesForm = dynamic(() => import("./CertificatesForm"), { ssr: false });

type Certificate = {
  id: number;
  certNo: string;
  certName: string;
  issuedDate: string;
  file?: string;
};

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  // Load from localStorage
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const saved = localStorage.getItem("certificates");
      if (saved) {
        setCertificates(JSON.parse(saved));
      }
      setLoading(false);
    }, 800); // simulate load
  }, []);

  // Save to localStorage whenever certificates change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("certificates", JSON.stringify(certificates));
    }
  }, [certificates, loading]);

  // Delete a certificate
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this certificate?")) {
      const updated = certificates.filter((c) => c.id !== id);
      setCertificates(updated);
      localStorage.setItem("certificates", JSON.stringify(updated));
    }
  };

  const filtered = certificates.filter(
    (c) =>
      c.certNo.toLowerCase().includes(search.toLowerCase()) ||
      c.certName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* Upload Form */}
        <CertificatesForm certificates={certificates} setCertificates={setCertificates} />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-xl font-bold text-gray-800">Certificates</h1>

          <div className="flex items-center gap-4">
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <span className="text-sm text-gray-600">entries per page</span>

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            />
          </div>
        </div>

        {/* Table or Loading */}
        <div className="overflow-x-auto min-h-[200px] flex items-center justify-center">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-gray-600">Loading certificates...</span>
            </div>
          ) : (
            <table className="w-full border border-gray-200 rounded-lg text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">S.no.</th>
                  <th className="px-4 py-2 border">Certificate No.</th>
                  <th className="px-4 py-2 border">Certificate Name</th>
                  <th className="px-4 py-2 border">Issued Date</th>
                  <th className="px-4 py-2 border">File</th>
                  <th className="px-4 py-2 border text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.slice(0, entriesPerPage).map((cert, index) => (
                    <tr key={cert.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border text-center">{index + 1}</td>
                      <td className="px-4 py-2 border">{cert.certNo}</td>
                      <td className="px-4 py-2 border">{cert.certName}</td>
                      <td className="px-4 py-2 border">{cert.issuedDate}</td>
                      <td className="px-4 py-2 border">
                        {cert.file ? (
                          <a
                            href={cert.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-xs"
                          >
                            View File
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-2 border text-center space-x-2">
                        <Link
                          href={`/admin/certificates/${cert.id}`}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(cert.id)}
                          className="text-red-600 hover:underline text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-500">
                      No certificates available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}
