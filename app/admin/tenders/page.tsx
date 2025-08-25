"use client";

import Link from "next/link";
import { Pill, Stethoscope, Package, Biohazard, List } from "lucide-react";

export default function TendersPage() {
  const categories = [
    {
      name: "Drug Tenders",
      description: "All drug procurement tenders.",
      href: "/admin/tenders/drug",
      icon: <Pill size={28} />,
      color: "bg-green-100 text-green-700",
    },
    {
      name: "Equipment Tenders",
      description: "Medical and non-medical equipment tenders.",
      href: "/admin/tenders/equipment",
      icon: <Stethoscope size={28} />,
      color: "bg-gray-100 text-gray-700",
    },
    {
      name: "Consumable Tenders",
      description: "General consumables and hospital supplies.",
      href: "/admin/tenders/consumable",
      icon: <Package size={28} />,
      color: "bg-orange-100 text-orange-700",
    },
    {
      name: "Covid-19 Tenders",
      description: "Covid-19 specific tenders and procurement.",
      href: "/admin/tenders/covid",
      icon: <Biohazard size={28} />,
      color: "bg-red-100 text-red-700",
    },
    {
      name: "All Tenders",
      description: "Browse all tenders in one place.",
      href: "/admin/tenders/all",
      icon: <List size={28} />,
      color: "bg-blue-100 text-blue-700",
    },
  ];

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Tenders Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="p-6 bg-white border rounded-xl shadow hover:shadow-lg transition group"
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-lg ${cat.color} mb-4`}
              >
                {cat.icon}
              </div>
              <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                {cat.name}
              </h2>
              <p className="text-sm text-gray-600 mt-2">{cat.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
