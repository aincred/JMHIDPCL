"use client";

import { useState, useEffect } from "react";
import { Download, Trash, Eye } from "lucide-react";

type DownloadFile = {
  id: number;
  name: string;
  fileUrl: string;
};

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState<DownloadFile[]>([]);
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Load saved downloads from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("downloads_list");
    if (saved) setDownloads(JSON.parse(saved));
  }, []);

  // Save whenever downloads change
  useEffect(() => {
    localStorage.setItem("downloads_list", JSON.stringify(downloads));
  }, [downloads]);

  // Convert file → base64 (for localStorage persistence)
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  // Handle file upload
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name) return;

    setLoading(true);
    await new Promise((res) => setTimeout(res, 800)); // fake delay

    const base64File = await fileToBase64(file);

    const newDownload: DownloadFile = {
      id: Date.now(),
      name,
      fileUrl: base64File,
    };

    setDownloads([newDownload, ...downloads]);
    setName("");
    setFile(null);
    setLoading(false);
  };

  // Delete file
  const handleDelete = (id: number) => {
    setDownloads(downloads.filter((item) => item.id !== id));
  };

  return (
    <section className="p-6 bg-gray-100 min-h-screen relative">
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-8">
        {/* Upload Form */}
        <form
          onSubmit={handleUpload}
          className="flex flex-col sm:flex-row gap-4 items-center border-b pb-6"
        >
          <input
            type="text"
            placeholder="File name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full sm:w-1/3 text-sm focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            className="w-full sm:w-1/3 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg 
                       file:border-0 file:text-sm file:font-semibold 
                       file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow disabled:opacity-50"
          >
            Upload
          </button>
        </form>

        {/* Table of downloads */}
        {downloads.length === 0 ? (
          <p className="text-gray-500 text-center text-sm py-10">
            No files uploaded yet 📂
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">File Name</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {downloads.map((file, idx) => (
                  <tr key={file.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{idx + 1}</td>
                    <td className="px-4 py-2 border">{file.name}</td>
                    <td className="px-4 py-2 border flex gap-3">
                      {/* View */}
                      <a
                        href={file.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                      >
                        <Eye size={14} /> View
                      </a>
                      {/* Download */}
                      <a
                        href={file.fileUrl}
                        download={file.name}
                        className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                      >
                        <Download size={14} /> Download
                      </a>
                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(file.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                      >
                        <Trash size={14} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
