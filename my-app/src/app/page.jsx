"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-100 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* HERO SECTION */}
      <section className="bg-indigo-300 relative pt-24 pb-20 md:pt-32 md:pb-28 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-1.5 mb-8 text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full">
            Expert Academic Support
          </div>
          
          <h1 className="text-slate-950 text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            Student Doubt <br />
            <span className="text-indigo-600">Solving Platform</span>
          </h1>

          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Ask academic doubts, get clear answers, and learn smarter with a 
            simple and reliable platform designed for clarity.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <Button className="px-10 py-4 bg-indigo-700 text-white hover:bg-indigo-800 rounded-xl font-bold shadow-lg transition-all">
                Get Started
              </Button>
            </Link>

            <Link href="/login">
              <Button className="px-10 py-4 bg-indigo-700 text-white hover:bg-indigo-800 rounded-xl font-bold shadow-lg transition-all">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div className="max-w-xl text-left">
              <h2 className="text-slate-900 text-3xl md:text-4xl font-extrabold tracking-tight">
                Powerful features to help you <br /> master any subject.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              title="Ask Doubts Easily"
              desc="Post your academic doubts anytime and get clear explanations."
            />
            <FeatureCard
              title="Track Your Doubts"
              desc="View all your doubts and their answers in one place."
            />
            <FeatureCard
              title="Admin Moderation"
              desc="Ensures quality answers and a safe learning environment."
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-slate-900 text-3xl font-extrabold text-center mb-16">
            Simple 3-Step Process
          </h2>

          <div className="text-indigo-600 grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard number="1" title="Register or Login" />
            <StepCard number="2" title="Ask Your Doubt" />
            <StepCard number="3" title="Get Answers & Learn" />
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto bg-indigo-200 rounded-[2.5rem] p-10 md:p-20 text-center shadow-2xl shadow-indigo-100">
          <h2 className="text-gray-900 text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Ready to clear your doubts?
          </h2>
          <p className="text-slate-600 text-lg mb-10 max-w-sm mx-auto">
            Join our learning community today and never stay stuck again.
          </p>

          <Link href="/register">
            <Button className="px-8 py-4 bg-indigo-700 text-white hover:bg-indigo-800 rounded-xl font-bold shadow-lg transition-all">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <Card className="p-8 border border-slate-200 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mb-6 text-white text-xl">
        ✦
      </div>
      <h3 className="text-slate-900 text-xl font-bold mb-3 tracking-tight">{title}</h3>
      <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
    </Card>
  );
}

function StepCard({ number, title }) {
  return (
    <Card className="text-indigo-600 p-8 border-none bg-slate-50 rounded-2xl text-center group  ">
      <div className="text-indigo-800 text-3xl font-black mb-4">
        0{number}
      </div>
      <p className="text-slate-900 text-lg font-bold tracking-tight">{title}</p>
    </Card>
  );
}