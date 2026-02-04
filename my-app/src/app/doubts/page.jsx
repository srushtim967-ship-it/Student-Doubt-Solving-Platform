"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { MoreVertical, X } from "lucide-react"; // Added icons
import Link from "next/link";

export default function DoubtsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar State

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedUser || loggedUser.is_admin) {
      router.push("/login");
    } else {
      setUser(loggedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50 selection:bg-indigo-100 relative overflow-x-hidden">
      
      {/* 3-DOT FLOATING BUTTON */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-6 left-6 z-50 p-3 bg-white border border-slate-200 rounded-full shadow-lg hover:bg-slate-50 text-slate-600 transition-all active:scale-95"
      >
        {isSidebarOpen ? <X size={24} /> : <MoreVertical size={24} />}
      </button>
     

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-indigo-800 text-white flex flex-col p-6 shadow-2xl transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="mb-10 mt-12">
          <h2 className="text-xl font-black tracking-tighter text-indigo-400 uppercase">Student</h2>
          <p className="text-slate-800 text-md font-bold mt-1 tracking-widest uppercase">Dashboard</p>
        </div>
        <nav className="flex flex-col gap-3">
          <Link href="/" className="hover:bg-indigo-700 text-white px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-3">
            <span>🏠</span> Home
          </Link>
          <Link href="/dashboard" className="hover:bg-indigo-700 text-slate-400 px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-3">
            <span>📊</span> Dashboard
          </Link>
          <div className="bg-indigo-600 text-white px-4 py-3 rounded-xl font-bold flex items-center gap-3 border border-indigo-400/20">
            <span>❓</span> Doubts
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className={`
        flex-1 flex flex-col items-center justify-center p-6 md:p-12 transition-all duration-300
        ${isSidebarOpen ? "md:ml-64 opacity-50 md:opacity-100" : "ml-0"}
        pl-20 md:pl-24
      `}>
        {/* Top Floating Header */}
        <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-start md:items-center mb-8 px-2 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Hello, {user?.name} 👋
            </h1>
            <p className="text-slate-500 font-medium">What would you like to do today?</p>
          </div>
          <Button
            onClick={handleLogout}
            className="bg-red-500 border-2 border-slate-200 text-white px-5 py-2.5 rounded-xl hover:bg-red-600 transition-all font-bold text-sm shadow-sm"
          >
            Logout
          </Button>
        </div>

        <Card className="w-full max-w-4xl border-none bg-transparent shadow-none p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Action Card 1: Submit */}
            <div 
              onClick={() => router.push("/doubts/new")}
              className="group cursor-pointer bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-indigo-100/20 hover:shadow-indigo-200/50 transition-all hover:-translate-y-2 text-center"
            >
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
              </div>
              <h2 className="text-2xl font-black text-slate-800 mb-3">Ask a Doubt</h2>
              <p className="text-slate-500 leading-relaxed mb-8">
                Stuck on a problem? Submit a new question and get help from our experts.
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-100">
                New Submission
              </Button>
            </div>

            {/* Action Card 2: History */}
            <div 
              onClick={() => router.push("/doubts/previous")}
              className="group cursor-pointer bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-indigo-200/50 transition-all hover:-translate-y-2 text-center"
            >
              <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </div>
              <h2 className="text-2xl font-black text-slate-800 mb-3">Review Doubts</h2>
              <p className="text-slate-500 leading-relaxed mb-8">
                Check status updates or re-read solutions to your previous academic queries.
              </p>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100">
                View History
              </Button>
            </div>
          </div>
        </Card>
      </main>

      {/* Backdrop for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
