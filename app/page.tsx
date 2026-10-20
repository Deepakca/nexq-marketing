// FILE: ./app/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

const IMAGES = {
  heroPreview: "/images/hero-preview.jpg",
  consensusArchitecture: "/images/consensus-architecture.jpg",
  stepMarkingMacro: "/images/step-marking-macro.jpg",
  passChallengeBadge: "/images/pass-challenge-badge.jpg",
  coachingDashboard: "/images/coaching-dashboard.jpg",
};

export default function MarketingHome() {
  const isDev = process.env.NODE_ENV === "development";
  const rootDomain = isDev ? "localhost:3000" : "nexqai.in";
  const protocol = isDev ? "http://" : "https://";
  const APP_URL = `${protocol}app.${rootDomain}`;

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"ca" | "cs" | "cma" | "upsc">("ca");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const streams = [
    {
      slug: "ca",
      name: "CA Final, Inter & Foundation",
      badge: "₹1L Pass Challenge + 30 Free Tokens",
      badgeStyle: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      borderHover: "hover:border-indigo-500 hover:shadow-indigo-500/10",
      rubric: "ICAI 30:70 Hybrid Scheme (Papers 1–6 + IBS)",
      desc: "ICAI 30:70 Case-Scenario MCQ + Red-Pen Step Marking. Audits Ind AS, SA keywords, and 300-DPI working notes. Includes Official ICAI MTP Series I & II grading.",
      highlights: [
        "Ind AS & SA Citation Audit",
        "300-DPI Working Note Zoom",
        "Printable ICAI Ruled Booklet",
        "Attempt-Scoped Finance Act Engine",
      ],
    },
    {
      slug: "cs",
      name: "CS Executive & Professional",
      badge: "ICSI 2022 Syllabus Engine",
      badgeStyle: "bg-purple-500/15 text-purple-300 border-purple-500/30",
      borderHover: "hover:border-purple-500 hover:shadow-purple-500/10",
      rubric: "ICSI 20:80 Drafting & Precedent Rubric",
      desc: "Evaluates Company Law board resolutions, legal drafting language, Secretarial Standards (SS-1/SS-2), and NCLT/SC citations with line-by-line precision.",
      highlights: [
        "Resolution Format Grader",
        "Companies Act Section Check",
        "Bookish Legal Language Fix",
        "Unlimited Case-Law MCQs",
      ],
    },
    {
      slug: "cma",
      name: "CMA Inter & Final",
      badge: "Step-Wise Numerical Grader",
      badgeStyle: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      borderHover: "hover:border-amber-500 hover:shadow-amber-500/10",
      rubric: "ICMAI Syllabus 2022 Costing Scheme",
      desc: "Inspects every Cost Sheet formula, marginal/standard costing variance table, and CAS 1–24 citation—awarding step marks even when final balance totals diverge.",
      highlights: [
        "Cost Sheet Formula Audit",
        "Variance Table Step Marks",
        "CAS 1–24 Verification",
        "Custom Mock PDF Builder",
      ],
    },
    {
      slug: "upsc",
      name: "UPSC CSE Mains & Prelims",
      badge: "QCAB + Dual-Axis Current Affairs",
      badgeStyle: "bg-sky-500/15 text-sky-300 border-sky-500/30",
      borderHover: "hover:border-sky-500 hover:shadow-sky-500/10",
      rubric: "UPSC 150/250-Word QCAB + Prelims Trap Engine",
      desc: "Print fixed-space UPSC Question-cum-Answer Booklets (QCAB), get 360° multidimensional Mains grading, and practice Prelims MCQs linked to Current Affairs.",
      highlights: [
        "Printable Fixed-Space QCAB",
        "Directive Word & 360° Matrix",
        "Dual-Axis Current Affairs Bridge",
        "All-India / State / District Rank",
      ],
    },
  ];

  const platformEcosystem = [
    {
      badge: "4 HYBRID EXAM MODES + ARUCO BOOKLETS",
      title: "Write on Paper, OMR, or CBT—Your Choice",
      desc: "Simulate any exam condition: (1) All-Digital CBT, (2) CBT MCQs + Handwritten Booklet, (3) Printable OMR Bubble Sheet + Ruled Booklet, or (4) 100% Plain Paper. Download official ICAI/UPSC QCAB booklets stamped with 4-corner ArUco markers & QR codes for automatic question slicing.",
      color: "border-indigo-500/30 bg-indigo-950/15 text-indigo-300",
    },
    {
      badge: "UNLIMITED JIT QUESTION PIPELINE",
      title: "6/6 Blind-Solved MCQs That Never Run Out",
      desc: "Every MCQ is solved blind from first principles by GPT-4o, Claude 3.5 Sonnet, and Gemini 2.5 Pro before entering your pool. When your unattempted buffer drops below 50, our Just-In-Time (JIT) pipeline synthesizes fresh, amendment-updated questions automatically.",
      color: "border-emerald-500/30 bg-emerald-950/15 text-emerald-300",
    },
    {
      badge: "CONTINUOUS-ELO HEATMAP & SM-2 VAULT",
      title: "Adaptive Difficulty + Spaced Repetition",
      desc: "Our Continuous-Interpolation Elo engine merges your MCQ accuracy and descriptive step scores into a live Red/Amber/Green Syllabus Heatmap—automatically shifting question difficulty (Easy → Medium → Hard) and queuing wrong answers into your SM-2 Spaced Repetition Vault.",
      color: "border-purple-500/30 bg-purple-950/15 text-purple-300",
    },
    {
      badge: "SCHOLARS ARENA & PEER TELEMETRY",
      title: "National, State & District Leaderboards",
      desc: "Enter your PIN code to compete in Weekly, Monthly, and All-Time sprints across your District, State, and All-India cohorts (from Apprentice to Grandmaster 👑). Plus, see real-time peer accuracy ('412 attempted • 28% got it right') on every single question.",
      color: "border-amber-500/30 bg-amber-950/15 text-amber-300",
    },
    {
      badge: "SMART PLANNER & CUSTOM MOCK BUILDER",
      title: "Drag-and-Drop Schedule + Leave Override",
      desc: "Algorithmic bin-packing builds your modular + full-syllabus mock schedule by chapter weightage. Drag-and-drop chapters across tests, log a 'Personal Leave' to auto-recalculate your weekly pace, or generate custom 30m–180m printable PDF mocks on demand.",
      color: "border-sky-500/30 bg-sky-950/15 text-sky-300",
    },
    {
      badge: "94.2% AUDITED COVERAGE & REVALUATION",
      title: "Real Exam Coverage Proof + Supreme Appeal",
      desc: "Inspect our side-by-side audit showing how closely our RAG question bank predicted actual ICAI & UPSC exam papers. Disagree with an AI grade? Trigger a 1-click Supreme AI Revaluation—if your score shifts by ≥10%, your revaluation tokens are refunded automatically.",
      color: "border-rose-500/30 bg-rose-950/15 text-rose-300",
    },
  ];

  const sampleEvaluations = {
    ca: {
      paper: "CA Final Paper 1: Financial Reporting (Ind AS 16 & 37)",
      score: "16.5 / 20",
      consensus: "98.4% 3-Model Agreement • 300-DPI Table Zoom",
      extract:
        "As per Ind AS 16 'Property, Plant and Equipment', initial dismantling and restoration costs must be capitalized at present value using the pre-tax discount rate...",
      steps: [
        {
          title: "Step 1: Accounting Standard Citation [Page 1 • Box #1]",
          feedback: "+1.5 Marks — Ind AS 16 provision & para reference accurately stated.",
          positive: true,
        },
        {
          title: "Step 2: Working Note 2 (PV of Decommissioning) [Page 2 • Box #2]",
          feedback: "+2.0 Marks — Discounting factor and initial carrying cost verified via 300-DPI ledger crop.",
          positive: true,
        },
        {
          title: "Step 3: Subsequent Depreciation Schedule [Page 2 • Box #3]",
          feedback: "-0.5 Marks — Unwinding of discount under Ind AS 37 finance cost omitted in Year 1 P&L.",
          positive: false,
        },
      ],
    },
    cs: {
      paper: "CS Executive: Company Law & Practice (Sec 185/186)",
      score: "4.0 / 5.0",
      consensus: "97.9% 3-Model Agreement • Language Upgraded",
      extract:
        "RESOLVED THAT pursuant to Section 186(2) of the Companies Act, 2013, unanimous consent of the Board and prior Special Resolution is required where loan exceeds 60% of paid-up share capital...",
      steps: [
        {
          title: "Step 1: Statutory Threshold Check",
          feedback: "+1.5 Marks — 60% Paid-up Capital & 100% Free Reserves limit accurately cited.",
          positive: true,
        },
        {
          title: "Step 2: Resolution Drafting Structure",
          feedback: "+1.5 Marks — Operative clause & SS-1 board approval condition matched.",
          positive: true,
        },
        {
          title: "Step 3: Public Financial Institution Notice",
          feedback: "-1.0 Marks — Missed prior PFI approval condition in case of subsisting default.",
          positive: false,
        },
      ],
    },
    cma: {
      paper: "CMA Final: Strategic Cost Management (Transfer Pricing)",
      score: "8.5 / 10",
      consensus: "99.1% 3-Model Agreement",
      extract:
        "Minimum Transfer Price = Marginal Cost (₹45/unit) + Opportunity Cost of foregone external sales (₹15/unit) = ₹60.00 per unit...",
      steps: [
        {
          title: "Step 1: Minimum Transfer Price Formula",
          feedback: "+2.5 Marks — MC + Opportunity Cost formulation verified.",
          positive: true,
        },
        {
          title: "Step 2: Capacity Constraint Working Note",
          feedback: "+4.0 Marks — Spare capacity vs external demand trade-off table accurate.",
          positive: true,
        },
        {
          title: "Step 3: Goal Congruence Conclusion",
          feedback: "-1.5 Marks — Divisional profit impact on Division B ROI not quantified.",
          positive: false,
        },
      ],
    },
    upsc: {
      paper: "UPSC CSE Mains GS-II: Indian Constitution & Federalism",
      score: "6.5 / 10",
      consensus: "Topper Percentile: Top 4% • QCAB Verified",
      extract:
        "While Article 280 envisages the Finance Commission as the balancing wheel of fiscal federalism, the rising share of non-divisible cesses and surcharges has shrunk the divisible pool...",
      steps: [
        {
          title: "Introduction & Constitutional Anchor",
          feedback: "+1.5 Marks — Crisp opening anchored in Article 280 & 15th FC data.",
          positive: true,
        },
        {
          title: "Multidimensional Body (Fiscal + Administrative)",
          feedback: "+3.5 Marks — Both vertical asymmetry and horizontal equity criteria analyzed.",
          positive: true,
        },
        {
          title: "Way Forward & Committee Citation",
          feedback: "-1.0 Marks — Add Sarkaria/Punchhi Commission recommendation on cess sunset clauses.",
          positive: false,
        },
      ],
    },
  };

  const faqs = [
    {
      q: "Why does NexQ AI use a 3-Model Consensus Engine instead of a single AI model?",
      a: "Single AI chatbots suffer from grading drift and hallucinated marks. NexQ AI routes your handwritten answer sheet through three frontier models simultaneously (Gemini 2.5 Pro, GPT-4o, and Claude 3.5 Sonnet): Model A checks statutory provisions and accounting standards, Model B verifies step-by-step calculations and 300-DPI working note tables, and Model C aligns scores with official ICAI, ICSI, ICMAI, and UPSC rubrics—dropping statistical outliers (>15% divergence) before synthesizing your verified score.",
    },
    {
      q: "What do I get for free when I sign up, and how does the ₹20 Token system work?",
      a: "The moment you verify your WhatsApp number during onboarding, you receive 30 Free Welcome Tokens plus 365-day access to the Unlimited MCQ Arena. Because Economy 24h evaluation costs just 2 Tokens (₹20) and Priority 1h evaluation costs 5 Tokens (₹50), you can evaluate 6 to 15 descriptive papers completely free! When you top up tokens, our FEFO (First-Expiring, First-Out) wallet spends promo tokens first while your purchased tokens never expire.",
    },
    {
      q: "How does the ₹1,00,000 Pass Challenge work for CA Final & Inter?",
      a: "When you enroll in the Pass Challenge Track, you receive a structured schedule of modular and full-length mock test papers. Upload your handwritten sheets, review your Red-Pen step evaluations, and maintain the benchmark pass score across the test series. If you complete the challenge protocol and do not clear your official exam, you qualify for up to ₹1,00,000 under the challenge guarantee terms.",
    },
    {
      q: "What if I disagree with the AI's grading on a question?",
      a: "Every evaluated submission includes a 1-click 'Apply for Supreme AI Revaluation' button. A fresh de-novo audit is executed by our Supreme Appeals Examiner model. If your total score shifts by 10% or more, your revaluation tokens are automatically refunded to your wallet.",
    },
    {
      q: "How can coaching institutes use the B2B Coaching Portal?",
      a: "Coaching academies get a white-labeled subdomain (e.g., youracademy.nexqai.in) or custom domain, CSV bulk student roster provisioning, multi-PDF offline exam center batch booklet uploading, Net-30 postpaid credit billing, and cohort bell-curve analytics.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
      {/* ================================================================= */}
      {/* TOP ANNOUNCEMENT BAR                                              */}
      {/* ================================================================= */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-emerald-950 border-b border-indigo-500/20 py-2.5 px-4 text-center text-xs sm:text-sm">
        <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 mr-2">
          🎁 30 FREE TOKENS ON SIGNUP
        </span>
        <span className="text-slate-200 font-medium">
          Get up to 15 Free Descriptive Paper Evaluations + Unlimited MCQ Arena +{" "}
          <strong className="text-emerald-300">₹1,00,000 Pass Challenge</strong>.
        </span>
        <a
          href="#exam-arenas"
          className="ml-2 font-bold text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
        >
          Claim Free Welcome Grant →
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

            <nav className="hidden lg:flex items-center gap-1.5 pl-4 border-l border-slate-800">
              {streams.map((s) => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
                >
                  {s.slug.toUpperCase()} Arena
                </Link>
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
              Student Sign In (30 Free Tokens)
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ================================================================= */}
        {/* WINDOW 1: CINEMATIC HERO + IMAGE 1 (HERO PREVIEW) + VIDEO MODAL   */}
        {/* ================================================================= */}
        <section className="relative overflow-hidden pt-12 pb-20 px-6 border-b border-slate-900">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-indigo-600/15 blur-[130px] pointer-events-none -z-10" />

          <div className="max-w-6xl mx-auto text-center space-y-6">
            <div className="flex flex-wrap justify-center items-center gap-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                3-Model Consensus AI Engine • 5-Min Express & 1-Hr Priority Grading
              </div>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                Evaluations Starting at ₹20 (2 Tokens)
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight max-w-5xl mx-auto">
              Stop Waiting 14 Days for Test Series Feedback.{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-300 bg-clip-text text-transparent">
                Grade Handwritten Sheets in Minutes.
              </span>
            </h1>

            <p className="text-slate-400 max-w-3xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed">
              Upload photos or PDFs of your handwritten CA, CS, CMA, or UPSC answer booklets. Get{" "}
              <strong className="text-slate-200">Bi-Directional Red-Pen Step Marking</strong>,{" "}
              <strong className="text-slate-200">Unlimited 6/6 Blind-Verified MCQs</strong>, and{" "}
              <strong className="text-slate-200">National/State/District Rank Leaderboards</strong>—backed by our{" "}
              <strong className="text-emerald-400">₹1,00,000 Pass Challenge</strong>.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
              <a
                href="#exam-arenas"
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-sm sm:text-base font-black text-white shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02]"
              >
                Select Your Exam Arena (Start Free) ↓
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

            {/* 4 Hero Proof Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-4 text-left">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xl font-black text-emerald-400">30 Free Tokens</div>
                <div className="text-[11px] text-slate-400">Up to 15 Free Paper Checks on Signup</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xl font-black text-indigo-400">₹20 / Paper</div>
                <div className="text-[11px] text-slate-400">FEFO Token Wallet (Never Expires)</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xl font-black text-purple-400">Unlimited MCQs</div>
                <div className="text-[11px] text-slate-400">JIT Auto-Replenishing Question Bank</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xl font-black text-amber-400">94.2% Match</div>
                <div className="text-[11px] text-slate-400">Audited Real Exam Question Coverage</div>
              </div>
            </div>

            {/* IMAGE 1 CONTAINER: HERO TABLET + VIDEO TRIGGER */}
            <div className="mt-10 max-w-5xl mx-auto">
              <div
                onClick={() => setIsVideoOpen(true)}
                className="group relative rounded-3xl p-2 bg-gradient-to-b from-indigo-500/30 via-slate-800 to-slate-900 border border-indigo-500/30 shadow-2xl shadow-indigo-950/60 cursor-pointer overflow-hidden"
              >
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950">
                  <img
                    src={IMAGES.heroPreview}
                    alt="NexQ AI Handwritten Exam Evaluation Interface"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-slate-950/60" />

                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap items-center gap-2 z-10">
                    <div className="bg-slate-950/90 backdrop-blur-md border border-indigo-500/40 px-3.5 py-1.5 rounded-xl flex items-center gap-2 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-black tracking-wide text-white">
                        GEMINI 2.5 PRO + GPT-4o + CLAUDE 3.5 SONNET
                      </span>
                    </div>
                    <div className="hidden sm:flex bg-slate-950/85 backdrop-blur-md border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-mono text-indigo-300">
                      4 Hybrid Modes • ArUco Printable Booklets
                    </div>
                  </div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-indigo-600/95 group-hover:bg-indigo-500 text-white flex items-center justify-center text-3xl shadow-2xl shadow-indigo-600/60 border-4 border-white/20 transition-all group-hover:scale-110">
                      ▶
                    </div>
                    <span className="mt-4 px-4 py-1.5 rounded-full bg-slate-950/90 border border-indigo-500/40 text-xs sm:text-sm font-bold text-indigo-200 shadow-lg">
                      Click to Watch 30-Second Founder Demo & ₹1L Pass Challenge
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap justify-between items-center gap-2 bg-slate-950/90 backdrop-blur-md border border-slate-800 px-4 py-3 rounded-2xl text-xs z-10">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                        BI-DIRECTIONAL RED-PEN CANVAS
                      </span>
                      <span className="text-slate-300 hidden md:inline">
                        Click any rubric step to highlight the exact bounding box on your handwritten sheet
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
              Each portal is calibrated to official examining body rubrics, past topper sheets, attempt-scoped statutory
              amendments, and step-marking schemes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 text-left">
            {streams.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className={`p-8 rounded-3xl bg-slate-900/90 border border-slate-800 ${s.borderHover} transition-all duration-300 group shadow-2xl flex flex-col justify-between hover:-translate-y-1`}
              >
                <div>
                  <div className="flex justify-between items-center gap-2 mb-4">
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${s.badgeStyle}`}>
                      {s.badge}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-lg border border-indigo-500/20">
                      nexqai.in/{s.slug}
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
                    <span className="group-hover:underline">Enter {s.slug.toUpperCase()} Arena</span>
                    <span className="text-emerald-400 font-semibold">30 Free Welcome Tokens →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ================================================================= */}
        {/* WINDOW 3: VISUAL BENTO GRID (IMAGES 2 & 3) + 6-PILLAR ECOSYSTEM   */}
        {/* ================================================================= */}
        <section className="py-20 px-6 bg-slate-900/40 border-y border-slate-800/80">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Inside the AI Assessment & Adaptive Practice Engine
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
                More Than a Test Series. A Complete AI Exam Operating System.
              </h2>
              <p className="text-slate-400 text-base sm:text-lg">
                From 300-DPI handwritten table OCR and printable ArUco booklets to Continuous-Elo heatmaps and
                National/State/District leaderboards.
              </p>
            </div>

            {/* BENTO GRID WITH IMAGE 2 (CONSENSUS) & IMAGE 3 (STEP MARKING MACRO) */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex flex-col justify-between">
                <div className="relative aspect-video w-full bg-slate-900 overflow-hidden border-b border-slate-800">
                  <img
                    src={IMAGES.consensusArchitecture}
                    alt="NexQ AI 3-Model Consensus Architecture Diagram"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-950/90 text-indigo-300 border border-indigo-500/30">
                    OUTLIER-DROPPING 3-MODEL CONSENSUS
                  </span>
                </div>
                <div className="p-8 space-y-3">
                  <h3 className="text-2xl font-black text-white">
                    3-Model Consensus Engine + Automatic Outlier Filtering
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Your handwritten answer sheet is graded in parallel by{" "}
                    <strong className="text-slate-200">Gemini 2.5 Pro</strong>,{" "}
                    <strong className="text-slate-200">GPT-4o</strong>, and{" "}
                    <strong className="text-slate-200">Claude 3.5 Sonnet</strong>. If any model diverges by &gt;15% from
                    the median, it is automatically dropped as an outlier before the Chief Presiding Arbiter synthesizes
                    your step-by-step score.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex flex-col justify-between">
                <div className="relative aspect-video w-full bg-slate-900 overflow-hidden border-b border-slate-800">
                  <img
                    src={IMAGES.stepMarkingMacro}
                    alt="Red-Pen Step Marking on Handwritten CA Balance Sheet"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold bg-rose-950/90 text-rose-300 border border-rose-500/40">
                    300-DPI TABLE ZOOM & BI-DIRECTIONAL CANVAS
                  </span>
                </div>
                <div className="p-8 space-y-3">
                  <h3 className="text-2xl font-black text-white">
                    Bi-Directional Red-Pen Canvas & Working Note Grader
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Our OpenCV deskew & CLAHE contrast pipeline automatically takes{" "}
                    <strong className="text-slate-200">300-DPI zoomed crops</strong> of your accounting ledgers, tax
                    computations, and diagrams. Click any step in your rubric table to jump directly to that page and
                    highlight the exact red-pen bounding box on your sheet.
                  </p>
                </div>
              </div>
            </div>

            {/* 6-CARD PLATFORM ECOSYSTEM GRID */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platformEcosystem.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-7 rounded-3xl bg-slate-950 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black border ${feat.color}`}>
                      {feat.badge}
                    </span>
                    <h3 className="text-lg font-black text-white">{feat.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Tab Switcher: Live Rubric Breakdown */}
            <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
                <div>
                  <span className="text-xs font-mono uppercase text-indigo-400 block">
                    Interactive Rubric Inspector
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    Preview a Sample Step-by-Step Evaluation
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
                    &ldquo;{sampleEvaluations[activeTab].extract}&rdquo;
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
          <div className="rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 p-8 sm:p-12 shadow-2xl">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
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
                      Submit handwritten mock papers and apply Red-Pen step feedback & heatmap revisions.
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
                  <Link
                    href="/ca"
                    className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-sm shadow-xl shadow-emerald-500/20 transition-all"
                  >
                    Enter CA ₹1L Pass Challenge →
                  </Link>
                  <button
                    onClick={() => setIsVideoOpen(true)}
                    className="px-6 py-4 bg-slate-950 hover:bg-slate-900 text-emerald-300 border border-emerald-500/30 font-bold rounded-2xl text-sm transition-colors cursor-pointer"
                  >
                    Watch Challenge Explainer Video
                  </button>
                </div>
              </div>

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

          {/* Comparison Table */}
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
                    <td className="p-4 sm:p-5 font-semibold text-white">Evaluation Speed & Tiers</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-400 bg-indigo-950/20 border-x border-indigo-500/20">
                      ⚡ 5-Min Express • 1-Hr Priority • 24-Hr Economy
                    </td>
                    <td className="p-4 sm:p-5 text-rose-400">7 to 14 Days Delay</td>
                    <td className="p-4 sm:p-5 text-amber-300">1–2 Mins (Unstructured)</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-white">Cost & Free Trial</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-400 bg-indigo-950/20 border-x border-indigo-500/20">
                      ✓ 30 Free Tokens on Signup • ₹20/Paper Thereafter
                    </td>
                    <td className="p-4 sm:p-5">₹1,500–₹4,000 Upfront Lock-In</td>
                    <td className="p-4 sm:p-5">₹2,000/mo Subscription</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-white">Step Marking & Working Notes</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-400 bg-indigo-950/20 border-x border-indigo-500/20">
                      ✓ 300-DPI Table Crop + Bi-Directional Red-Pen Boxes
                    </td>
                    <td className="p-4 sm:p-5">Inconsistent across freelancers</td>
                    <td className="p-4 sm:p-5 text-rose-400">✗ Misses working note steps</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-white">MCQ Practice & Adaptive Mastery</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-400 bg-indigo-950/20 border-x border-indigo-500/20">
                      ✓ Unlimited 6/6 Blind-Solved MCQs + Elo Heatmap + SM-2 Vault
                    </td>
                    <td className="p-4 sm:p-5">Static PDFs with no adaptive tracking</td>
                    <td className="p-4 sm:p-5 text-rose-400">✗ Hallucinates tax amendments</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-white">Revaluation & Pass Guarantee</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-400 bg-indigo-950/20 border-x border-indigo-500/20">
                      🏆 Auto-Refund Revaluation + ₹1,00,000 Pass Challenge
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
            <div className="rounded-3xl bg-slate-950 border border-indigo-500/30 overflow-hidden shadow-2xl">
              <div className="grid lg:grid-cols-12 items-center">
                <div className="lg:col-span-6 p-8 sm:p-12 space-y-5">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    B2B Coaching Portal • White-Label Subdomains
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                    Evaluate 10,000+ Student Answer Copies Overnight
                  </h2>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                    Built for CA, CS, CMA, and UPSC coaching academies. Claim your branded subdomain (e.g.,{" "}
                    <code className="text-indigo-300">youracademy.nexqai.in</code>), bulk-import student CSV rosters,
                    drop multi-PDF offline exam center scans, and use Net-30 postpaid credit billing.
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

                <div className="lg:col-span-6 relative h-full min-h-[280px] bg-slate-900">
                  <img
                    src={IMAGES.coachingDashboard}
                    alt="NexQ AI Coaching Institute Batch Evaluation Portal"
                    className="w-full h-full object-cover object-center"
                  />
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
                NexQ AI — ₹1 Lakh Pass Challenge & Grading Demo
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
            <Link href="/ca" className="hover:text-white">
              CA Arena
            </Link>
            <Link href="/cs" className="hover:text-white">
              CS Arena
            </Link>
            <Link href="/cma" className="hover:text-white">
              CMA Arena
            </Link>
            <Link href="/upsc" className="hover:text-white">
              UPSC Arena
            </Link>
            <Link href={`${APP_URL}/institute/login`} className="hover:text-white">
              Coaching Portal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}