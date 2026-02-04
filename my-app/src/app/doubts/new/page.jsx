"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Sidebar from "@/components/Sidebar";
import Button from "@/components/ui/Button";

export default function NewDoubtPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="flex min-h-screen bg-slate-50 selection:bg-indigo-100">
      <Sidebar />

      {/* Adjusted margin to match Sidebar width */}
      <main className="flex-1 p-6 md:p-12 lg:ml-64">
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Input Area */}
            <div className="lg:col-span-2">
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

                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-400 font-medium">
                    {question.length} characters entered
                  </p>
                  <Button
                    onClick={handleSubmit}
                    disabled={loading || !question.trim()}
                    className="bg-indigo-600 text-white px-10 py-4 rounded-xl hover:bg-indigo-700 transition-all font-bold shadow-lg shadow-indigo-100 disabled:opacity-50 disabled:shadow-none flex items-center gap-2"
                  >
                    {loading ? "Submitting..." : "Submit Doubt"}
                  </Button>
                </div>
              </div>
            </div>

            

          </div>
        </div>
      </main>
    </div>
  );
}

