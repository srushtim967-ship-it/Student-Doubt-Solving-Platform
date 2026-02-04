"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Button from "@/components/ui/Button";
import Link from 'next/link';

export default function AdminDashboard() {
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.is_admin) {
      window.location.href = "/login";
      return;
    }
    fetchDoubts();
  }, []);

  const fetchDoubts = async () => {
    setLoading(true);
    let query = supabase.from("doubts").select("*");
    if (filter) {
      query = query.ilike("question", `%${filter}%`);
    }
    const { data, error } = await query.order("created_at", { ascending: false });
    
    if (!error) {
      setDoubts(data || []);
      
      // Populate the input fields with existing answers for "answered" questions
      const initialAnswers = {};
      data.forEach(d => {
        if (d.status === "answered" && d.answer) {
          initialAnswers[d.id] = d.answer;
        }
      });
      setAnswers(initialAnswers);
    }
    setLoading(false);
  };

  const handleAnswer = async (id) => {
    const answerText = answers[id];
    if (!answerText || !answerText.trim()) return alert("Answer cannot be empty");

    // Find the current record in our state to check its existing status
    const currentDoubt = doubts.find(d => d.id === id);
    const isAlreadyAnswered = currentDoubt?.status === "answered";

    const { error } = await supabase
      .from("doubts")
      .update({ answer: answerText, status: "answered" })
      .eq("id", id);

    if (error) {
      alert("Failed to update database");
      return;
    }

    // Update local state so the UI stays in sync
    setDoubts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, answer: answerText, status: "answered" } : d))
    );

    // Dynamic alert message based on previous state
    if (isAlreadyAnswered) {
      alert("Resolution re-submitted successfully!");
    } else {
      alert("Resolution submitted successfully!");
    }
  };

  const stats = {
    total: doubts.length,
    pending: doubts.filter((d) => d.status === "pending" || !d.status).length,
    answered: doubts.filter((d) => d.status === "answered").length,
  };

  return (
    <div className="flex min-h-screen bg-slate-50 selection:bg-indigo-100">
      <aside className="w-72 bg-indigo-900 text-white p-8 flex flex-col hidden lg:flex">
        <div className="mb-10">
          <h2 className="text-xl font-black tracking-tighter text-indigo-400 uppercase">Admin Dashboard</h2>
          <p className="text-slate-500 text-xs font-bold mt-1 tracking-widest uppercase">Admin Management</p>
        </div>
        
        <nav className="flex flex-col gap-2 flex-1">
          <div className="bg-indigo-600/10 text-indigo-400 px-4 py-3 rounded-xl font-bold flex items-center gap-3 border border-indigo-600/20">
            <span>📊</span>Dashboard
          </div>
          <Link href="/admin/settings" className="hover:bg-indigo-800 text-slate-400 px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-3">
             <span>⚙️</span> Settings
          </Link>
        </nav>

        <button 
          onClick={() => { localStorage.removeItem("user"); window.location.href="/login"; }}
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-3 rounded-xl font-bold transition-all text-center"
        >
          Sign Out
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Doubt <span className="text-indigo-700">Moderation</span></h1>
          <p className="text-slate-500 font-medium mt-1">Manage and update student query resolutions.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <AdminStatCard title="Total Questions" value={stats.total} />
          <AdminStatCard title="Awaiting Review" value={stats.pending} color="amber" />
          <AdminStatCard title="Answered" value={stats.answered} color="emerald" />
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex gap-3">
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search by question content..."
            className="flex-1 bg-slate-50 border-none px-5 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500/20 transition-all text-slate-700 font-medium"
          />
          <Button onClick={fetchDoubts} className="bg-slate-600 text-white px-8 py-3 rounded-xl hover:bg-slate-800 transition-all font-bold">
            Filter
          </Button>
        </div>

        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-100 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-900">Student Question</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-900">Resolution Input</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-900 text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-900 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan="4" className="p-20 text-center text-slate-300 font-bold">Retrieving doubts...</td></tr>
              ) : doubts.length === 0 ? (
                <tr><td colSpan="4" className="p-20 text-center text-slate-300 font-bold">No questions found.</td></tr>
              ) : (
                doubts.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6 align-top w-1/3">
                      <p className="text-slate-700 text-md leading-relaxed">{d.question}</p>
                      <p className="text-indigo-500 text-[10px] font-black mt-2 uppercase">{d.student_email}</p>
                    </td>
                    <td className="px-8 py-6 align-top">
                      <textarea
                        value={answers[d.id] || ""} 
                        onChange={(e) => setAnswers({ ...answers, [d.id]: e.target.value })}
                        className="text-black w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all text-sm min-h-[100px] resize-none"
                        placeholder="Type your explanation here..."
                      />
                    </td>
                    <td className="px-8 py-6 align-middle text-center">
                      <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                        d.status === "answered" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {d.status || 'pending'}
                      </span>
                    </td>
                    <td className="px-8 py-6 align-middle text-center">
                      <Button
                        onClick={() => handleAnswer(d.id)}
                        className={`${
                            d.status === "answered" ? "bg-indigo-600 hover:bg-indigo-700" : "bg-emerald-600 hover:bg-emerald-700"
                        } text-white px-6 py-3 rounded-xl shadow-lg transition-all font-black text-xs uppercase`}
                      >
                        {d.status === "answered" ? "Update" : "Submit"}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function AdminStatCard({ title, value, color = "indigo" }) {
  const styles = {
    indigo: "border-indigo-500 text-indigo-600",
    amber: "border-amber-500 text-amber-600",
    emerald: "border-emerald-500 text-emerald-600"
  };
  return (
    <div className={`p-8 rounded-[2rem] border border-slate-200 border-b-4 bg-white ${styles[color]}`}>
      <h2 className="text-4xl font-black tracking-tighter">{value}</h2>
      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">{title}</p>
    </div>
  );
}