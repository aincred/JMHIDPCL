"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Member = {
  id: number;
  name: string;
  designation: string;
  phone: string;
  category: "admin" | "itcell";
};

export default function OurTeamPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch team members from Supabase
  const loadMembers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching members:", error.message);
    } else {
      setMembers(data as Member[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const adminStaff = members.filter((m) => m.category === "admin");
  const itCell = members.filter((m) => m.category === "itcell");

  // Handle multiple phone numbers
  const renderPhone = (phone: string) =>
    phone.split(/[,/]/).map((num, i) => (
      <span key={i}>
        <a href={`tel:${num.trim()}`} className="text-blue-700 hover:underline">
          {num.trim()}
        </a>
        {i < phone.split(/[,/]/).length - 1 && ", "}
      </span>
    ));

  // Sanctioned Posts
  const sanctionedPosts = [
    "Managing Director",
    "GM. Procurement",
    "GM. Finance & Accounts",
    "GM. HR & Administration",
    "GM. Logistic & Quality Control",
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 text-center">
        Our Team
      </h1>

      {/* Sanctioned Posts */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          Sanctioned Posts
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {sanctionedPosts.map((post, i) => (
            <li key={i} className="text-sm md:text-base">
              {post}
            </li>
          ))}
        </ul>
      </section>

      {/* Admin Staff */}
      <TeamTable
        title="Administrative Officers & Office Staff"
        members={adminStaff}
        renderPhone={renderPhone}
        loading={loading}
      />

      {/* IT Cell */}
      <TeamTable
        title="IT CELL (C-DAC)"
        members={itCell}
        renderPhone={renderPhone}
        loading={loading}
      />
    </main>
  );
}

function TeamTable({
  title,
  members,
  renderPhone,
  loading,
}: {
  title: string;
  members: Member[];
  renderPhone: (phone: string) => React.ReactNode;
  loading: boolean;
}) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-blue-800 mb-4">{title}</h2>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-3 text-left text-sm">Sl. No</th>
              <th className="p-3 text-left text-sm">Name</th>
              <th className="p-3 text-left text-sm">Designation</th>
              <th className="p-3 text-left text-sm">Phone No.</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  Loading members...
                </td>
              </tr>
            ) : members.length > 0 ? (
              members.map((s, i) => (
                <tr
                  key={s.id}
                  className={`border-b hover:bg-blue-50 ${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-3 text-sm">{i + 1}</td>
                  <td className="p-3 text-sm">{s.name}</td>
                  <td className="p-3 text-sm">{s.designation}</td>
                  <td className="p-3 text-sm">{renderPhone(s.phone)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
