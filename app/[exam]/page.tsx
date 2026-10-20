// FILE: ./app/[exam]/page.tsx
"use client";

import { useState, use } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { EXAM_CONFIG } from "../../config/exams";
import Link from "next/link";

const IMAGES = {
  heroPreview: "/images/hero-preview.jpg",
  consensusArchitecture: "/images/consensus-architecture.jpg",
  stepMarkingMacro: "/images/step-marking-macro.jpg",
  passChallengeBadge: "/images/pass-challenge-badge.jpg",
};

export default function StylishExamPage({ params }: { params: Promise<{ exam: string }> }) {
  const { exam } = use(params);
  const data = EXAM_CONFIG[exam.toLowerCase()];

  // 1. Hook into the window's scroll position
  const { scrollY } = useScroll();

  // 2. Map scroll pixels (0 to 600px) directly to CSS values (1:1 with scroll speed)
  const panelWidth = useTransform(scrollY, [0, 600], ["30%", "4rem"]);
  const leftMargin = useTransform(scrollY, [0, 600], ["30%", "4rem"]);
  
  // Fade out the login form as they scroll down
  const formOpacity = useTransform(scrollY, [0, 350], [1, 0]);
  // Fade in the vertical "OPEN LOGIN" text as it fully collapses
  const textOpacity = useTransform(scrollY, [450, 600], [0, 1]);

  // State to handle manual override if they click the collapsed strip to reopen it
  const [isScrolledPast, setIsScrolledPast] = useState(false);
  const [isPanelForcedOpen, setIsPanelForcedOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"email" | "phone" | "register">("email");

  // Track scroll to manage pointer-events (clicks) safely
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 350) {
      if (!isScrolledPast) setIsScrolledPast(true);
    } else {
      if (isScrolledPast) setIsScrolledPast(false);
      if (isPanelForcedOpen) setIsPanelForcedOpen(false); // Auto-reset manual open if they scroll to top
    }
  });

  if (!data) return <div className="p-20 text-white">Exam not found.</div>;

  return (
    <div className="min-h-screen bg-[#060813] text-white flex overflow-x-hidden">
      
      {/* ========================================== */}
      {/* LEFT PANEL: SCROLLING MARKETING CONTENT      */}
      {/* ========================================== */}
      <motion.div
        className="flex-1 min-h-screen pb-32"
        style={{ marginRight: isPanelForcedOpen ? undefined : leftMargin }}
        animate={{ marginRight: isPanelForcedOpen ? "30%" : undefined }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <header className="p-6 flex justify-between items-center max-w-5xl mx-auto">
          <Link href="/" className="font-black text-xl flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">N</div>
            NexQ AI
          </Link>
          <span className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-xs font-mono text-slate-300">
            {data.examBody} Arena
          </span>
        </header>

        <div className="max-w-5xl mx-auto px-8 sm:px-12 space-y-32 mt-12">
          {/* SECTION 1: HERO */}
          <section className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Live 60-Second Evaluation
            </div>
            <h1 className="text-5xl sm:text-7xl font-black leading-[1.05] tracking-tight">
              {data.title}
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
              {data.description}
            </p>
            <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl mt-12">
              <img src={IMAGES.heroPreview} alt="AI Grading" className="w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060813] to-transparent" />
            </div>
          </section>

          {/* SECTION 2: RED PEN ENGINE */}
          <section className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-rose-400 font-bold tracking-widest text-sm uppercase">Red-Pen Engine</span>
              <h2 className="text-4xl font-black">Step Marking & Working Notes Verified.</h2>
              <p className="text-slate-400 leading-relaxed">
                You don't just lose marks on the final total. Our OCR engine inspects every intermediate working note, formula, ledger adjustment, and statutory citation—awarding partial marks exactly like an official examiner.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
              <img src={IMAGES.stepMarkingMacro} alt="Step Marking" className="w-full h-auto" />
            </div>
          </section>

          {/* SECTION 3: FEATURES BENTO */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black">Calibrated to the {data.examBody} Blueprint</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {data.features.map((feature: string, idx: number) => (
                <div key={idx} className="p-8 bg-slate-900 border border-slate-800 rounded-3xl hover:border-indigo-500 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-black mb-4">✓</div>
                  <h3 className="text-lg font-bold">{feature}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 4: CHALLENGE */}
          <section className="rounded-3xl bg-gradient-to-br from-emerald-950/40 to-slate-950 border border-emerald-500/30 p-12 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-black">ULTIMATE GUARANTEE</span>
              <h2 className="text-4xl font-black">The ₹1,00,000 Pass Challenge</h2>
              <p className="text-slate-400">Clear the NexQ mock benchmarks. Pass your official {data.examBody} exam, or claim up to ₹1 Lakh under the challenge guarantee.</p>
            </div>
            <div className="flex justify-center">
              <img src={IMAGES.passChallengeBadge} alt="Guarantee" className="w-64 h-64 rounded-2xl shadow-2xl" />
            </div>
          </section>
        </div>
      </motion.div>

      {/* ========================================== */}
      {/* RIGHT PANEL: SCROLL-SYNCED LOGIN UI          */}
      {/* ========================================== */}
      <motion.div
        className="fixed top-0 right-0 h-screen bg-[#0C1222] border-l border-slate-800/80 shadow-2xl z-50 flex flex-col overflow-hidden"
        style={{ width: isPanelForcedOpen ? undefined : panelWidth }}
        animate={{ width: isPanelForcedOpen ? "30%" : undefined }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* The Vertical "▶ OPEN LOGIN" Strip (Fades in on scroll) */}
        {/* The Vertical "▶ OPEN LOGIN" Strip (Fades in on scroll) */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer hover:bg-slate-800 transition-colors group z-10"
          style={{ 
            opacity: isPanelForcedOpen ? 0 : textOpacity,
            pointerEvents: isScrolledPast && !isPanelForcedOpen ? "auto" : "none"
          }}
          animate={{ opacity: isPanelForcedOpen ? 0 : undefined }}
          onClick={() => setIsPanelForcedOpen(true)}
        >
          <div className="absolute top-6 w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <div className="rotate-90 whitespace-nowrap text-sm font-black tracking-widest text-slate-400 group-hover:text-indigo-400 transition-colors">
            ▶ OPEN LOGIN
          </div>
        </motion.div>

        {/* The Full Login Form (Fades out on scroll) */}
        <motion.div 
          className="absolute top-0 right-0 h-full w-[30vw] min-w-[400px] flex flex-col items-center justify-center p-8 z-20"
          style={{ 
            opacity: isPanelForcedOpen ? undefined : formOpacity,
            pointerEvents: isPanelForcedOpen || !isScrolledPast ? "auto" : "none"
          }}
          animate={{ opacity: isPanelForcedOpen ? 1 : undefined }}
        >
          
          {isPanelForcedOpen && (
            <button 
              onClick={() => setIsPanelForcedOpen(false)}
              className="absolute top-6 left-6 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}

          {/* Login Container exact matching the screenshot */}
          <div className="w-full max-w-[380px] bg-[#12182B] border border-slate-800 rounded-3xl p-6 shadow-2xl">
            
            {/* 3-Way Tab Switcher */}
            <div className="flex bg-[#060813] rounded-xl p-1 mb-8">
              <button onClick={() => setAuthTab("email")} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${authTab === "email" ? "bg-[#5B4BFF] text-white" : "text-slate-400 hover:text-slate-200"}`}>
                Email
              </button>
              <button onClick={() => setAuthTab("phone")} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${authTab === "phone" ? "bg-[#5B4BFF] text-white" : "text-slate-400 hover:text-slate-200"}`}>
                Phone OTP
              </button>
              <button onClick={() => setAuthTab("register")} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${authTab === "register" ? "bg-[#5B4BFF] text-white" : "text-slate-400 hover:text-slate-200"}`}>
                Register
              </button>
            </div>

            <form className="space-y-5">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">Email Address</label>
                <div className="flex items-center gap-3 px-4 py-3 bg-[#060813] border border-slate-800 rounded-xl focus-within:border-indigo-500 transition-colors">
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  <input type="email" placeholder="scholar@domain.com" className="bg-transparent w-full text-sm text-white placeholder-slate-600 outline-none" />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-400">Password</label>
                  <a href="#" className="text-xs text-[#5B4BFF] hover:underline">Forgot?</a>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 bg-[#060813] border border-slate-800 rounded-xl focus-within:border-indigo-500 transition-colors">
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  <input type="password" placeholder="••••••••••••" className="bg-transparent w-full text-sm text-white tracking-widest placeholder-slate-600 outline-none" />
                </div>
              </div>

              {/* Main Sign In Button */}
              <button type="button" className="w-full py-3.5 mt-2 bg-[#5B4BFF] hover:bg-[#4b3de3] rounded-xl text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all">
                Sign In
              </button>
            </form>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-slate-800"></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Or Continue With</span>
              <div className="flex-1 h-px bg-slate-800"></div>
            </div>

            {/* Google Sign In Replica */}
            <button type="button" className="w-full flex items-center justify-between px-4 py-3 bg-[#1A73E8] hover:bg-blue-600 rounded-xl transition-colors">
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-white">Sign in with Google</span>
              </div>
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              </div>
            </button>

            {/* Institute Admin Link */}
            <a href="https://app.nexqai.in/institute/login" className="block text-center mt-8 text-[11px] text-[#5B4BFF] hover:text-indigo-400 transition-colors">
              Institute or Organization Admin? Log in here →
            </a>

          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}