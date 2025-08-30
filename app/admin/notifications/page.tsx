"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Notification = {
  id: number;
  title: string;
  date: string; // yyyy-mm-dd
  file_path?: string | null;
  file_public_url?: string | null;
  created_at?: string;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Fetch notifications from Supabase
  const fetchNotifications = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
    } else {
      setNotifications((data as Notification[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();

    // Optional: subscribe to realtime changes (if you have realtime enabled)
    // const sub = supabase
    //   .channel("public:notifications")
    //   .on(
    //     "postgres_changes",
    //     { event: "*", schema: "public", table: "notifications" },
    //     () => fetchNotifications()
    //   )
    //   .subscribe();
    // return () => { supabase.removeChannel(sub); }
  }, []);

  // Upload file to storage and return { path, publicUrl }
  const uploadFileToStorage = async (f: File) => {
    const bucket = "notification-files";
    const timestamp = Date.now();
    const safeName = `${timestamp}_${f.name.replace(/\s+/g, "_")}`;
    const path = safeName; // folderless; or `notifications/${safeName}`

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, f, { upsert: false });

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);
    return { path, publicUrl: urlData.publicUrl };
  };

  // Add notification
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return alert("Please provide title and date.");

    setLoading(true);
    try {
      let file_path: string | null = null;
      let file_public_url: string | null = null;

      if (file) {
        const res = await uploadFileToStorage(file);
        file_path = res.path;
        file_public_url = res.publicUrl;
      }

      const { data, error } = await supabase
        .from("notifications")
        .insert([{ title, date, file_path, file_public_url }])
        .select()
        .single();

      if (error) throw error;

      // Prepend new notification to UI list
      setNotifications((prev) => [data as Notification, ...prev]);
      setTitle("");
      setDate("");
      setFile(null);
    } catch (err) {
      console.error("Add notification failed:", err);
      alert("Failed to add notification. Check console.");
    } finally {
      setLoading(false);
    }
  };

  // Delete notification (and optionally delete file from storage)
  const handleDelete = async (n: Notification) => {
    if (!confirm("Delete this notification?")) return;
    setLoading(true);
    try {
      // Delete DB row
      const { error } = await supabase
        .from("notifications")
        .delete()
        .match({ id: n.id });
      if (error) throw error;

      // Optionally delete file from storage if present
      if (n.file_path) {
        const { error: storageError } = await supabase.storage
          .from("notification-files")
          .remove([n.file_path]);
        if (storageError) {
          // warn but not fatal
          console.warn("File deletion warning:", storageError.message);
        }
      }

      setNotifications((prev) => prev.filter((x) => x.id !== n.id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  // Filtered results
  const filtered = notifications.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        <p className="text-sm text-gray-600">Latest official updates & circulars</p>

        <form
          onSubmit={handleAdd}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-6 rounded-lg bg-gray-50"
        >
          <div>
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Notification title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Attach File (PDF)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-400 mt-1">Optional. Max recommended: 8MB.</p>
          </div>
          <div className="md:col-span-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? "Saving..." : "Add Notification"}
            </button>
          </div>
        </form>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Show</label>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm"
            >
              {[5, 10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-600">entries</span>
          </div>

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-1 text-sm"
          />
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-blue-600 text-white text-sm uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3">Sl. No.</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-center">File</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {loading && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    Loading...
                  </td>
                </tr>
              )}

              {!loading &&
                filtered.slice(0, entriesPerPage).map((n, idx) => (
                  <tr key={n.id} className="hover:bg-blue-50 transition-colors duration-200">
                    <td className="px-4 py-3">{idx + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{n.title}</td>
                    <td className="px-4 py-3 text-gray-600">{n.date}</td>
                    <td className="px-4 py-3 text-center">
                      {n.file_public_url ? (
                        <a href={n.file_public_url} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                          View
                        </a>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleDelete(n)}
                        className="px-3 py-1 text-xs font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center px-4 py-6 text-gray-500">
                    No notifications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600">
          Showing {filtered.length > 0 ? 1 : 0} to {Math.min(entriesPerPage, filtered.length)} of {filtered.length} entries
        </p>
      </div>
    </section>
  );
}
