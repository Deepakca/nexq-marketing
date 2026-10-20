// FILE: ./app/[exam]/page.tsx
"use client"; // Required for scroll events and Framer Motion

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EXAM_CONFIG } from "../../config/exams";
import Link from "next/link";
import { use } from "react";

// The 5 images mapped
const IMAGES = {
  heroPreview: "/images/hero-preview.jpg",
  consensusArchitecture: "/images/consensus-architecture.jpg",
  stepMarkingMacro: "/images/step-marking-macro.jpg",
  passChallengeBadge: "/images/pass-challenge-badge.jpg",
};

export default function StylishExamPage({ params }: { params: Promise<{ exam: string }> }) {
  // Unwrap Next.js 15 Promise params
  const { exam } = use(params);
  const data = EXAM_CONFIG[exam.toLowerCase()];

  // State to handle the collapsing right panel
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPanelForcedOpen, setIsPanelForcedOpen] = useState(false);

  // Detect scroll position to automatically collapse the login panel
  useEffect(() => {
    const handleScroll = () => {
      // Collapse when user scrolls past 150px
      if (window.scrollY > 150) {
        setIsScrolled(true);
        setIsPanelForcedOpen(false); // reset manual override
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!data) return <div className="p-20 text-white">Exam not found.</div>;

  const isPanelCollapsed = isScrolled && !isPanelForcedOpen;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex overflow-x-hidden">
      
      {/* ========================================== */}
      {/* LEFT PANEL: SCROLLING MARKETING CONTENT      */}
      {/* ========================================== */}
      <motion.div
        className="flex-1 min-h-screen pb-32"
        animate={{
          marginRight: isPanelCollapsed ? "4rem" : "30%", // 4rem = width of collapsed strip
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        {/* Header inside left panel */}
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
            <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl shadow-indigo-900/20 mt-12">
              <img src={IMAGES.heroPreview} alt="AI Grading" className="w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
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

          {/* SECTION 4: ₹1L CHALLENGE */}
          <section className="rounded-3xl bg-gradient-to-br from-emerald-950/40 to-slate-950 border border-emerald-500/30 p-12 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-black">ULTIMATE GUARANTEE</span>
              <h2 className="text-4xl font-black">The ₹1,00,000 Pass Challenge</h2>
              <p className="text-slate-400">Clear the NexQ mock benchmarks. Pass your official {data.examBody} exam, or claim up to ₹1 Lakh under the challenge guarantee.</p>
            </div>
            <div className="flex justify-center">
              <img src={IMAGES.passChallengeBadge} alt="Guarantee" className="w-64 h-64 rounded-2xl shadow-2xl shadow-emerald-900/50" />
            </div>
          </section>

        </div>
      </motion.div>

      {/* ========================================== */}
      {/* RIGHT PANEL: STICKY LOGIN / ENROLL PANE    */}
      {/* ========================================== */}
      <AnimatePresence initial={false}>
        <motion.div
          className="fixed top-0 right-0 h-screen bg-slate-900 border-l border-slate-800 shadow-2xl z-50 flex flex-col"
          initial={false}
          animate={{
            width: isPanelCollapsed ? "4rem" : "30%",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          {/* STATE A: COLLAPSED STRIP */}
          {isPanelCollapsed ? (
            <div 
              className="w-full h-full flex items-center justify-center cursor-pointer hover:bg-slate-800 transition-colors group relative"
              onClick={() => setIsPanelForcedOpen(true)}
            >
              <div className="absolute top-6 w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <div className="rotate-90 whitespace-nowrap text-sm font-black tracking-widest text-slate-400 group-hover:text-indigo-400 transition-colors">
                ▶ OPEN {data.examBody} LOGIN
              </div>
            </div>
          ) : (
            
          /* STATE B: FULL OPEN LOGIN/ENROLL PANE */
            <div className="w-full h-full flex flex-col p-8 lg:p-12 overflow-y-auto">
              
              {/* Optional Close Button on Mobile/Scrolled */}
              {isScrolled && (
                <button 
                  onClick={() => setIsPanelForcedOpen(false)}
                  className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}

              <div className="mt-auto mb-12 space-y-8">
                <div>
                  <span className="text-xs font-mono text-indigo-400 block mb-2">{data.examBody} ARENA GATEWAY</span>
                  <h2 className="text-3xl font-black">Enter Arena</h2>
                </div>

                {data.activeCampaign?.enabled && (
                  <div className="p-4 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-200 text-sm font-bold">
                    {data.activeCampaign.bannerText}
                  </div>
                )}

                {/* Mock Login Form / Call to Action */}
                <div className="space-y-4">
                  <a 
                    href={data.checkoutUrl}
                    className="w-full flex items-center justify-center py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-black shadow-lg shadow-indigo-600/20 transition-all"
                  >
                    Enroll Now — {data.pricing}
                  </a>
                  <a 
                    href={`https://app.nexqai.in/login?exam=${data.slug}`}
                    className="w-full flex items-center justify-center py-4 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl font-bold text-slate-300 transition-all"
                  >
                    Already Enrolled? Sign In
                  </a>
                </div>
                
                <p className="text-xs text-center text-slate-500 pt-4">
                  Secured by NexQ AI 256-bit encryption.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

    </div>
  );
}