"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react"; // ✅ spinner icon

type Member = {
  id: number;
  name: string;
  designation: string;
  phone: string;
  category: "admin" | "itcell";
};

export default function OurTeamPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [form, setForm] = useState({
    name: "",
    designation: "",
    phone: "",
    category: "admin" as "admin" | "itcell",
  });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false); // ✅ new state for add-member

  // Load members from Supabase
  async function loadMembers() {
    setLoading(true);
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .order("id", { ascending: true });

    if (error) console.error(error);
    else setMembers(data as Member[]);
    setLoading(false);
  }

  useEffect(() => {
    loadMembers();
  }, []);

  // Add member
  const addMember = async () => {
    if (!form.name || !form.designation || !form.phone) return;

    setAdding(true); // start loading animation
    const { error } = await supabase.from("members").insert([form]);

    if (error) {
      console.error(error);
      setAdding(false);
      return;
    }

    setForm({ name: "", designation: "", phone: "", category: "admin" });
    await loadMembers();
    setAdding(false); // stop loading animation
  };

  // Delete member
  const deleteMember = async (id: number) => {
    const { error } = await supabase.from("members").delete().eq("id", id);
    if (error) console.error(error);
    else setMembers(members.filter((m) => m.id !== id));
  };

  // Filter members
  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.designation.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search)
  );

  const adminStaff = filteredMembers.filter((m) => m.category === "admin");
  const itCell = filteredMembers.filter((m) => m.category === "itcell");

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-16">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">Our Team</h1>

      {/* Add Form */}
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
          disabled={adding}
          className="mt-4 flex items-center justify-center bg-blue-800 text-white px-4 py-2 rounded shadow hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {adding ? (
            <>
              <Loader2 className="animate-spin mr-2 h-5 w-5" /> Adding...
            </>
          ) : (
            "Add Member"
          )}
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, designation, or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 border p-2 rounded shadow-sm"
        />
      </div>

      {/* Loading / Tables */}
      {loading ? (
        <p className="text-center text-gray-500">Loading team members...</p>
      ) : (
        <>
          <TeamTable
            title="Administrative Officers & Office Staff"
            members={adminStaff}
            deleteMember={deleteMember}
          />

          <TeamTable
            title="IT CELL (C-DAC)"
            members={itCell}
            deleteMember={deleteMember}
          />
        </>
      )}
    </div>
  );
}

function TeamTable({
  title,
  members,
  deleteMember,
}: {
  title: string;
  members: Member[];
  deleteMember: (id: number) => void;
}) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">{title}</h2>
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
            {members.length > 0 ? (
              members.map((m, i) => (
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
  );
}
