// FILE: ./app/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

// Central map of your 5 generated images in public/images/
const IMAGES = {
  heroPreview: "/images/hero-preview.jpg",
  consensusArchitecture: "/images/consensus-architecture.jpg",
  stepMarkingMacro: "/images/step-marking-macro.jpg",
  passChallengeBadge: "/images/pass-challenge-badge.jpg",
  coachingDashboard: "/images/coaching-dashboard.jpg",
};

export default function MarketingHome() {
  // Dynamically resolve URLs based on the environment
  const isDev = process.env.NODE_ENV === "development";
  const rootDomain = isDev ? "localhost:3000" : "nexqai.in";
  const protocol = isDev ? "http://" : "https://";

  // The Core App Gateway URL
  const APP_URL = `${protocol}app.${rootDomain}`;



  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"ca" | "cs" | "cma" | "upsc">("ca");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const streams = [
    {
      slug: "ca",
      name: "CA Final & Inter",
      badge: "₹1L Pass Challenge Active",
      badgeStyle: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      borderHover: "hover:border-indigo-500 hover:shadow-indigo-500/10",
      rubric: "ICAI 30:70 Hybrid Scheme",
      desc: "ICAI 30:70 Hybrid + Red-Pen Step Marking & ₹1L Pass Challenge. Evaluates Ind AS, SA citations, and working notes in 60s.",
      highlights: ["Ind AS & SA Citation Audit", "Step-Wise Working Note Marks", "₹1L Pass Guarantee Track"],
    },
    {
      slug: "cs",
      name: "CS Executive & Professional",
      badge: "ICSI Case-Law Engine",
      badgeStyle: "bg-purple-500/15 text-purple-300 border-purple-500/30",
      borderHover: "hover:border-purple-500 hover:shadow-purple-500/10",
      rubric: "ICSI Drafting & Precedent Rubric",
      desc: "ICSI Case-Law & Drafting Rubric Evaluation in 60s. Checks board resolutions, legal language, and NCLT/SC citations.",
      highlights: ["Resolution Format Grader", "Companies Act Section Check", "Case-Law Precedent Matcher"],
    },
    {
      slug: "cma",
      name: "CMA Inter & Final",
      badge: "Step-Wise Numerical Grader",
      badgeStyle: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      borderHover: "hover:border-amber-500 hover:shadow-amber-500/10",
      rubric: "ICMAI Costing & Numerical Scheme",
      desc: "ICMAI Step-Wise Numerical & Working Note Grader. Awards partial step marks even when final balance totals diverge.",
      highlights: ["Cost Sheet Formula Audit", "Variance Step Marking", "CAS Standard Verification"],
    },
    {
      slug: "upsc",
      name: "UPSC CSE Mains & Prelims",
      badge: "GS I-IV & Essay Evaluator",
      badgeStyle: "bg-sky-500/15 text-sky-300 border-sky-500/30",
      borderHover: "hover:border-sky-500 hover:shadow-sky-500/10",
      rubric: "UPSC 150/250-Word Structural Rubric",
      desc: "GS I-IV 250-Word Structural & Multidimensional Grader. Audits directive command words, intro, body, and way forward.",
      highlights: ["Directive Word Alignment", "Multidimensional Coverage", "Topper Benchmark Comparison"],
    },
  ];

  const sampleEvaluations = {
    ca: {
      paper: "CA Final Paper 1: Financial Reporting (Ind AS 16)",
      score: "16.5 / 20",
      consensus: "98.4% 3-Model Agreement",
      extract:
        "As per Ind AS 16 'Property, Plant and Equipment', initial dismantling and restoration costs must be capitalized at present value using the pre-tax discount rate...",
      steps: [
        { title: "Step 1: Accounting Standard Citation", feedback: "+1.5 Marks — Ind AS 16 provision & para reference accurately stated.", positive: true },
        { title: "Step 2: Working Note 2 (PV of Decommissioning)", feedback: "+2.0 Marks — Discounting factor and initial carrying cost verified.", positive: true },
        { title: "Step 3: Subsequent Depreciation Schedule", feedback: "-0.5 Marks — Unwinding of discount under Ind AS 37 finance cost omitted.", positive: false },
      ],
    },
    cs: {
      paper: "CS Executive: Company Law & Practice (Sec 185/186)",
      score: "4.0 / 5.0",
      consensus: "97.9% 3-Model Agreement",
      extract:
        "RESOLVED THAT pursuant to Section 186(2) of the Companies Act, 2013, unanimous consent of the Board and prior Special Resolution is required where loan exceeds 60% of paid-up share capital...",
      steps: [
        { title: "Step 1: Statutory Threshold Check", feedback: "+1.5 Marks — 60% Paid-up Capital & 100% Free Reserves limit accurately cited.", positive: true },
        { title: "Step 2: Resolution Drafting Structure", feedback: "+1.5 Marks — Operative clause & SS-1 board approval condition matched.", positive: true },
        { title: "Step 3: Public Financial Institution Notice", feedback: "-1.0 Marks — Missed prior PFI approval condition in case of subsisting default.", positive: false },
      ],
    },
    cma: {
      paper: "CMA Final: Strategic Cost Management (Transfer Pricing)",
      score: "8.5 / 10",
      consensus: "99.1% 3-Model Agreement",
      extract:
        "Minimum Transfer Price = Marginal Cost (₹45/unit) + Opportunity Cost of foregone external sales (₹15/unit) = ₹60.00 per unit...",
      steps: [
        { title: "Step 1: Minimum Transfer Price Formula", feedback: "+2.5 Marks — MC + Opportunity Cost formulation verified.", positive: true },
        { title: "Step 2: Capacity Constraint Working Note", feedback: "+4.0 Marks — Spare capacity vs external demand trade-off table accurate.", positive: true },
        { title: "Step 3: Goal Congruence Conclusion", feedback: "-1.5 Marks — Divisional profit impact on Division B ROI not quantified.", positive: false },
      ],
    },
    upsc: {
      paper: "UPSC CSE Mains GS-II: Indian Constitution & Federalism",
      score: "6.5 / 10",
      consensus: "Topper Percentile: Top 4%",
      extract:
        "While Article 280 envisages the Finance Commission as the balancing wheel of fiscal federalism, the rising share of non-divisible cesses and surcharges has shrunk the divisible pool...",
      steps: [
        { title: "Introduction & Constitutional Anchor", feedback: "+1.5 Marks — Crisp opening anchored in Article 280 & 15th FC data.", positive: true },
        { title: "Multidimensional Body (Fiscal + Administrative)", feedback: "+3.5 Marks — Both vertical asymmetry and horizontal equity criteria analyzed.", positive: true },
        { title: "Way Forward & Committee Citation", feedback: "-1.0 Marks — Add Sarkaria/Punchhi Commission recommendation on cess sunset clauses.", positive: false },
      ],
    },
  };

  const faqs = [
    {
      q: "Why does NexQ AI use a 3-Model Consensus Engine instead of a single AI model?",
      a: "Single AI chatbots (like generic ChatGPT) suffer from grading drift and hallucinated marks. NexQ AI routes your handwritten answer sheet through three specialized models simultaneously: Model A checks statutory provisions and accounting standards, Model B verifies step-by-step calculations and working notes, and Model C matches your structure against official ICAI, ICSI, ICMAI, and UPSC rubrics. All three models merge into one verified Consensus Score.",
    },
    {
      q: "How does the ₹1,00,000 Pass Challenge work for CA Final & Inter?",
      a: "When you enroll in the CA Pass Challenge Track, you receive a structured schedule of full-length mock test papers. Upload your handwritten sheets, review your 60-second Red-Pen step evaluations, and maintain the benchmark pass score across the test series. If you complete the challenge protocol and do not clear your official ICAI exam, you qualify for up to ₹1,00,000 under the challenge guarantee terms.",
    },
    {
      q: "Does NexQ AI award step marks for working notes even if my final balance sheet total is wrong?",
      a: "Yes. Unlike basic answer keys that only check the final figure, our Red-Pen Step Marking engine inspects every intermediate working note, formula, ledger adjustment, and Ind AS / Section citation—awarding partial marks exactly like an official examiner.",
    },
    {
      q: "How can coaching institutes use the Coaching Portal?",
      a: "Coaching classes and test series providers can log into the NexQ AI Institute Portal to bulk-upload hundreds of student handwritten PDFs at once. The engine grades entire batches in minutes using official or custom faculty rubrics, providing cohort bell curves and weak-topic analytics.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
      {/* ================================================================= */}
      {/* TOP ANNOUNCEMENT BAR                                              */}
      {/* ================================================================= */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-emerald-950 border-b border-indigo-500/20 py-2.5 px-4 text-center text-xs sm:text-sm">
        <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 mr-2">
          ₹1 LAKH PASS CHALLENGE
        </span>
        <span className="text-slate-200 font-medium">
          Practice with our 3-Model Consensus AI Grader — Pass your exam or claim up to ₹1,00,000.
        </span>
        <a
          href="#pass-challenge"
          className="ml-2 font-bold text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
        >
          See Challenge Details →
        </a>
      </div>

      {/* ================================================================= */}
      {/* STICKY HEADER WITH DIRECT ARENA JUMP PILLS                        */}
      {/* ================================================================= */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center py-4 px-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center font-black shadow-lg shadow-indigo-600/30 group-hover:bg-indigo-500 transition-colors">
                N
              </div>
              <span className="text-xl font-black tracking-tight">
                NexQ <span className="text-indigo-400">AI</span>
              </span>
            </Link>

            {/* Quick Portal Links for Returning Students */}
            <nav className="hidden lg:flex items-center gap-1.5 pl-4 border-l border-slate-800">
              {streams.map((s) => (
                <a
                  key={s.slug}
                  href={`${protocol}${s.slug}.${rootDomain}`}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
                >
                  {s.slug.toUpperCase()} Arena
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`${APP_URL}/institute/login`}
              className="hidden md:inline-flex px-4 py-2 text-xs sm:text-sm font-bold text-indigo-400 border border-indigo-500/30 rounded-xl hover:bg-indigo-950/40 transition-colors"
            >
              Coaching Portal
            </Link>
            <Link
              href={`${APP_URL}/login`}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-lg shadow-indigo-600/20"
            >
              Student Sign In
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ================================================================= */}
        {/* WINDOW 1: CINEMATIC HERO + IMAGE 1 (HERO PREVIEW) + VIDEO MODAL   */}
        {/* ================================================================= */}
        <section className="relative overflow-hidden pt-12 pb-20 px-6 border-b border-slate-900">
          {/* Ambient Top Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-indigo-600/15 blur-[130px] pointer-events-none -z-10" />

          <div className="max-w-6xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              3-Model Consensus AI Exam Engine • Evaluation in 60s
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight max-w-5xl mx-auto">
              Stop Waiting 14 Days for Test Series Feedback.{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-300 bg-clip-text text-transparent">
                Grade Handwritten Answers in 60s.
              </span>
            </h1>

            <p className="text-slate-400 max-w-3xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed">
              Upload photos of your handwritten CA, CS, CMA, or UPSC answer sheets. Get instant{" "}
              <strong className="text-slate-200">Red-Pen Step Marking</strong>, working note verification, and official
              rubric feedback—backed by our <strong className="text-emerald-400">₹1,00,000 Pass Challenge</strong>.
            </p>

            {/* Primary Hero CTAs */}
            <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
              <a
                href="#exam-arenas"
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-sm sm:text-base font-black text-white shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02]"
              >
                Select Your Exam Arena ↓
              </a>
              <button
                onClick={() => setIsVideoOpen(true)}
                className="px-6 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-2xl text-sm sm:text-base font-bold text-slate-200 flex items-center gap-3 transition-all cursor-pointer"
              >
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-black">
                  ▶
                </span>
                Watch ₹1L Challenge & AI Demo (0:30)
              </button>
            </div>

            {/* IMAGE 1 CONTAINER: HERO TABLET + VIDEO TRIGGER */}
            <div className="mt-12 max-w-5xl mx-auto">
              <div
                onClick={() => setIsVideoOpen(true)}
                className="group relative rounded-3xl p-2 bg-gradient-to-b from-indigo-500/30 via-slate-800 to-slate-900 border border-indigo-500/30 shadow-2xl shadow-indigo-950/60 cursor-pointer overflow-hidden"
              >
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950">
                  {/* Asset 1: Hero Preview Image */}
                  <img
                    src={IMAGES.heroPreview}
                    alt="NexQ AI Handwritten Exam Evaluation Interface"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  />

                  {/* Subtle Dark Edge Vignette (Cleanly masks any tiny corner artifacts and boosts contrast) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-slate-950/60" />

                  {/* Top-Left Brand Badge Overlay (Covers top-left corner of tablet cleanly) */}
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap items-center gap-2 z-10">
                    <div className="bg-slate-950/90 backdrop-blur-md border border-indigo-500/40 px-3.5 py-1.5 rounded-xl flex items-center gap-2 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-black tracking-wide text-white">NEXQ AI LIVE ENGINE</span>
                    </div>
                    <div className="hidden sm:flex bg-slate-950/85 backdrop-blur-md border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-mono text-indigo-300">
                      ICAI • ICSI • ICMAI • UPSC
                    </div>
                  </div>

                  {/* Center Pulsing Play Button */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-indigo-600/95 group-hover:bg-indigo-500 text-white flex items-center justify-center text-3xl shadow-2xl shadow-indigo-600/60 border-4 border-white/20 transition-all group-hover:scale-110">
                      ▶
                    </div>
                    <span className="mt-4 px-4 py-1.5 rounded-full bg-slate-950/90 border border-indigo-500/40 text-xs sm:text-sm font-bold text-indigo-200 shadow-lg">
                      Click to Watch 30-Second Founder Demo & ₹1L Pass Challenge
                    </span>
                  </div>

                  {/* Bottom Live Metrics Strip */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap justify-between items-center gap-2 bg-slate-950/90 backdrop-blur-md border border-slate-800 px-4 py-3 rounded-2xl text-xs z-10">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                        STEP MARKING VERIFIED
                      </span>
                      <span className="text-slate-300 hidden md:inline">
                        Ind AS 16 + Working Note 2 Checked in 58.2 Seconds
                      </span>
                    </div>
                    <span className="font-mono font-bold text-indigo-400">3-Model Consensus: 98.4%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* WINDOW 2: THE 4 EXAM ARENA CARDS (IMMEDIATE STUDENT CONVERSION)   */}
        {/* ================================================================= */}
        <section id="exam-arenas" className="py-20 px-6 max-w-6xl mx-auto w-full space-y-12">
          <div className="text-center space-y-4">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Dedicated Exam Portals
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">Select Your Exam Arena</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
              Each portal is calibrated to official examining body rubrics, past topper sheets, and step-marking schemes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 text-left">
            {streams.map((s) => (
              <a
                key={s.slug}
                href={`${protocol}${s.slug}.${rootDomain}`}
                className={`p-8 rounded-3xl bg-slate-900/90 border border-slate-800 ${s.borderHover} transition-all duration-300 group shadow-2xl flex flex-col justify-between hover:-translate-y-1`}
              >
                <div>
                  <div className="flex justify-between items-center gap-2 mb-4">
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${s.badgeStyle}`}>
                      {s.badge}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-lg border border-indigo-500/20">
                      {s.slug}.{rootDomain}
                    </span>
                  </div>

                  <div className="text-2xl font-black group-hover:text-indigo-400 transition-colors flex justify-between items-center">
                    {s.name}
                    <span className="inline-block transition-transform group-hover:translate-x-1.5 text-indigo-500 text-2xl">
                      →
                    </span>
                  </div>

                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-400/80 mt-1">{s.rubric}</p>
                  <p className="text-sm text-slate-400 mt-3 leading-relaxed">{s.desc}</p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {s.highlights.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium bg-slate-950 text-slate-300 px-2.5 py-1 rounded-md border border-slate-800"
                      >
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-indigo-400">
                    <span className="group-hover:underline">Launch {s.slug.toUpperCase()} Portal</span>
                    <span className="text-slate-500 font-normal">Instant 60s Grading →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ================================================================= */}
        {/* WINDOW 3: VISUAL BENTO GRID (IMAGES 2 & 3) + INTERACTIVE DEMO     */}
        {/* ================================================================= */}
        <section className="py-20 px-6 bg-slate-900/40 border-y border-slate-800/80">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Inside the AI Grading Engine
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
                Why Students Trust NexQ AI Over Generic Chatbots
              </h2>
              <p className="text-slate-400 text-base sm:text-lg">
                Built specifically for handwritten Indian professional and civil service exams—never miss step marks or
                working note credit again.
              </p>
            </div>

            {/* BENTO GRID WITH IMAGE 2 (CONSENSUS) & IMAGE 3 (STEP MARKING MACRO) */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Bento Card 1: Image 2 (3-Model Consensus Architecture) */}
              <div className="rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex flex-col justify-between">
                <div className="relative aspect-video w-full bg-slate-900 overflow-hidden border-b border-slate-800">
                  <img
                    src={IMAGES.consensusArchitecture}
                    alt="NexQ AI 3-Model Consensus Architecture Diagram"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-950/90 text-indigo-300 border border-indigo-500/30">
                    ZERO-HALLUCINATION ARCHITECTURE
                  </span>
                </div>
                <div className="p-8 space-y-3">
                  <h3 className="text-2xl font-black text-white">3-Model Consensus AI Exam Engine</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Your handwritten answer sheet is never graded by a single AI opinion. Three independent evaluator
                    nodes audit <strong className="text-slate-200">Statutory Law (Model A)</strong>,{" "}
                    <strong className="text-slate-200">Working Notes & Calculations (Model B)</strong>, and{" "}
                    <strong className="text-slate-200">Official ICAI/UPSC Rubrics (Model C)</strong> before merging into
                    a verified Consensus Score.
                  </p>
                </div>
              </div>

              {/* Bento Card 2: Image 3 (Red-Pen Step Marking Macro) */}
              <div className="rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex flex-col justify-between">
                <div className="relative aspect-video w-full bg-slate-900 overflow-hidden border-b border-slate-800">
                  <img
                    src={IMAGES.stepMarkingMacro}
                    alt="Red-Pen Step Marking on Handwritten CA Balance Sheet"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold bg-rose-950/90 text-rose-300 border border-rose-500/40">
                    RED-PEN STEP MARKING
                  </span>
                </div>
                <div className="p-8 space-y-3">
                  <h3 className="text-2xl font-black text-white">Line-by-Line Step & Working Note Grader</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    In CA, CS, and CMA, you earn crucial marks for intermediate steps, Ind AS citations, and working
                    notes even if your final balance sheet total doesn’t tally. Our Red-Pen OCR pinpoints exact
                    deductions and awards step-wise credit in 60 seconds.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Tab Switcher: Live Rubric Breakdown */}
            <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
                <div>
                  <span className="text-xs font-mono uppercase text-indigo-400 block">
                    Interactive Rubric Inspector
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    Preview a Sample 60-Second Evaluation
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(["ca", "cs", "cma", "upsc"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all cursor-pointer ${
                        activeTab === tab
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                          : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
                      }`}
                    >
                      {tab} Sample
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                    <span>{sampleEvaluations[activeTab].paper}</span>
                    <span className="text-emerald-400 font-bold">{sampleEvaluations[activeTab].consensus}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    "{sampleEvaluations[activeTab].extract}"
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs text-slate-400">Awarded Consensus Score:</span>
                    <span className="px-4 py-1.5 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 font-black text-lg">
                      {sampleEvaluations[activeTab].score}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {sampleEvaluations[activeTab].steps.map((step, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-2xl border text-xs sm:text-sm ${
                        step.positive
                          ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-200"
                          : "bg-rose-950/20 border-rose-500/30 text-rose-200"
                      }`}
                    >
                      <div className="font-bold text-white mb-1">{step.title}</div>
                      <div>{step.feedback}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* WINDOW 4: ₹1 LAKH PASS CHALLENGE (IMAGE 4) + COMPARISON TABLE     */}
        {/* ================================================================= */}
        <section id="pass-challenge" className="py-24 px-6 max-w-6xl mx-auto w-full space-y-20">
          {/* ₹1 Lakh Pass Challenge Spotlight with Image 4 */}
          <div className="rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 p-8 sm:p-12 shadow-2xl">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              {/* Left 7 Cols: Challenge Copy & 3 Steps */}
              <div className="lg:col-span-7 space-y-6">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 inline-block uppercase tracking-wider">
                  Ultimate Risk-Reversal Guarantee
                </span>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                  The ₹1,00,000 Pass Challenge
                </h2>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  We don’t just claim our 3-Model Consensus AI matches official ICAI evaluation standards—we back it with
                  a ₹1 Lakh guarantee. Complete our structured mock test challenge, hit the target benchmark scores, and
                  pass your exam—or claim up to ₹1,00,000.
                </p>

                <div className="grid sm:grid-cols-3 gap-4 pt-2">
                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-emerald-500/20">
                    <span className="text-emerald-400 font-black text-sm block mb-1">01. Enroll in Arena</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Activate the ₹1L Pass Challenge inside the CA Final or Inter Exam Arena.
                    </p>
                  </div>
                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-emerald-500/20">
                    <span className="text-emerald-400 font-black text-sm block mb-1">02. Practice & Fix</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Submit handwritten mock papers and apply 60-second Red-Pen step feedback.
                    </p>
                  </div>
                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-emerald-500/20">
                    <span className="text-emerald-400 font-black text-sm block mb-1">03. Pass or Claim</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Clear your official attempt with confidence or claim under challenge terms.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href={`${protocol}ca.${rootDomain}`}
                    className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-sm shadow-xl shadow-emerald-500/20 transition-all"
                  >
                    Enter CA ₹1L Pass Challenge →
                  </a>
                  <button
                    onClick={() => setIsVideoOpen(true)}
                    className="px-6 py-4 bg-slate-950 hover:bg-slate-900 text-emerald-300 border border-emerald-500/30 font-bold rounded-2xl text-sm transition-colors cursor-pointer"
                  >
                    Watch Challenge Explainer Video
                  </button>
                </div>
              </div>

              {/* Right 5 Cols: Asset 4 (1:1 Square Vault Emblem) */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden border border-emerald-500/30 shadow-2xl shadow-emerald-950/50 bg-slate-950">
                  <img
                    src={IMAGES.passChallengeBadge}
                    alt="NexQ AI ₹1,00,000 Pass Challenge Emblem"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table for SEO & Conversion */}
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h3 className="text-2xl sm:text-4xl font-black">NexQ AI vs. Traditional Test Series vs. ChatGPT</h3>
              <p className="text-slate-400 text-sm sm:text-base">
                See why serious CA, CS, CMA, and UPSC aspirants are switching to 3-Model Consensus evaluation.
              </p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/50">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-800 text-slate-300">
                    <th className="p-4 sm:p-5 font-bold">Evaluation Parameter</th>
                    <th className="p-4 sm:p-5 font-black text-indigo-300 bg-indigo-950/40 border-x border-indigo-500/20">
                      NexQ AI (3-Model Consensus)
                    </th>
                    <th className="p-4 sm:p-5 font-bold">Traditional Manual Test Series</th>
                    <th className="p-4 sm:p-5 font-bold">Generic AI (ChatGPT)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-white">Evaluation Speed</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-400 bg-indigo-950/20 border-x border-indigo-500/20">
                      ⚡ 60 Seconds (Instant Feedback)
                    </td>
                    <td className="p-4 sm:p-5 text-rose-400">7 to 14 Days Delay</td>
                    <td className="p-4 sm:p-5 text-amber-300">1–2 Mins (Unstructured)</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-white">Step Marking & Working Notes</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-400 bg-indigo-950/20 border-x border-indigo-500/20">
                      ✓ Line-by-Line Red-Pen Step Marks
                    </td>
                    <td className="p-4 sm:p-5">Inconsistent across evaluators</td>
                    <td className="p-4 sm:p-5 text-rose-400">✗ Misses working note steps</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-white">Official Rubric Calibration</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-400 bg-indigo-950/20 border-x border-indigo-500/20">
                      ✓ ICAI, ICSI, ICMAI & UPSC Rubrics
                    </td>
                    <td className="p-4 sm:p-5">Depends on checker experience</td>
                    <td className="p-4 sm:p-5 text-rose-400">✗ Generic textbook summaries</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-white">Pass Guarantee</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-400 bg-indigo-950/20 border-x border-indigo-500/20">
                      🏆 Up to ₹1,00,000 Pass Challenge
                    </td>
                    <td className="p-4 sm:p-5 text-rose-400">None</td>
                    <td className="p-4 sm:p-5 text-rose-400">None</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* WINDOW 5: B2B COACHING PORTAL (IMAGE 5) + SEO FAQ ACCORDION       */}
        {/* ================================================================= */}
        <section className="py-20 px-6 bg-slate-900/40 border-t border-slate-800">
          <div className="max-w-6xl mx-auto space-y-20">
            {/* Coaching Institute Showcase with Image 5 */}
            <div className="rounded-3xl bg-slate-950 border border-indigo-500/30 overflow-hidden shadow-2xl">
              <div className="grid lg:grid-cols-12 items-center">
                <div className="lg:col-span-6 p-8 sm:p-12 space-y-5">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    B2B Coaching Portal
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                    Evaluate 10,000+ Student Answer Copies Overnight
                  </h2>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                    Built for CA, CS, CMA, and UPSC coaching academies. Replace slow manual paper checking with
                    automated batch evaluation, cohort bell-curve analytics, and white-labeled rubric reports.
                  </p>
                  <div className="pt-2">
                    <Link
                      href={`${APP_URL}/institute/login`}
                      className="inline-flex px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-black text-white shadow-lg shadow-indigo-600/30 transition-all"
                    >
                      Launch Coaching Institute Portal →
                    </Link>
                  </div>
                </div>

                {/* Right 6 Cols: Image 5 (Curved Ultrawide Coaching Monitor) */}
                <div className="lg:col-span-6 relative h-full min-h-[280px] bg-slate-900">
                  <img
                    src={IMAGES.coachingDashboard}
                    alt="NexQ AI Coaching Institute Batch Evaluation Portal"
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Subtle left-blend gradient into the text card */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950/40 hidden lg:block" />
                </div>
              </div>
            </div>

            {/* SEO FAQ Accordion */}
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Frequently Asked Questions
                </span>
                <h2 className="text-2xl sm:text-4xl font-black">Everything You Need to Know</h2>
              </div>

              <div className="space-y-3">
                {faqs.map((f, i) => (
                  <div key={i} className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden">
                    <button
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full p-5 sm:p-6 text-left flex justify-between items-center gap-4 font-bold text-sm sm:text-base text-white hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                      <span>{f.q}</span>
                      <span className="text-indigo-400 font-mono text-xl">{activeFaq === i ? "−" : "+"}</span>
                    </button>
                    {activeFaq === i && (
                      <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-900">
                        {f.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================================================================= */}
      {/* LOCAL VIDEO LIGHTBOX MODAL                                        */}
      {/* ================================================================= */}
      {isVideoOpen && (
        <div
          onClick={() => setIsVideoOpen(false)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl rounded-3xl bg-slate-900 border border-slate-700 overflow-hidden shadow-2xl"
          >
            <div className="flex justify-between items-center px-6 py-4 bg-slate-950 border-b border-slate-800">
              <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                NexQ AI — ₹1 Lakh Pass Challenge & 60s Grading Demo
              </span>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 cursor-pointer"
              >
                ✕ Close
              </button>
            </div>
            <div className="aspect-video w-full bg-black flex items-center justify-center">
              <video
                src="/promo-video.mp4"
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* FOOTER                                                            */}
      {/* ================================================================= */}
      <footer className="border-t border-slate-900 bg-slate-950 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center font-bold text-white">
              N
            </div>
            <span>© 2026 NexQ AI Edtech Private Limited. High-stakes exam assessment engine.</span>
          </div>
          <div className="flex flex-wrap gap-5 text-slate-400 font-medium">
            <a href={`${protocol}ca.${rootDomain}`} className="hover:text-white">
              CA Arena
            </a>
            <a href={`${protocol}cs.${rootDomain}`} className="hover:text-white">
              CS Arena
            </a>
            <a href={`${protocol}cma.${rootDomain}`} className="hover:text-white">
              CMA Arena
            </a>
            <a href={`${protocol}upsc.${rootDomain}`} className="hover:text-white">
              UPSC Arena
            </a>
            <Link href={`${APP_URL}/institute/login`} className="hover:text-white">
              Coaching Portal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}