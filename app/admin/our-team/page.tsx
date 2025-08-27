"use client";

import { useEffect, useState } from "react";

type Member = {
  id: number;
  name: string;
  designation: string;
  phone: string;
  category: "admin" | "itcell";
};

// ✅ Type guard to check if object is a valid Member
function isMember(obj: unknown): obj is Member {
  if (typeof obj !== "object" || obj === null) return false;
  const m = obj as Record<string, unknown>;
  return (
    typeof m.id === "number" ||
    typeof m.id === "string" // allow string id before conversion
  ) &&
    typeof m.name === "string" &&
    typeof m.designation === "string" &&
    typeof m.phone === "string" &&
    (m.category === "admin" || m.category === "itcell");
}

export default function OurTeamPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [form, setForm] = useState({
    name: "",
    designation: "",
    phone: "",
    category: "admin" as "admin" | "itcell",
  });
  const [search, setSearch] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("our_team");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as unknown[];

        const validMembers: Member[] = parsed
          .map((m) => {
            if (isMember(m)) {
              return {
                id: Number(m.id),
                name: m.name,
                designation: m.designation,
                phone: m.phone,
                category: m.category,
              };
            }
            return null;
          })
          .filter((m): m is Member => m !== null);

        setMembers(validMembers);
      } catch {
        console.error("Invalid team data in localStorage");
      }
    }
  }, []);

  // Save to localStorage whenever members change
  useEffect(() => {
    localStorage.setItem("our_team", JSON.stringify(members));
  }, [members]);

  const addMember = () => {
    if (!form.name || !form.designation || !form.phone) return;

    const newMember: Member = {
      id: Date.now(),
      ...form,
    };

    setMembers([...members, newMember]);

    // reset form
    setForm({
      name: "",
      designation: "",
      phone: "",
      category: "admin",
    });
  };

  const deleteMember = (id: number) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  // Apply search filter
  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.designation.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search)
  );

  // Split by category
  const adminStaff = filteredMembers.filter((m) => m.category === "admin");
  const itCell = filteredMembers.filter((m) => m.category === "itcell");

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-16">
      {/* Header */}
      <h1 className="text-3xl font-bold text-blue-800 mb-8">Our Team</h1>

      {/* Add Member Form */}
      <div className="bg-white shadow p-6 rounded-lg mb-10">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Add Team Member
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Designation"
            value={form.designation}
            onChange={(e) => setForm({ ...form, designation: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="border p-2 rounded"
          />
          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value as "admin" | "itcell" })
            }
            className="border p-2 rounded"
          >
            <option value="admin">Administrative Staff</option>
            <option value="itcell">IT Cell (C-DAC)</option>
          </select>
        </div>
        <button
          onClick={addMember}
          className="mt-4 bg-blue-800 text-white px-4 py-2 rounded shadow hover:bg-cyan-700"
        >
          Add Member
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, designation, or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 border p-2 rounded shadow-sm"
        />
      </div>

      {/* Administrative Officers & Office Staff */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Administrative Officers & Office Staff
        </h2>
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="w-full border border-gray-200 bg-white rounded-lg">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Sl. No</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Designation</th>
                <th className="px-4 py-2 text-left">Phone No.</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {adminStaff.length > 0 ? (
                adminStaff.map((m, i) => (
                  <tr key={m.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{i + 1}</td>
                    <td className="px-4 py-2">{m.name}</td>
                    <td className="px-4 py-2">{m.designation}</td>
                    <td className="px-4 py-2">{m.phone}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => deleteMember(m.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* IT CELL (C-DAC) */}
      <section>
        <h2 className="text-xl font-semibold text-blue-800 mb-4">
          IT CELL (C-DAC)
        </h2>
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="w-full border border-gray-200 bg-white rounded-lg">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Sl. No</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Designation</th>
                <th className="px-4 py-2 text-left">Phone No.</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {itCell.length > 0 ? (
                itCell.map((m, i) => (
                  <tr key={m.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{i + 1}</td>
                    <td className="px-4 py-2">{m.name}</td>
                    <td className="px-4 py-2">{m.designation}</td>
                    <td className="px-4 py-2">{m.phone}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => deleteMember(m.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
