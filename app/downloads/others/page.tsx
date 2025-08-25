"use client";

import { FileText } from "lucide-react";

type FormatFile = {
  id: number;
  title: string;
  link: string;
};

export default function OtherFormats() {
  const formats: FormatFile[] = [
    {
      id: 1,
      title: "Recruitment Advertisement - Consultant (Procurement)",
      link: "/Advertisemnet_of_Consultant_2025.pdf",
    },
    {
      id: 2,
      title: "Instructions to Bidders for Tender Cum Auction",
      link: "/Instructions_to_Bidders_for_Tender_Cum_Auction.pdf",
    },
    {
      id: 3,
      title: "Undertaking on Fraud & Corruption (for bidder)",
      link: "/UNDERTAKING_ON_FRAUD_AND_CORRUPTION_for_bidder.pdf",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl text-blue-800 font-bold mb-6">Other Formats</h2>

      <div className="bg-white rounded-xl shadow p-6">
        <ul className="space-y-4">
          {formats.map((file) => (
            <li
              key={file.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div className="flex items-center gap-3">
                <FileText className="text-blue-600" size={20} />
                <span className="text-gray-800">{file.title}</span>
              </div>
              <a
                href={file.link}
                download
                className="text-blue-600 hover:underline text-sm"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
