"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function DoubtsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

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
    <div className="flex min-h-screen bg-slate-50 selection:bg-indigo-100">
      <Sidebar />

      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
        {/* Top Floating Header */}
        <div className="w-full max-w-4xl flex justify-between items-center mb-8 px-2">
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

        {/* Support Footer */}
       
      </main>
    </div>
  );
}
