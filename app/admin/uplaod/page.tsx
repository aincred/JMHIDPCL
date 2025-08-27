"use client";

import { useState, useEffect } from "react";
import { Upload, X, Eye, Download, Trash2 } from "lucide-react";

type PdfFile = {
  id: number;
  name: string;
  url: string;
};

export default function UploadPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [pdfs, setPdfs] = useState<PdfFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [pdfName, setPdfName] = useState(""); // custom name input

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("pdf_files");
    if (stored) setPdfs(JSON.parse(stored));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("pdf_files", JSON.stringify(pdfs));
  }, [pdfs]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  // Remove file before uploading
  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // Upload (save to localStorage list)
  const handleUpload = () => {
    if (files.length === 0) return;

    setUploading(true);
    setTimeout(() => {
      const newFiles: PdfFile[] = files.map((file, i) => ({
        id: Date.now() + i,
        name: pdfName.trim() !== "" ? pdfName : file.name, // use custom name if provided
        url: URL.createObjectURL(file),
      }));

      setPdfs([...pdfs, ...newFiles]);
      setFiles([]); // clear selection
      setPdfName(""); // reset name field
      setUploading(false);
    }, 1000); // fake delay
  };

  // Delete from table
  const handleDelete = (id: number) => {
    setPdfs(pdfs.filter((pdf) => pdf.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-16">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">Upload PDF</h1>

      {/* Upload Box */}
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow">
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition">
          <Upload size={40} className="text-blue-500 mb-2" />
          <span className="text-blue-700 font-semibold">
            Click or drag PDF files here
          </span>
          <input
            type="file"
            accept="application/pdf"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* Input for PDF Name */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter PDF Name
          </label>
          <input
            type="text"
            value={pdfName}
            onChange={(e) => setPdfName(e.target.value)}
            placeholder="Custom PDF name (optional)"
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Selected Files Before Upload */}
        {files.length > 0 && (
          <div className="mt-4">
            <h2 className="font-semibold mb-2">Selected Files:</h2>
            <ul className="space-y-1">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-100 px-3 py-1 rounded"
                >
                  <span>{file.name}</span>
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={uploading || files.length === 0}
          className={`mt-6 w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {uploading ? "Uploading..." : "Upload PDF(s)"}
        </button>
      </div>

      {/* Uploaded PDFs Table */}
      <div className="w-full max-w-4xl mt-10 bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 w-12 text-center">#</th>
              <th className="border p-3 text-left">File Name</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pdfs.length > 0 ? (
              pdfs.map((pdf, index) => (
                <tr key={pdf.id} className="hover:bg-gray-50">
                  <td className="border p-3 text-center">{index + 1}</td>
                  <td className="border p-3">{pdf.name}</td>
                  <td className="border p-3 flex justify-center gap-3">
                    {/* View */}
                    <a
                      href={pdf.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      <Eye size={16} /> View
                    </a>

                    {/* Download */}
                    <a
                      href={pdf.url}
                      download={pdf.name}
                      className="flex items-center gap-1 text-green-600 hover:underline"
                    >
                      <Download size={16} /> Download
                    </a>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(pdf.id)}
                      className="flex items-center gap-1 text-red-600 hover:underline"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="text-center p-6 text-gray-500"
                >
                  No PDFs uploaded yet 🚫
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
