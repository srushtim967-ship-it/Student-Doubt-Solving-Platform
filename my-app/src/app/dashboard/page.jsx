"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Button from "@/components/ui/Button";
import { 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  LogOut, 
  Sparkles,
  MoreVertical, 
  X            
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

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
    <div className="flex min-h-screen bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900 relative overflow-x-hidden">
      
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
          <div className="bg-indigo-600 text-white px-4 py-3 rounded-xl font-bold flex items-center gap-3 border border-indigo-400/20">
            <span>📊</span> Dashboard
          </div>
          <Link href="/doubts" className="hover:bg-indigo-700 text-indigo-100 px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-3">
            <span>❓</span> Doubts
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className={`
        flex-1 p-6 md:p-10 lg:p-12 transition-all duration-300
        ${isSidebarOpen ? "md:ml-64 opacity-50 md:opacity-100" : "ml-0"}
        pl-20 md:pl-24 /* This keeps the header/content away from the floating button */
      `}>
        
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
            lightColor="bg-indigo-50"
          />
          <StatCard 
            icon={<Clock className="text-amber-600" />} 
            label="Pending" 
            value={pending} 
            lightColor="bg-amber-50"
          />
          <StatCard 
            icon={<CheckCircle className="text-emerald-600" />} 
            label="Answered" 
            value={answered} 
            lightColor="bg-emerald-50"
          />
        </div>

        {/* Doubts List Section */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          {/* ... keeping your existing table/list logic exactly the same ... */}
          <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                   <Sparkles size={20} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Recent Doubts</h2>
             </div>
          </div>
          <div className="p-6 text-slate-600">
            {loading ? "Loading doubts..." : doubts.length === 0 ? "No doubts found." : (
                <div className="space-y-4">
                   {/* Map through doubts here as per your original code */}
                   {doubts.map(doubt => (
                     <div key={doubt.id} className="p-4 border rounded-xl">{doubt.question}</div>
                   ))}
                </div>
            )}
          </div>
        </div>
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
