"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { supabase } from "@/lib/supabaseClient";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  PlusCircle, 
  LogOut, 
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedUser || loggedUser.is_admin) {
      router.push("/login");
    } else {
      setUser(loggedUser);
      fetchDoubts(loggedUser.id);
    }
  }, [router]);

  const fetchDoubts = async (userId) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("doubts")
      .select("*")
      .eq("student_id", userId)
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching doubts:", error);
    else setDoubts(data || []);
    setLoading(false);
  };

  const total = doubts.length;
  const pending = doubts.filter(d => d.status === "pending").length;
  const answered = doubts.filter(d => d.status === "answered").length;

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 lg:p-12">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-1">
               <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                Student Dashboard
               </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Welcome back, <span className="text-indigo-700">{user?.name}</span> 👋
            </h1>
            <p className="text-slate-500 font-medium">Ready to conquer your academic goals today?</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              onClick={handleLogout}
              className="bg-red-500 flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-5 py-2.5 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all shadow-sm font-semibold"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard 
            icon={<MessageSquare className="text-indigo-600" />} 
            label="Total Doubts" 
            value={total} 
            gradient="from-indigo-500 to-indigo-600"
            lightColor="bg-indigo-50"
          />
          <StatCard 
            icon={<Clock className="text-amber-600" />} 
            label="Pending" 
            value={pending} 
            gradient="from-amber-500 to-amber-600"
            lightColor="bg-amber-50"
          />
          <StatCard 
            icon={<CheckCircle className="text-emerald-600" />} 
            label="Answered" 
            value={answered} 
            gradient="from-emerald-500 to-emerald-600"
            lightColor="bg-emerald-50"
          />
        </div>

        {/* Doubts Section */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                  <Sparkles size={20} />
               </div>
               <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Recent Doubts</h2>
            </div>
            
         
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 space-y-4">
                <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="text-slate-400 font-semibold tracking-wide">Syncing your learning data...</p>
              </div>
            ) : doubts.length === 0 ? (
              <div className="py-20 text-center">
                <div className="bg-slate-50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-12 group-hover:rotate-0 transition-transform">
                  <MessageSquare size={40} className="text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Clear Skies!</h3>
                <p className="text-slate-500 mt-2 max-w-xs mx-auto font-medium">
                  You don't have any doubts yet. Post a question to start learning.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {/* List Header (Hidden on Mobile) */}
                <div className="bg-slate-100 hidden md:grid grid-cols-12 px-6 py-3 text-md font-bold uppercase tracking-widest text-slate-400">
                  <div className="text-slate-800 col-span-6">The Question</div>
                  <div className="text-slate-800 col-span-2 text-center">Status</div>
                  <div className="text-slate-800 col-span-4">Mentor Feedback</div>
                </div>

                {/* Individual Doubt Rows */}
                {doubts.map((doubt) => (
                  <div 
                    key={doubt.id} 
                    className="grid grid-cols-1 md:grid-cols-12 items-center p-6 bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50/50 transition-all group"
                  >
                    <div className="col-span-6 mb-4 md:mb-0">
                      <p className="font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
                        {doubt.question}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-2 font-medium">Asked on {new Date(doubt.created_at).toLocaleDateString()}</p>
                    </div>

                    <div className="col-span-2 flex md:justify-center mb-4 md:mb-0">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        doubt.status === 'answered' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                          : 'bg-amber-50 text-amber-700 border-amber-100 animate-pulse'
                      }`}>
                        {doubt.status}
                      </span>
                    </div>

                    <div className="col-span-4 bg-slate-50/50 p-4 rounded-xl border border-dashed border-slate-200 group-hover:bg-white transition-colors">
                      <p className={`text-sm ${doubt.answer ? "text-slate-600 font-medium leading-relaxed" : "text-slate-400 italic"}`}>
                        {doubt.answer || "Expert is reviewing your doubt..."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, lightColor }) {
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 flex items-center gap-6 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 group">
      <div className={`p-5 rounded-2xl ${lightColor} transition-transform group-hover:scale-110 duration-300`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-400 text-xs font-black uppercase tracking-[0.15em] mb-1">{label}</p>
        <h3 className="text-4xl font-black text-slate-900 tabular-nums">{value}</h3>
      </div>
    </div>
  );
}
