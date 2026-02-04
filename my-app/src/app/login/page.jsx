"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    // Fetch user from Supabase
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password);

    if (error) {
      console.error("Login error:", error);
      alert("Login failed: " + error.message);
      setIsLoading(false);
      return;
    }

    if (!data || data.length === 0) {
      alert("Invalid email or password");
      setIsLoading(false);
      return;
    }

    const user = data[0];

    // Store user in localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        is_admin: user.is_admin,
      })
    );

    // Redirect logic strictly preserved
    if (user.is_admin) {
      window.location.href = "/admin";
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 selection:bg-indigo-100">
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600"></div>
      
      <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-indigo-100/50 w-full max-w-md border border-slate-500">
        <div className="text-center mb-10">
          
          <h1 className="text-3xl font-black tracking-tight text-indigo-800">
            Welcome Back
          </h1>
          <p className="text-slate-600 mt-2 font-medium">
            Login to continue your learning journey
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">Email Address</label>
            <Input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all"
            />
          </div>
        </div>

        <Button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-indigo-700 text-white py-4 rounded-xl hover:bg-indigo-800 shadow-lg shadow-indigo-200 transition-all font-bold text-lg mt-8 active:scale-[0.98] disabled:opacity-70"
        >
          {isLoading ? "Logging..." : "Login to Dashboard"}
        </Button>

        <p className="text-slate-500 mt-8 text-center text-sm font-medium">
          Don't have an account?{" "}
          <a href="/register" className="text-indigo-700 font-bold hover:underline underline-offset-4">
            Create
          </a>
        </p>
      </div>
    </div>
  );
}
