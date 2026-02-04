"use client";

export default function Sidebar() {
  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user"); // clear logged-in user
    window.location.href = "/login";  // redirect to login page
  };

  return (
    <aside className="w-64 bg-indigo-800 text-white flex flex-col p-6 min-h-screen shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <nav className="flex flex-col gap-3">
        <a
          href="/dashboard"
          className="hover:bg-indigo-600 rounded px-3 py-2 transition"
        >
          Dashboard
        </a>

        <a
          href="/doubts"
          className="hover:bg-indigo-600 rounded px-3 py-2 transition"
        >
          Doubts
        </a>

        <button
          onClick={handleLogout}
          className="bg-red-600 rounded px-3 py-2 transition text-left"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
