"use client";

import { useState } from "react";

type Certificate = {
  id: number;
  certNo: string;
  certName: string;
  issuedDate: string;
  file?: string;
};

export default function CertificatesForm({
  certificates,
  setCertificates,
}: {
  certificates: Certificate[];
  setCertificates: React.Dispatch<React.SetStateAction<Certificate[]>>;
}) {
  const [certNo, setCertNo] = useState("");
  const [certName, setCertName] = useState("");
  const [issuedDate, setIssuedDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!certNo || !certName || !issuedDate) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    // Convert uploaded file → base64 for storage
    let fileUrl: string | undefined;
    if (file) {
      const reader = new FileReader();
      fileUrl = await new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    }

    const newCert: Certificate = {
      id: certificates.length + 1,
      certNo,
      certName,
      issuedDate,
      file: fileUrl,
    };

    // simulate delay
    setTimeout(() => {
      setCertificates([newCert, ...certificates]);

      // Reset form
      setCertNo("");
      setCertName("");
      setIssuedDate("");
      setFile(null);

      setLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4 border-b pb-6 relative">
      <h2 className="text-lg font-bold text-gray-800">Upload New Certificate</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Certificate No."
          value={certNo}
          onChange={(e) => setCertNo(e.target.value)}
          className="border rounded px-3 py-2 w-full text-sm"
          required
        />
        <input
          type="text"
          placeholder="Certificate Name"
          value={certName}
          onChange={(e) => setCertName(e.target.value)}
          className="border rounded px-3 py-2 w-full text-sm"
          required
        />
        <input
          type="date"
          value={issuedDate}
          onChange={(e) => setIssuedDate(e.target.value)}
          className="border rounded px-3 py-2 w-full text-sm"
          required
        />
        <input
          type="file"
          accept="application/pdf,image/*"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="border rounded px-3 py-2 w-full text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload Certificate"}
      </button>

      {/* Loading Overlay with Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg animate-fadeIn">
          <div className="p-4 bg-white shadow-lg rounded-lg flex items-center gap-3">
            <span className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
            <span className="text-sm font-medium text-gray-700">Uploading...</span>
          </div>
        </div>
      )}

      {/* Custom fade animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </form>
  );
}
