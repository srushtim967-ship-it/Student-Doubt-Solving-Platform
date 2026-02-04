"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function AdminSettings() {
  const [admin, setAdmin] = useState({ name: "", email: "" });
  
  // New System Settings State
  const [systemConfig, setSystemConfig] = useState({
    officeHours: true,
    autoArchive: false,
    minCharCount: 20,
    signature: "Regards, The Academic Team"
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.is_admin) {
      window.location.href = "/login";
    } else {
      setAdmin(user);
    }
  }, []);

  const handleToggle = (key) => {
    setSystemConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex min-h-screen bg-slate-50 selection:bg-indigo-100">
      
      {/* Admin Sidebar */}
      <aside className="w-72 bg-indigo-900 text-white p-8 flex flex-col hidden lg:flex">
        <div className="mb-10">
          <h2 className="text-xl font-black tracking-tighter text-indigo-400 uppercase">Admin Dashboard</h2>
          <p className="text-slate-500 text-xs font-bold mt-1 tracking-widest uppercase">Admin Management</p>
        </div>
        
        <nav className="flex flex-col gap-2 flex-1">
          <Link href="/admin" className="hover:bg-indigo-800 text-slate-400 px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-3">
             Dashboard
          </Link>
        
          
          <div className="bg-indigo-600/10 text-indigo-400 px-4 py-3 rounded-xl font-bold flex items-center gap-3 border border-indigo-600/20">
            <span>⚙️</span> Settings
          </div>
        </nav>

        <button 
          onClick={() => { localStorage.removeItem("user"); window.location.href="/login"; }}
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-3 rounded-xl font-bold transition-all text-center"
        >
          Sign Out
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-12 lg:ml-0">
        <div className="max-w-5xl mx-auto">
          <header className="mb-10">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">System <span className="text-indigo-700">Configuration</span></h1>
            <p className="text-slate-500 font-medium mt-1">Fine-tune how the platform handles student queries.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 space-y-8">
              
              {/* 1. Profile Management */}
              <section className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 p-8">
                <h3 className="text-lg font-black text-slate-800 mb-6 uppercase tracking-tighter">Admin Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Display Name</label>
                    <Input value={admin.name} onChange={(e) => setAdmin({...admin, name: e.target.value})} className="bg-slate-50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Default Signature</label>
                    <Input value={systemConfig.signature} onChange={(e) => setSystemConfig({...systemConfig, signature: e.target.value})} className="bg-slate-50" />
                  </div>
                </div>
              </section>

              {/* 2. Platform Logic */}
              <section className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 p-8">
                <h3 className="text-lg font-black text-slate-800 mb-6 uppercase tracking-tighter">System Rules</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div>
                      <h4 className="font-bold text-slate-800">Office Hours Mode</h4>
                      <p className="text-xs text-slate-500">When OFF, students see a "Tutors are away" message.</p>
                    </div>
                    <Toggle active={systemConfig.officeHours} onClick={() => handleToggle('officeHours')} />
                  </div>

                  <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div>
                      <h4 className="font-bold text-slate-800">Auto-Archive</h4>
                      <p className="text-xs text-slate-500">Hide answered doubts from the main list after 48 hours.</p>
                    </div>
                    <Toggle active={systemConfig.autoArchive} onClick={() => handleToggle('autoArchive')} />
                  </div>
                </div>
              </section>

            </div>

            {/* Right Column: Platform Health */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-indigo-700 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-200">
                <h3 className="text-xl font-black mb-4 uppercase tracking-tighter">Spam Protection</h3>
                <label className="text-[10px] font-black uppercase text-indigo-200 block mb-2">Min Question Length</label>
                <input 
                   type="number"
                   value={systemConfig.minCharCount}
                   onChange={(e) => setSystemConfig({...systemConfig, minCharCount: e.target.value})}
                   className="w-full bg-indigo-500 text-white border-none rounded-xl px-4 py-2 focus:ring-2 focus:ring-white/20 outline-none font-bold"
                />
                <p className="text-xs text-indigo-100 mt-4 leading-relaxed font-medium">
                  Prevents students from submitting short, low-quality questions like "help" or "??".
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-[2rem] p-8 text-center">
                 <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Database Connection</p>
                 <div className="flex items-center justify-center gap-2 text-emerald-500 font-bold">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    Supabase Active
                 </div>
              </div>
            </div>

          </div>

          <div className="mt-8 flex justify-end">
            <Button className="bg-indigo-700 text-white px-12 py-4 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 active:scale-95 transition-all">
              Save All Settings
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

// Simple Toggle Component
function Toggle({ active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-14 h-7 rounded-full transition-all flex items-center px-1 ${active ? 'bg-indigo-600' : 'bg-slate-300'}`}
    >
      <div className={`w-5 h-5 bg-white rounded-full transition-all transform ${active ? 'translate-x-7' : 'translate-x-0'}`} />
    </button>
  );
}