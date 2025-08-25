"use client";

export default function Header() {
  return (
    <header className="bg-blue-800 text-white flex items-center justify-between px-6 py-6 border-b fixed top-0 left-64 right-0 z-15">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold">JMHIDPCL Control Portal</h1>
      </div>
      <div className="flex items-center gap-6">
        <span>Welcome, Administrator</span>
      </div>
    </header>
  );
}
