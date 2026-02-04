"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!name || !email || !password) return alert("Enter all fields");
    
    setIsLoading(true);
    const { error } = await supabase.from("users").insert([
      { name, email, password, is_admin: false },
    ]);

    if (error) {
      alert("Error creating account: " + error.message);
      setIsLoading(false);
    } else {
      alert("Account created! Please login");
      router.push("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 selection:bg-indigo-100">
      {/* Visual Accent */}
      <div className="absolute top-0 right-0 w-full h-1 bg-indigo-600"></div>

      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-indigo-100/40 w-full max-w-md border border-slate-100 transition-all">
        <div className="text-center mb-10">
        
          <h1 className="text-3xl font-black tracking-tight text-indigo-800">
            Join the Platform
          </h1>
          <p className="text-slate-600 mt-2 font-medium">
            Start your journey to academic clarity.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">Full Name</label>
            <Input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">Email Address</label>
            <Input
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">Secure Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        <Button
          onClick={handleRegister}
          disabled={isLoading}
          className="w-full bg-indigo-700 text-white py-4 rounded-xl hover:bg-indigo-800 shadow-lg shadow-indigo-200 transition-all font-bold text-lg mt-8 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating Account..." : "Register Now"}
        </Button>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-slate-500 text-center text-sm font-medium">
            Already a member?{" "}
            <a href="/login" className="text-indigo-700 font-bold hover:underline underline-offset-4 transition-all">
              Login to account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

