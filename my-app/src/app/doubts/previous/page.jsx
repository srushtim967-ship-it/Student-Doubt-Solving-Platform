"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Sidebar from "@/components/Sidebar";

export default function PreviousDoubtsPage() {
  const [user, setUser] = useState(null);
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoubts = async (email) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("doubts")
      .select("*")
      .eq("student_email", email)
      .order("created_at", { ascending: false });

    if (!error) {
      setDoubts(data);
    } else {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedUser || loggedUser.is_admin) {
      window.location.href = "/login";
    } else {
      setUser(loggedUser);
      fetchDoubts(loggedUser.email);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 selection:bg-indigo-100">
      <Sidebar />

      <main className="flex-1 p-6 md:p-12 ">
        {/* Header Section */}
        <div className="max-w-6xl mx-auto mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
            My <span className="text-indigo-700">History</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Review your past questions and expert solutions.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-slate-400 font-bold tracking-tight">Loading your archive...</p>
            </div>
          ) : doubts.length === 0 ? (
            <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 text-center">
              <div className="text-4xl mb-4">📚</div>
              <p className="text-slate-400 font-bold text-lg leading-relaxed">
                No doubts submitted yet.<br />
                Your academic history will appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {doubts.map((doubt) => (
                <div
                  key={doubt.id}
                  className="group bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden flex flex-col transition-all hover:shadow-indigo-200/50 hover:-translate-y-1"
                >
                  {/* Status Bar */}
                  <div className="px-8 pt-8 flex justify-between items-center mb-4">
                    <span
                      className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full ${
                        doubt.status === "answered"
                          ? "bg-green-600 text-white"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {doubt.status === "answered" ? "✓ Resolved" : "⏳ Pending"}
                    </span>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                      {new Date(doubt.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Question Section */}
                  <div className="px-8 pb-6 border-b border-slate-50">
                    <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">Question</h3>
                    <p className="text-slate-800 font-bold leading-relaxed text-lg">
                      {doubt.question}
                    </p>
                  </div>

                  {/* Answer Section */}
                  <div className="px-8 py-6 bg-gray-100 flex-grow">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Solution</h3>
                    {doubt.answer ? (
                      <p className="text-slate-950 leading-relaxed font-lg text-md">
                        {doubt.answer}
                      </p>
                    ) : (
                      <div className="flex items-center gap-2 text-slate-400 italic text-sm">
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                        Waiting for a mentor to reply...
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}