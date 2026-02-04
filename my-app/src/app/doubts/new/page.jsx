"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { MoreVertical, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function NewDoubtPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedUser || loggedUser.is_admin) {
      window.location.href = "/login";
    } else {
      setUser(loggedUser);
    }
  }, []);

  const handleSubmit = async () => {
    if (!question.trim()) return alert("Please type your question before submitting.");

    if (!user?.id || !user?.email) {
      alert("User session expired. Please login again.");
      router.push("/login");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("doubts").insert([
      {
        student_id: user.id,
        student_email: user.email,
        question: question.trim(),
        status: "pending",
      },
    ]);

    setLoading(false);

    if (error) {
      console.error("Error submitting doubt:", error);
      alert(error.message);
    } else {
      setQuestion("");
      alert("Doubt submitted successfully! Our experts will review it shortly.");
      router.push("/doubts");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 selection:bg-indigo-100 relative overflow-x-hidden">
      
      {/* 3-DOT TOGGLE BUTTON */}
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
          <Link href="/dashboard" className="hover:bg-indigo-700 text-indigo-100 px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-3">
            <span>📊</span> Dashboard
          </Link>
          <Link href="/doubts" className="bg-indigo-600 text-white px-4 py-3 rounded-xl font-bold flex items-center gap-3 border border-indigo-400/20 shadow-inner">
            <span>❓</span> Doubts
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className={`
        flex-1 p-6 md:p-12 transition-all duration-300
        ${isSidebarOpen ? "md:ml-64 opacity-50 md:opacity-100" : "ml-0"}
        pl-20 md:pl-24
      `}>
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="mb-10 text-left">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
              Submit a <span className="text-indigo-700">New Doubt</span>
            </h1>
            <p className="text-slate-500 font-medium">
              Be as descriptive as possible to get the best answer.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                Your Question
              </label>
              
              <textarea
                rows={8}
                placeholder="Example: How do I solve this quadratic equation using the formula method? I'm stuck on the square root part..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none leading-relaxed"
              />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-400 font-medium order-2 sm:order-1">
                  {question.length} characters entered
                </p>
                <Button
                  onClick={handleSubmit}
                  disabled={loading || !question.trim()}
                  className="w-full sm:w-auto bg-indigo-600 text-white px-10 py-4 rounded-xl hover:bg-indigo-700 transition-all font-bold shadow-lg shadow-indigo-100 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2 order-1 sm:order-2"
                >
                  {loading ? "Submitting..." : "Submit Doubt"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
