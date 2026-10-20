// FILE: ./app/[exam]/page.tsx
"use client";

import { useState, use } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { EXAM_CONFIG } from "../../config/exams";
import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, Award, BookOpen, Layers, ShieldCheck, Zap, Trophy, BarChart3, Calendar, Eye, EyeOff } from "lucide-react";

const IMAGES = {
  heroPreview: "/images/hero-preview.jpg",
  consensusArchitecture: "/images/consensus-architecture.jpg",
  stepMarkingMacro: "/images/step-marking-macro.jpg",
  passChallengeBadge: "/images/pass-challenge-badge.jpg",
};

export default function StylishExamPage({ params }: { params: Promise<{ exam: string }> }) {
  const { exam } = use(params);
  const data = EXAM_CONFIG[exam.toLowerCase()];

  // 1. Scroll-Linked Animation Hooks (Smooth 1:1 with user scroll speed)
  const { scrollY } = useScroll();
  const panelWidth = useTransform(scrollY, [0, 600], ["30%", "4rem"]);
  const leftMargin = useTransform(scrollY, [0, 600], ["30%", "4rem"]);
  const formOpacity = useTransform(scrollY, [0, 350], [1, 0]);
  const textOpacity = useTransform(scrollY, [450, 600], [0, 1]);

  // Interactive UI States
  const [isScrolledPast, setIsScrolledPast] = useState(false);
  const [isPanelForcedOpen, setIsPanelForcedOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"email" | "phone" | "register">("email");
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [scheduleMode, setScheduleMode] = useState<"unscheduled" | "scheduled">("unscheduled");
  const [activeDefectTab, setActiveDefectTab] = useState<"numerical" | "audit" | "mcq">("numerical");
  const [activeEngineTab, setActiveEngineTab] = useState<"hybrid" | "heatmap" | "leaderboard" | "planner">("hybrid");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  

  // =========================================================================
  // LIVE AUTHENTICATION STATE & API HANDLERS (CONNECTS TO api.nexqai.in)
  // =========================================================================
  const isDev = process.env.NODE_ENV === "development";
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || (isDev ? "http://localhost:8000" : "https://api.nexqai.in");
  const APP_BASE = isDev ? "http://localhost:3000" : "https://app.nexqai.in";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false); // <-- ADD THIS LINE

  const handoffToDashboard = (accessToken: string) => {
    window.location.href = `${APP_BASE}/login?sso_token=${encodeURIComponent(accessToken)}&exam=${data.slug}`;
  };

  const handleEmailOrRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    setAuthSuccess("");

    try {
      if (authTab === "register") {
        const regRes = await fetch(`${API_BASE}/api/v1/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const regData = await regRes.json();
        if (!regRes.ok) throw new Error(regData.detail || "Registration failed.");

        // Automatically sign in right after registering
        const loginRes = await fetch(`${API_BASE}/api/v1/auth/login/student`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const loginData = await loginRes.json();
        if (loginRes.ok && loginData.access_token) {
          handoffToDashboard(loginData.access_token);
          return;
        }
        setAuthSuccess("Account created! Signing you in...");
        setAuthTab("email");
      } else {
        const res = await fetch(`${API_BASE}/api/v1/auth/login/student`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            force_kick_otp: otpSent && otp ? otp : undefined,
          }),
        });
        const resData = await res.json();

        if (res.status === 409 && resData.requires_force_kick) {
          setOtpSent(true);
          setAuthError(
            `Active session on another device. Enter the 6-digit code sent to WhatsApp (${resData.phone_masked}) to force-login.`
          );
          return;
        }
        if (!res.ok) throw new Error(resData.detail || "Invalid email or password.");

        handoffToDashboard(resData.access_token);
      }
    } catch (err: any) {
      setAuthError(err.message || "Authentication failed.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSendWhatsAppOtp = async () => {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      setAuthError("Please enter a valid 10-digit WhatsApp number.");
      return;
    }
    setAuthLoading(true);
    setAuthError("");
    try {
      const res = await fetch(`${API_BASE}/api/v1/auth/otp/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ whatsapp_number: `+91${cleanPhone}` }),
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.detail || "Failed to send OTP.");
      setOtpSent(true);
      setAuthSuccess("6-digit OTP sent to your WhatsApp!");
    } catch (err: any) {
      setAuthError(err.message || "Failed to send OTP.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleVerifyWhatsAppOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    try {
      const cleanPhone = phone.replace(/[^0-9]/g, "");
      const res = await fetch(`${API_BASE}/api/v1/auth/otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ whatsapp_number: `+91${cleanPhone}`, otp }),
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.detail || "Invalid OTP.");
      handoffToDashboard(resData.access_token);
    } catch (err: any) {
      setAuthError(err.message || "OTP verification failed.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGoogleCallback = async (response: any) => {
    setAuthLoading(true);
    setAuthError("");
    try {
      const res = await fetch(`${API_BASE}/api/v1/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token: response.credential }),
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.detail || "Google sign-in failed.");
      handoffToDashboard(resData.access_token);
    } catch (err: any) {
      setAuthError(err.message || "Google authentication failed.");
    } finally {
      setAuthLoading(false);
    }
  };


  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 350) {
      if (!isScrolledPast) setIsScrolledPast(true);
    } else {
      if (isScrolledPast) setIsScrolledPast(false);
      if (isPanelForcedOpen) setIsPanelForcedOpen(false);
    }
  });

  if (!data) return <div className="p-20 text-white">Exam not found.</div>;

  const levels = data.levels || [
    {
      id: "default",
      label: `${data.examBody} Complete Track`,
      groups: "All Papers Covered",
      subjects: data.features.map((f: string, idx: number) => ({
        code: `Module ${idx + 1}`,
        name: f,
        tags: ["3-Model AI Grading", "Step-Wise Rubric", "Topper Benchmark"],
      })),
    },
  ];

  const plans = data.plans || [
    {
      name: "Free Starter Grant (On Signup)",
      badge: "100% FREE • NO CARD REQUIRED",
      price: "₹0",
      unit: "/ 30 Free Welcome Tokens + 365d MCQ Arena",
      desc: "Verify your WhatsApp number and immediately unlock 30 Welcome Tokens (up to 15 Economy or 6 Priority Descriptive Evaluations Free).",
      features: [
        "6 Priority (or 15 Economy) Descriptive Evaluations Free",
        "365 Days Unlimited JIT MCQ Arena",
        "Diagnostic Syllabus Heatmap & SM-2 Spaced Repetition Vault",
        "National, State & District Scholars Arena Leaderboard",
      ],
      popular: false,
    },
    {
      name: "Pay-As-You-Go FEFO Token Packs",
      badge: "LOWEST PRICE IN INDIA • ₹20 / TEST",
      price: "₹20",
      unit: "per Economy Test (2 Tokens) • ₹50 Priority (5 Tokens)",
      desc: "Top up tokens starting at ₹50. Purchased tokens NEVER expire and use FEFO protection.",
      features: [
        "Economy 24h: 2 Tokens (₹20) | Priority 1h: 5 Tokens (₹50) | Instant 5m: 10 Tokens",
        "Upload Official Mock Test Papers or Past Attempt Papers",
        "Custom Mock PDF Builder (30m–180m Duration)",
        "1-Click Supreme AI Revaluation (Auto-Refunded if Score Shifts ≥10%)",
      ],
      popular: true,
    },
    {
      name: "5+2 Pass Challenge Bundle",
      badge: "ELIGIBLE FOR ₹1,00,000 PASS GUARANTEE",
      price: "₹1,499",
      unit: "/ group (All Subjects + Bonus Tokens)",
      desc: `Full-length mock tests calibrated strictly to official ${data.examBody} rubrics.`,
      features: [
        "Backed by the ₹1,00,000 Risk-Reversal Pass Challenge",
        "Printable Official Cover + Ruled Answer Booklets",
        "4 Hybrid Delivery Modes (CBT, OMR, or Plain Paper)",
        "Real Exam Coverage Audit + Socratic AI Tutor",
      ],
      popular: false,
    },
  ];

  const coverageProof = data.coverageProof || {
    attemptLabel: `${data.examBody} Recent Attempt Coverage Audit`,
    coveragePct: "94.2%",
    matchedCount: "118 / 125",
    sampleRealQ: `Official ${data.examBody} Exam Question: Multi-step practical problem testing core statutory provisions and working notes.`,
    sampleNexqQ: `NexQ AI Mock Question Bank: Matched 96% of the underlying statutory adjustments, working note tables, and step-marking scheme.`,
    matchType: "Direct Structural & Conceptual Match (96% Similarity)",
  };

  const faqs = [
    {
      q: `How do I get 30 Free Welcome Tokens and Unlimited MCQ access on signup?`,
      a: `Simply create your account using the right-hand panel and complete the 1-minute WhatsApp OTP verification. Our system automatically credits 30 Welcome Tokens to your FEFO Wallet (enough for 15 Economy 24-Hr evaluations or 6 Priority 1-Hr evaluations) plus a 365-day pass to the Unlimited JIT MCQ Arena.`,
    },
    {
      q: `What are the 4 Hybrid Exam Patterns and Printable Official Booklets?`,
      a: `NexQ AI supports every way you practice: Pattern 1 (All-Digital CBT), Pattern 2 (On-Screen CBT MCQs + Handwritten Descriptive PDF), Pattern 3 (Offline OMR Bubble Sheet + Ruled Booklet PDF), and Pattern 4 (100% Plain/Ruled Paper where AI extracts both handwritten MCQ choices and descriptive answers). You can also click "Print Official Answer Booklet" to download an authentic ${data.examBody}-style A4 PDF booklet with a candidate cover page, 35mm working-note margin, and 4-corner ArUco markers for automatic question slicing.`,
    },
    {
      q: `How does the Unlimited JIT Question Pipeline and 6/6 Blind Solver work?`,
      a: `Every MCQ in our database is solved blind from first principles by GPT-4o, Claude 3.5 Sonnet, and Gemini 2.5 Pro before you ever see it. When your unattempted question buffer in any chapter dips below 50, our Just-In-Time (JIT) background worker automatically generates and validates 25 fresh, amendment-updated questions so you never repeat stale questions.`,
    },
    {
      q: `How does the "Language Improvement" & Statutory Keyword Engine help in Audit, Law, and Theory papers?`,
      a: `In theory papers like Auditing and Corporate Law, students lose heavy marks for writing casual English instead of official study material keywords. Our Model A evaluator highlights your casual sentences and shows the exact SA/Section statutory phrasing required to score full marks.`,
    },
    {
      q: `What if I disagree with the AI's marking on a specific question?`,
      a: `Every evaluated answer booklet includes a 1-click "Apply for Supreme AI Revaluation" button (5 Tokens). Your booklet is escalated to our Supreme Appeals Examiner for an independent de-novo audit. If your total score shifts by 10% or more, the system automatically refunds 5 Tokens to your wallet!`,
    },
    {
      q: `How do the Drag-and-Drop Smart Planner and Leave Override work?`,
      a: `Once you select your target exam month and year, our algorithmic bin-packing engine distributes all syllabus chapters into balanced modular and full-syllabus mock tests. You can drag-and-drop chapters between tests, build custom 30-to-180 minute PDF mocks, or log a "Personal Leave" day to automatically recalculate your weekly pace.`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#060813] text-white flex overflow-x-hidden font-sans">
      {/* ================================================================= */}
      {/* LEFT PANEL: 10-SECTION HIGH-CONVERSION EXAM MARKETING CANVAS      */}
      {/* ================================================================= */}
      <motion.div
        className="flex-1 min-h-screen pb-32"
        style={{ marginRight: isPanelForcedOpen ? undefined : leftMargin }}
        animate={{ marginRight: isPanelForcedOpen ? "30%" : undefined }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Top Campaign Strip */}
        {data.activeCampaign?.enabled && (
          <div className="bg-gradient-to-r from-indigo-950 via-[#12182B] to-emerald-950 border-b border-indigo-500/30 py-2.5 px-6 text-center text-xs">
            <span className="font-bold text-indigo-200">{data.activeCampaign.bannerText}</span>
            <span className="ml-3 px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono font-bold">
              Code: {data.activeCampaign.promoCode}
            </span>
          </div>
        )}

        {/* Header */}
        <header className="p-6 flex justify-between items-center max-w-5xl mx-auto border-b border-slate-800/60">
          <Link href="/" className="font-black text-xl flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#5B4BFF] rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              N
            </div>
            <span>
              NexQ <span className="text-indigo-400">AI</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block px-3 py-1 bg-[#12182B] border border-slate-700 rounded-full text-xs font-mono text-indigo-300">
              {data.examBody} NEW SCHEME VERIFIED
            </span>
            <button
              onClick={() => setIsPanelForcedOpen(true)}
              className="px-4 py-1.5 rounded-lg bg-[#5B4BFF] hover:bg-indigo-500 text-xs font-bold text-white cursor-pointer"
            >
              Claim 30 Free Tokens →
            </button>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-6 sm:px-12 space-y-24 mt-12">
          {/* ============================================================= */}
          {/* SECTION 1: HERO + STATS + 3-TIER EVALUATION SLA STRIP         */}
          {/* ============================================================= */}
          <section className="space-y-8">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                3-Model Consensus Grader • Attempt-Scoped Finance Act & RTP Amended
              </div>
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                🎁 30 Free Welcome Tokens + 365d Unlimited MCQ Arena
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-indigo-400">
                {data.subtitle}
              </p>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
                {data.title}
              </h1>
            </div>

            <p className="text-base sm:text-xl text-slate-400 max-w-3xl leading-relaxed">
              {data.description}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#test-series-plans"
                className="px-7 py-4 bg-[#5B4BFF] hover:bg-indigo-500 text-white font-black rounded-2xl text-sm shadow-xl shadow-indigo-600/30 transition-all"
              >
                Explore Free Grant & ₹20 Token Plans ↓
              </a>
              <a
                href="#sample-checked-sheet"
                className="px-6 py-4 bg-[#12182B] hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold rounded-2xl text-sm transition-all"
              >
                📄 Inspect Sample Checked Answer Sheet
              </a>
            </div>

            {/* 4 Key Metrics Bar */}
            {data.stats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                {data.stats.map((st: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#12182B]/90 border border-slate-800/90 text-left"
                  >
                    <div className="text-2xl sm:text-3xl font-black text-white">{st.value}</div>
                    <div className="text-xs text-slate-400 mt-1">{st.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* 3 Evaluation Speed SLA Tiers (Directly from DescriptiveSubmission.tier) */}
            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#12182B]/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                    ECONOMY SLA (FREE_24H)
                  </span>
                  <span className="text-sm font-black text-white">Within 24 Hours</span>
                </div>
                <span className="px-3 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-black">
                  2 Tokens (₹20)
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-[#12182B]/90 border border-indigo-500/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold block">
                    PRIORITY SLA (PRIORITY_1H)
                  </span>
                  <span className="text-sm font-black text-white">Within 1 Hour</span>
                </div>
                <span className="px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-black">
                  5 Tokens (₹50)
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-[#12182B]/60 border border-purple-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-purple-400 font-bold block">
                    EXPRESS SLA (INSTANT_5M)
                  </span>
                  <span className="text-sm font-black text-white">Instant 60s–5 Mins</span>
                </div>
                <span className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-black">
                  10 Tokens (₹100)
                </span>
              </div>
            </div>

            {/* Hero Preview Image */}
            <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl mt-6 group">
              <img
                src={IMAGES.heroPreview}
                alt="NexQ AI Handwritten Answer Evaluation"
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060813] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-between items-center bg-[#060813]/90 backdrop-blur-md border border-slate-800 px-5 py-3 rounded-2xl text-xs">
                <span className="text-emerald-400 font-bold">
                  ✓ Bi-Directional Red-Pen Canvas • Click Any Rubric Step to Highlight on Sheet
                </span>
                <span className="font-mono text-indigo-300">
                  300-DPI Auto-Zoom on Accounting Tables & Ledgers
                </span>
              </div>
            </div>
          </section>

          {/* ============================================================= */}
          {/* SECTION 2: INTERACTIVE 4-PILLAR PLATFORM ARCHITECTURE         */}
          {/* ============================================================= */}
          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-800 pb-6">
              <div>
                <span className="text-indigo-400 font-bold tracking-widest text-xs uppercase">
                  Built-In Technology Moat
                </span>
                <h2 className="text-3xl sm:text-4xl font-black mt-1">
                  4 Breakthrough Features No Manual Test Series Has
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "hybrid", label: "1. Printable Booklets & 4 Hybrid Modes" },
                  { id: "heatmap", label: "2. Elo Heatmap & SM-2 Vault" },
                  { id: "leaderboard", label: "3. National/State/District Arena" },
                  { id: "planner", label: "4. Drag & Drop Planner + PDF Builder" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveEngineTab(tab.id as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeEngineTab === tab.id
                        ? "bg-[#5B4BFF] text-white shadow-lg shadow-indigo-500/20"
                        : "bg-[#12182B] text-slate-400 border border-slate-800 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#12182B] border border-slate-800 shadow-2xl">
              {activeEngineTab === "hybrid" && (
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-black bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      BOOKLET STUDIO + 4 HYBRID DELIVERY PATTERNS
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      Print Official {data.examBody} Ruled Booklets or Write on Plain Paper
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Our Answer Booklet Studio compiles authentic A4 PDFs featuring candidate roll-number boxes, a
                      6-question examiner marks grid, a 35mm left working-note margin, and{" "}
                      <strong>4-corner ArUco fiducial markers + page QR metadata</strong>. Snap photos with your phone—our
                      OpenCV pipeline deskews the page, slices answers by question number automatically, and crops
                      accounting tables at 300 DPI.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs">
                      <div className="p-3.5 rounded-xl bg-[#060813] border border-slate-800">
                        <strong className="text-indigo-300 block">Pattern 1 & 2: CBT + Paper Booklet</strong>
                        <span className="text-slate-400">
                          Solve Part-I 30% Case-Scenario MCQs on screen + upload handwritten Part-II PDF.
                        </span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#060813] border border-slate-800">
                        <strong className="text-emerald-300 block">Pattern 3 & 4: OMR or 100% Plain Paper</strong>
                        <span className="text-slate-400">
                          Darken Page-1 OMR bubbles or write MCQ option letters directly on plain notebook pages!
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-[#060813] border border-slate-800 rounded-2xl p-6 space-y-3 font-mono text-xs">
                    <div className="flex justify-between items-center text-indigo-400 border-b border-slate-800 pb-2">
                      <span>[▛ ARUCO FIDUCIAL TL]</span>
                      <span>[NEXQ_META:SUB=402|P=2]</span>
                    </div>
                    <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-slate-300 space-y-2">
                      <div className="text-emerald-400 font-bold">✓ Pre-Flight Upload Veto Check Passed</div>
                      <div>• Laplacian Blur & Orientation Verified</div>
                      <div>• Page-1 OMR Bubble Grid Extracted (15/15 MCQs)</div>
                      <div>• 300-DPI Zoomed Crop: Balance Sheet Working Note 2</div>
                    </div>
                    <div className="flex justify-between items-center text-slate-500 pt-2 border-t border-slate-800">
                      <span>[▙ ARUCO BL]</span>
                      <span>35mm Working Note Margin</span>
                      <span>[▟ ARUCO BR]</span>
                    </div>
                  </div>
                </div>
              )}

              {activeEngineTab === "heatmap" && (
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      CONTINUOUS-ELO MASTERY + SM-2 SPACED REPETITION VAULT
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      Diagnostic Syllabus Heatmap & Unlimited JIT Question Pipeline
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Every MCQ you answer and every descriptive rubric step you are graded on feeds our{" "}
                      <strong>Continuous-Interpolation Elo Engine</strong>. Watch your entire {data.examBody} syllabus
                      tree light up in Red (&lt;40% Critical Weakness), Amber (40–74% Intermediate), and Green (&ge;75%
                      Mastered). Any question you get wrong is automatically scheduled into your{" "}
                      <strong>SM-2 Spaced Repetition Vault</strong> (1d $\rightarrow$ 6d $\rightarrow$ 45d intervals) so
                      you never forget a concept before exam day.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-300">
                      <li>
                        ✓ <strong>Auto-Adaptive Difficulty:</strong> Automatically shifts from Easy $\rightarrow$ Medium
                        $\rightarrow$ Hard as your Elo rises.
                      </li>
                      <li>
                        ✓ <strong>Official Past Exam Lineage:</strong> Click &ldquo;Official Past Exam Match&rdquo; on
                        any synthetic question to inspect the exact PYQ it was modeled on.
                      </li>
                      <li>
                        ✓ <strong>Built-in Socratic AI Tutor & Scratchpad:</strong> Ask AI why an option is wrong right
                        inside your practice workspace.
                      </li>
                    </ul>
                  </div>

                  <div className="lg:col-span-5 bg-[#060813] border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
                    <div className="flex justify-between items-center font-bold text-white">
                      <span>Live Syllabus Vulnerability Heatmap</span>
                      <span className="text-emerald-400">Readiness: 74%</span>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                      {[88, 92, 76, 45, 22, 81, 79, 64, 30, 85, 90, 55, 77, 82, 35, 91, 68, 84].map((sc, i) => (
                        <div
                          key={i}
                          className={`h-9 rounded-lg flex items-center justify-center font-mono font-bold text-[11px] border ${
                            sc >= 75
                              ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                              : sc >= 40
                              ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                              : "bg-rose-500/25 border-rose-500/40 text-rose-300"
                          }`}
                        >
                          {sc}%
                        </div>
                      ))}
                    </div>
                    <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-purple-200 flex justify-between items-center">
                      <span>🧠 SM-2 Revision Vault Due Today:</span>
                      <span className="font-mono font-bold">14 Flashcards</span>
                    </div>
                  </div>
                </div>
              )}

              {activeEngineTab === "leaderboard" && (
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      NATIONAL, STATE & DISTRICT SCHOLARS ARENA
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      Compete in Weekly Sprints & See Peer Accuracy on Every Question
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Preparation shouldn’t happen in isolation. Enter your 6-digit PIN code to lock in your home
                      jurisdiction and climb from <strong>Apprentice 🛡️</strong> to <strong>Grandmaster 👑</strong>{" "}
                      across District, State, and National leaderboards. Plus, after every single question you answer,
                      see real-time cohort telemetry showing how many students attempted that question and what
                      percentage got it right.
                    </p>
                  </div>

                  <div className="lg:col-span-5 bg-[#060813] border border-slate-800 rounded-2xl p-6 space-y-3 text-xs">
                    <div className="flex justify-between items-center text-amber-400 font-bold border-b border-slate-800 pb-2">
                      <span>🏆 NATIONAL ARENA (THIS WEEK)</span>
                      <span>Grandmaster League 👑</span>
                    </div>
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-xl bg-slate-900 flex justify-between items-center">
                        <span>#1 👑 Aarav S. (Mumbai, MH)</span>
                        <span className="font-mono font-bold text-emerald-400">94.8%</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-indigo-950/50 border border-indigo-500/40 flex justify-between items-center">
                        <span className="font-bold text-white">#4 💎 You (+12 Spots ▲)</span>
                        <span className="font-mono font-bold text-indigo-300">86.2%</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900 flex justify-between items-center text-slate-300">
                        <span>👥 Peer Stat on Q#14:</span>
                        <span className="text-amber-300 font-bold">618 Attempted • Only 19% Correct</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeEngineTab === "planner" && (
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-black bg-sky-500/20 text-sky-300 border border-sky-500/30">
                      DRAG-AND-DROP SMART PLANNER + CUSTOM PDF BUILDER
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      Algorithmic Bin-Packing Schedule & 1-Click Leave Recalculation
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Our Smart Planner automatically partitions all {data.examBody} chapters by historical PYQ
                      weightage into <strong>3 Modular Part Tests + 2 Full-Subject Mocks</strong> per paper. Drag and
                      drop chapters across tests to match your coaching class progress, generate custom{" "}
                      <strong>30m to 180m PDF Mock Papers</strong> on demand, or log a{" "}
                      <strong>Personal Leave / Bunked Test Override</strong> to automatically recalculate your weekly
                      study pace.
                    </p>
                  </div>

                  <div className="lg:col-span-5 bg-[#060813] border border-slate-800 rounded-2xl p-6 space-y-3 text-xs">
                    <div className="flex justify-between items-center font-bold text-sky-400 border-b border-slate-800 pb-2">
                      <span>📅 SMART MOCK PLANNER (3+2 BIN-PACKED)</span>
                      <span>Weightage Balanced</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                      <div className="flex justify-between font-bold text-white">
                        <span>Mock #1 (Modular Part 1)</span>
                        <span className="text-emerald-400">34.5W</span>
                      </div>
                      <div className="text-slate-400">⋮⋮ Ind AS 115 Revenue (14.0w) • Ind AS 116 Leases (12.5w)</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                      <span>🏖️ Personal Leave Logged (2 Days)</span>
                      <span className="text-indigo-300 font-bold">Auto-Shifted →</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* ============================================================= */}
          {/* SECTION 3: SAMPLE CHECKED COPY & "REASON FOR EVERY CUT"       */}
          {/* ============================================================= */}
          <section id="sample-checked-sheet" className="space-y-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-800 pb-6">
              <div>
                <span className="text-rose-400 font-bold tracking-widest text-xs uppercase">
                  Market Reality Check • Why Manual Checking Fails You
                </span>
                <h2 className="text-3xl sm:text-4xl font-black mt-1">
                  See Exactly Where Your Marks Go. Line by Line.
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "numerical", label: "FR / Costing Working Notes" },
                  { id: "audit", label: "Audit & Law Language Fix" },
                  { id: "mcq", label: "30% Case-Scenario MCQs" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveDefectTab(t.id as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeDefectTab === t.id
                        ? "bg-[#5B4BFF] text-white"
                        : "bg-[#12182B] text-slate-400 border border-slate-800 hover:text-white"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 bg-[#12182B] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
                {activeDefectTab === "numerical" && (
                  <>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-indigo-300 font-bold">
                        SAMPLE CHECKED SHEET: FR (Ind AS 16 & 37 Decommissioning)
                      </span>
                      <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                        Awarded: 6.5 / 8.0 Marks
                      </span>
                    </div>
                    <div className="space-y-3 text-xs sm:text-sm">
                      <div className="p-4 rounded-2xl bg-emerald-950/25 border border-emerald-500/30">
                        <div className="font-bold text-emerald-300">
                          ✓ Working Note 1: Present Value of Restoration Liability (+2.5 / 2.5 Marks)
                        </div>
                        <p className="text-slate-300 mt-1">
                          Correctly discounted ₹50,00,000 @ 8% for 10 years (PV factor 0.4632 = ₹23,16,000) and
                          capitalized into PPE cost as per Ind AS 16 Para 16(c).
                        </p>
                      </div>
                      <div className="p-4 rounded-2xl bg-emerald-950/25 border border-emerald-500/30">
                        <div className="font-bold text-emerald-300">
                          ✓ Working Note 2: Annual Depreciation Charge (+2.0 / 2.0 Marks)
                        </div>
                        <p className="text-slate-300 mt-1">
                          Depreciated total carrying amount (₹1,23,16,000 / 10 yrs = ₹12,31,600) accurately.
                        </p>
                      </div>
                      <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/40">
                        <div className="font-bold text-rose-300">
                          ✗ Reason for 1.5 Mark Cut: Unwinding of Discount Omitted (-1.5 Marks)
                        </div>
                        <p className="text-slate-300 mt-1">
                          <strong>What you missed:</strong> Under Ind AS 37, finance cost of ₹1,85,280 (₹23,16,000 × 8%)
                          must be charged to P&L at Year-1 end and added to the provision balance.
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {activeDefectTab === "audit" && (
                  <>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-purple-300 font-bold">
                        AUDIT & LAW &ldquo;BOOKISH LANGUAGE IMPROVEMENT&rdquo; ENGINE
                      </span>
                      <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-bold">
                        Keyword Upgrade: +2.0 Marks Saved
                      </span>
                    </div>
                    <div className="space-y-4 text-xs sm:text-sm">
                      <div className="p-4 rounded-2xl bg-rose-950/25 border border-rose-500/30">
                        <div className="font-bold text-rose-300">
                          ✗ What You Wrote (Casual Student Language — Scores 1/4 Marks):
                        </div>
                        <p className="text-slate-300 italic mt-1">
                          &ldquo;The auditor should check the physical stock himself and if he cannot go to the factory,
                          he should ask somebody else or check old bills.&rdquo;
                        </p>
                      </div>
                      <div className="p-4 rounded-2xl bg-emerald-950/25 border border-emerald-500/30">
                        <div className="font-bold text-emerald-300">
                          ✓ NexQ AI Statutory Rewrite (ICAI SA 501 Examiner Terminology — Scores 4/4 Marks):
                        </div>
                        <p className="text-slate-200 mt-1">
                          &ldquo;As per <strong>SA 501 (Audit Evidence—Specific Considerations)</strong>, where
                          inventory is material, the auditor shall obtain{" "}
                          <strong>sufficient appropriate audit evidence</strong> regarding existence and condition by
                          attendance at physical inventory counting, or perform{" "}
                          <strong>alternative audit procedures</strong> if attendance is impracticable.&rdquo;
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {activeDefectTab === "mcq" && (
                  <>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-sky-300 font-bold">
                        30:70 INTEGRATED CASE-SCENARIO MCQ SIMULATOR
                      </span>
                      <span className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 font-bold">
                        Unlimited 6/6 Blind-Solved MCQs
                      </span>
                    </div>
                    <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                      <p>
                        Students lose crucial time reading 2-page integrated case scenarios in the exam hall. NexQ AI
                        trains your speed with:
                      </p>
                      <ul className="space-y-2.5">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>
                            <strong>2-Marks Integrated Case Scenarios:</strong> Multi-para practical cases combining 4–5
                            linked MCQs just like ICAI’s 30-mark objective booklet.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>
                            <strong>Peer Cohort Accuracy & Speed Telemetry:</strong> Shows exact cohort accuracy
                            percentage and whether you spent 45s or 4m compared to AIR rankers.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>
                            <strong>Official Past Exam Lineage:</strong> 1-click popup showing the historical past exam
                            question each synthetic MCQ was modeled on.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </div>

              <div className="lg:col-span-5 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl relative">
                <img
                  src={IMAGES.stepMarkingMacro}
                  alt="Red Pen Step Marking"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-[#060813]/90 backdrop-blur border border-slate-800 px-4 py-2.5 rounded-xl flex justify-between items-center text-xs">
                  <span className="text-emerald-400 font-bold">Bi-Directional Step Canvas</span>
                  <span className="text-slate-400 font-mono">Auto-Refund Revaluation</span>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================= */}
          {/* SECTION 4: AUDITED REAL EXAM COVERAGE PROOF                   */}
          {/* ============================================================= */}
          <section className="rounded-3xl bg-gradient-to-r from-indigo-950/50 via-[#12182B] to-slate-950 border border-indigo-500/30 p-8 sm:p-10 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-emerald-400 font-bold tracking-widest text-xs uppercase">
                  Verified Predictive Alignment • {coverageProof.attemptLabel}
                </span>
                <h2 className="text-2xl sm:text-4xl font-black mt-1">
                  {coverageProof.coveragePct} Real {data.examBody} Exam Coverage Proof
                </h2>
              </div>
              <span className="px-4 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono font-black text-sm">
                {coverageProof.matchedCount} Questions Matched
              </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="p-6 rounded-2xl bg-[#060813] border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                  OFFICIAL {data.examBody} EXAM PAPER QUESTION
                </span>
                <p className="text-slate-200 font-medium leading-relaxed">{coverageProof.sampleRealQ}</p>
              </div>
              <div className="p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/40 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono uppercase text-indigo-300 font-bold">
                    NEXQ AI MOCK QUESTION BANK EQUIVALENT
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    {coverageProof.matchType}
                  </span>
                </div>
                <p className="text-white font-medium leading-relaxed">{coverageProof.sampleNexqQ}</p>
              </div>
            </div>
          </section>

          {/* ============================================================= */}
          {/* SECTION 5: FLEXIBLE TEST SERIES PLANS (FREE / FEFO / ₹1L)     */}
          {/* ============================================================= */}
          <section id="test-series-plans" className="space-y-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <span className="text-indigo-400 font-bold tracking-widest text-xs uppercase">
                  Zero Lock-In • FEFO Token Economy
                </span>
                <h2 className="text-3xl sm:text-4xl font-black mt-1">
                  Start With 30 Free Tokens. Pay ₹20/Test Thereafter.
                </h2>
              </div>

              <div className="flex items-center bg-[#12182B] p-1 rounded-xl border border-slate-800 text-xs font-bold">
                <button
                  onClick={() => setScheduleMode("unscheduled")}
                  className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                    scheduleMode === "unscheduled"
                      ? "bg-[#5B4BFF] text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Unscheduled (Write Anytime)
                </button>
                <button
                  onClick={() => setScheduleMode("scheduled")}
                  className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                    scheduleMode === "scheduled"
                      ? "bg-[#5B4BFF] text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Scheduled (Smart Planner)
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {plans.map((p: any, i: number) => (
                <div
                  key={i}
                  className={`p-7 rounded-3xl flex flex-col justify-between border transition-all ${
                    p.popular
                      ? "bg-gradient-to-b from-[#161E38] to-[#0C1222] border-indigo-500 shadow-2xl shadow-indigo-500/15 relative"
                      : "bg-[#12182B] border-slate-800"
                  }`}
                >
                  <div>
                    <span
                      className={`inline-block text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-4 ${
                        p.popular
                          ? "bg-[#5B4BFF] text-white"
                          : "bg-slate-900 text-indigo-300 border border-slate-700"
                      }`}
                    >
                      {p.badge}
                    </span>
                    <h3 className="text-xl font-black text-white">{p.name}</h3>
                    <div className="mt-3 flex items-baseline gap-1.5">
                      <span className="text-3xl font-black text-emerald-400">{p.price}</span>
                      <span className="text-xs text-slate-400">{p.unit}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-3 leading-relaxed">{p.desc}</p>

                    <ul className="space-y-2.5 mt-6 pt-5 border-t border-slate-800/80 text-xs text-slate-300">
                      {p.features.map((feat: string, fIdx: number) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setIsPanelForcedOpen(true)}
                    className={`w-full mt-8 py-3.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      p.popular
                        ? "bg-[#5B4BFF] hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"
                        : "bg-slate-900 hover:bg-slate-800 text-white border border-slate-700"
                    }`}
                  >
                    Activate {p.name} →
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* ============================================================= */}
          {/* SECTION 6: SUBJECT-BY-SUBJECT & LEVEL SYLLABUS MATRIX         */}
          {/* ============================================================= */}
          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-emerald-400 font-bold tracking-widest text-xs uppercase">
                  100% {data.examBody} New Scheme Coverage
                </span>
                <h2 className="text-3xl sm:text-4xl font-black mt-1">
                  Paper-Wise Rubric & Syllabus Matrix
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {levels.map((lvl: any, idx: number) => (
                  <button
                    key={lvl.id}
                    onClick={() => setSelectedLevel(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      selectedLevel === idx
                        ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                        : "bg-[#12182B] text-slate-300 border border-slate-800 hover:text-white"
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {levels[selectedLevel]?.subjects.map((sub: any, sIdx: number) => (
                <div
                  key={sIdx}
                  className="p-6 rounded-2xl bg-[#12182B] border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center text-xs font-mono text-indigo-400 mb-2">
                      <span>{sub.code}</span>
                      <span className="text-emerald-400">100 Marks</span>
                    </div>
                    <h3 className="text-base font-black text-white">{sub.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-800/80">
                    {sub.tags.map((tg: string, tIdx: number) => (
                      <span
                        key={tIdx}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#060813] text-slate-300 border border-slate-800"
                      >
                        {tg}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ============================================================= */}
          {/* SECTION 7: "YOU VS AIR TOPPER VS AVG" BOOSTER ANALYTICS       */}
          {/* ============================================================= */}
          <section className="rounded-3xl bg-[#12182B] border border-slate-800 p-8 sm:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-indigo-400 font-bold tracking-widest text-xs uppercase">
                  Booster & Drill-Down Analytics (Inspired by AIR Ranker Benchmarks)
                </span>
                <h2 className="text-2xl sm:text-4xl font-black mt-1">
                  You vs. AIR Topper vs. Batch Average
                </h2>
              </div>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Includes AI Revision Notes & Exam Pointers
              </span>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#060813] border border-slate-800 space-y-4">
                <div className="text-xs font-bold text-slate-400 uppercase">
                  Paper 1: Financial Reporting Benchmark
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-emerald-400">AIR Topper Score</span>
                      <span className="font-mono font-bold">78 / 100</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 w-[78%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-indigo-400">Your Current Score</span>
                      <span className="font-mono font-bold">62 / 100</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-[#5B4BFF] w-[62%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-slate-400">Batch Average</span>
                      <span className="font-mono">44 / 100</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-600 w-[44%]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#060813] border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-amber-400 uppercase">
                  ⚡ Booster Analysis: Lost Marks Recovery
                </div>
                <div className="text-3xl font-black text-white">+11.5 Marks</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Shows exactly what you <strong>could have scored (73.5/100)</strong> by fixing avoidable silly
                  mistakes: missing Ind AS paragraph numbers (+4m), un-tallied working note sub-totals (+4.5m), and SA
                  keywords (+3m).
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#060813] border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-emerald-400 uppercase">
                  📌 Half-Page AI Revision Notes & Pointers
                </div>
                <div className="text-3xl font-black text-white">100% Concept Mapped</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every syllabus concept includes concise half-page AI-synthesized revision notes, memory triggers, and
                  attempt-scoped statutory amendment alerts.
                </p>
              </div>
            </div>
          </section>

          {/* ============================================================= */}
          {/* SECTION 8: COMPARISON TABLE VS MANUAL PLATFORMS               */}
          {/* ============================================================= */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl sm:text-4xl font-black">
                NexQ AI vs. Traditional Manual {data.examBody} Test Series
              </h2>
              <p className="text-slate-400 text-sm">
                Why top aspirants are ditching slow, generic manual test series portals.
              </p>
            </div>
            <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-[#12182B]">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#0C1222] border-b border-slate-800 text-slate-300">
                    <th className="p-4 sm:p-5 font-bold">Evaluation Parameter</th>
                    <th className="p-4 sm:p-5 font-black text-indigo-300 bg-indigo-950/30 border-x border-indigo-500/20">
                      NexQ AI (3-Model Consensus)
                    </th>
                    <th className="p-4 sm:p-5 font-bold">Manual Test Series Portals</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-white">Checking Turnaround Time</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-400 bg-indigo-950/15 border-x border-indigo-500/20">
                      ⚡ 5-Min Express • 1-Hr Priority • 24-Hr Economy
                    </td>
                    <td className="p-4 sm:p-5 text-rose-400">2 to 8 Working Days Delay</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-white">Free Trial & Per-Paper Cost</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-400 bg-indigo-950/15 border-x border-indigo-500/20">
                      ✓ 30 Free Tokens on Signup (Up to 15 Papers) • ₹20/Test Thereafter
                    </td>
                    <td className="p-4 sm:p-5">₹1,500–₹3,500 Upfront Package Required</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-white">Evaluator Quality & Revaluation</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-400 bg-indigo-950/15 border-x border-indigo-500/20">
                      ✓ 3-Model AI + 1-Click Supreme Revaluation (Auto-Refund if ≥10% Shift)
                    </td>
                    <td className="p-4 sm:p-5">Checked by hurried freelancers paid ₹20/copy</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-white">Working Note & Step Marks</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-400 bg-indigo-950/15 border-x border-indigo-500/20">
                      ✓ 300-DPI Table Crop + Bi-Directional Red-Pen Canvas
                    </td>
                    <td className="p-4 sm:p-5">Vague red ticks with &ldquo;Improve presentation&rdquo;</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-white">MCQ Engine, Heatmap & Leaderboard</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-400 bg-indigo-950/15 border-x border-indigo-500/20">
                      ✓ Unlimited 6/6 Blind-Solved MCQs + Elo Heatmap + District/State/National Rank
                    </td>
                    <td className="p-4 sm:p-5">Static PDFs only</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-white">Pass Guarantee</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-400 bg-indigo-950/15 border-x border-indigo-500/20">
                      🏆 Up to ₹1,00,000 Pass Challenge Guarantee
                    </td>
                    <td className="p-4 sm:p-5">At most fee refund or none</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ============================================================= */}
          {/* SECTION 9: ₹1,00,000 PASS CHALLENGE                           */}
          {/* ============================================================= */}
          <section className="rounded-3xl bg-gradient-to-br from-emerald-950/40 to-slate-950 border border-emerald-500/30 p-8 sm:p-12 grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-black">
                100% RISK-REVERSAL GUARANTEE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black">
                The ₹1,00,000 {data.examBody} Pass Challenge
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Other platforms promise a basic fee refund. We back your preparation with up to{" "}
                <strong>₹1,00,000</strong>. Complete the 5+2 Mock Series schedule, hit the 60% Consensus benchmark
                score, and clear your official {data.examBody} attempt—or claim under our Pass Challenge terms.
              </p>
              <button
                onClick={() => setIsPanelForcedOpen(true)}
                className="px-7 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm transition-colors cursor-pointer"
              >
                Enroll & Activate ₹1L Pass Challenge →
              </button>
            </div>
            <div className="lg:col-span-5 flex justify-center">
              <img
                src={IMAGES.passChallengeBadge}
                alt="₹1,00,000 Pass Challenge"
                className="w-60 h-60 rounded-2xl shadow-2xl border border-emerald-500/30"
              />
            </div>
          </section>

          {/* ============================================================= */}
          {/* SECTION 10: EXAM-SPECIFIC FAQs                                */}
          {/* ============================================================= */}
          <section className="space-y-8 pb-12">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Got Doubts About Evaluation?
              </span>
              <h2 className="text-3xl font-black">Frequently Asked Questions</h2>
            </div>
            <div className="max-w-4xl mx-auto space-y-3">
              {faqs.map((f, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-[#12182B] border border-slate-800 overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full p-5 sm:p-6 text-left flex justify-between items-center gap-4 font-bold text-sm sm:text-base text-white hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    <span>{f.q}</span>
                    <span className="text-indigo-400 font-mono text-xl">
                      {activeFaq === i ? "−" : "+"}
                    </span>
                  </button>
                  {activeFaq === i && (
                    <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/50 pt-4">
                      {f.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </motion.div>

      {/* ================================================================= */}
      {/* RIGHT PANEL: SCROLL-SYNCED COLLAPSING LOGIN PANE                  */}
      {/* ================================================================= */}
      <motion.div
        className="fixed top-0 right-0 h-screen bg-[#0C1222] border-l border-slate-800/80 shadow-2xl z-50 flex flex-col overflow-hidden"
        style={{ width: isPanelForcedOpen ? undefined : panelWidth }}
        animate={{ width: isPanelForcedOpen ? "30%" : undefined }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Collapsed Strip State */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center cursor-pointer hover:bg-slate-800/50 transition-colors group z-10"
          style={{
            opacity: isPanelForcedOpen ? 0 : textOpacity,
            pointerEvents: isScrolledPast && !isPanelForcedOpen ? "auto" : "none",
          }}
          animate={{ opacity: isPanelForcedOpen ? 0 : undefined }}
          onClick={() => setIsPanelForcedOpen(true)}
        >
          <div className="absolute top-6 w-2 h-2 rounded-full bg-[#5B4BFF] animate-pulse shadow-[0_0_10px_#5B4BFF]" />
          <div className="rotate-90 whitespace-nowrap text-sm font-black tracking-widest text-slate-400 group-hover:text-white transition-colors">
            ▶ OPEN {data.examBody} LOGIN (30 FREE TOKENS)
          </div>
        </motion.div>

        {/* Full Open Login Form State */}
        <motion.div
          className="absolute top-0 right-0 h-full w-[30vw] min-w-[380px] flex flex-col items-center justify-center p-6 sm:p-8 z-20"
          style={{
            opacity: isPanelForcedOpen ? undefined : formOpacity,
            pointerEvents: isPanelForcedOpen || !isScrolledPast ? "auto" : "none",
          }}
          animate={{ opacity: isPanelForcedOpen ? 1 : undefined }}
        >
          {isPanelForcedOpen && (
            <button
              onClick={() => setIsPanelForcedOpen(false)}
              className="absolute top-6 left-6 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              ✕
            </button>
          )}

          <div className="w-full max-w-[380px] bg-[#12182B] border border-slate-800 rounded-3xl p-6 shadow-2xl">
            {/* Free Welcome Grant Pill above Login Tabs */}
            <div className="mb-4 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center">
              <span className="text-[11px] font-black text-emerald-300 block">
                🎁 30 FREE WELCOME TOKENS ON SIGNUP
              </span>
              <span className="text-[10px] text-slate-300">
                Up to 15 Free Paper Evaluations + 365d Unlimited MCQ Arena
              </span>
            </div>

            {/* Google GSI Script for 1-Click Google Login right on the Exam Page */}
            <Script
              src="https://accounts.google.com/gsi/client"
              strategy="lazyOnload"
              onReady={() => {
                const win = window as any;
                if (win.google && process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
                  win.google.accounts.id.initialize({
                    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                    callback: handleGoogleCallback,
                  });
                  const btnEl = document.getElementById("marketing-google-btn");
                  if (btnEl) {
                    win.google.accounts.id.renderButton(btnEl, {
                      theme: "filled_blue",
                      size: "large",
                      width: 330,
                    });
                  }
                }
              }}
            />

            {/* 3-Way Tab Switcher */}
            <div className="flex bg-[#060813] rounded-xl p-1 mb-4">
              <button
                type="button"
                onClick={() => { setAuthTab("email"); setOtpSent(false); setAuthError(""); }}
                className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  authTab === "email" ? "bg-[#5B4BFF] text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => { setAuthTab("phone"); setOtpSent(false); setAuthError(""); }}
                className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  authTab === "phone" ? "bg-[#5B4BFF] text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Phone OTP
              </button>
              <button
                type="button"
                onClick={() => { setAuthTab("register"); setOtpSent(false); setAuthError(""); }}
                className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  authTab === "register" ? "bg-[#5B4BFF] text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Register
              </button>
            </div>

            {authError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
                {authError}
              </div>
            )}
            {authSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs">
                {authSuccess}
              </div>
            )}

            {/* PHONE OTP FORM */}
            {authTab === "phone" ? (
              <form onSubmit={handleVerifyWhatsAppOtp} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">WhatsApp Number</label>
                  <div className="flex items-center gap-3 px-4 py-3 bg-[#060813] border border-slate-800 rounded-xl focus-within:border-[#5B4BFF]">
                    <span className="text-xs font-bold text-slate-400">+91</span>
                    <input
                      type="tel"
                      required
                      disabled={otpSent}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98765 43210"
                      className="bg-transparent w-full text-sm text-white placeholder-slate-600 outline-none"
                    />
                  </div>
                </div>

                {otpSent && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400">Enter 6-Digit WhatsApp OTP</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="123456"
                      className="w-full px-4 py-3 bg-[#060813] border border-slate-800 rounded-xl text-center text-lg font-mono tracking-widest text-white outline-none focus:border-[#5B4BFF]"
                    />
                  </div>
                )}

                {!otpSent ? (
                  <button
                    type="button"
                    disabled={authLoading}
                    onClick={handleSendWhatsAppOtp}
                    className="w-full py-3.5 mt-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded-xl text-sm font-bold text-white shadow-lg transition-all cursor-pointer"
                  >
                    {authLoading ? "Sending OTP..." : "Send WhatsApp OTP"}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-3.5 mt-2 bg-[#5B4BFF] hover:bg-[#4b3de3] disabled:opacity-50 rounded-xl text-sm font-bold text-white shadow-lg transition-all cursor-pointer"
                  >
                    {authLoading ? "Verifying..." : "Verify & Enter Arena →"}
                  </button>
                )}
              </form>
            ) : (
              /* EMAIL LOGIN & REGISTER FORM */
              <form onSubmit={handleEmailOrRegisterSubmit} className="space-y-4">
                {authTab === "register" && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400">Full Name</label>
                    <div className="flex items-center gap-3 px-4 py-3 bg-[#060813] border border-slate-800 rounded-xl focus-within:border-[#5B4BFF]">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Deepak Bohra"
                        className="bg-transparent w-full text-sm text-white placeholder-slate-600 outline-none"
                      />
                    </div>
                  </div>
                )}

                {!otpSent ? (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400">Email Address</label>
                      <div className="flex items-center gap-3 px-4 py-3 bg-[#060813] border border-slate-800 rounded-xl focus-within:border-[#5B4BFF]">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="student@mcqengine.com"
                          className="bg-transparent w-full text-sm text-white placeholder-slate-600 outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold text-slate-400">Password</label>
                        <a
                          href={`${APP_BASE}/login?exam=${data.slug}`}
                          className="text-xs text-[#5B4BFF] hover:underline"
                        >
                          Forgot?
                        </a>
                      </div>
                      <div className="flex items-center gap-3 px-4 py-3 bg-[#060813] border border-slate-800 rounded-xl focus-within:border-[#5B4BFF]">
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="bg-transparent w-full text-sm text-white tracking-widest placeholder-slate-600 outline-none"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400">
                      Enter 6-Digit Force-Logout Override Code
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="123456"
                      className="w-full px-4 py-3 bg-[#060813] border border-slate-800 rounded-xl text-center text-lg font-mono tracking-widest text-white outline-none focus:border-[#5B4BFF]"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3.5 mt-2 bg-[#5B4BFF] hover:bg-[#4b3de3] disabled:opacity-50 rounded-xl text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all cursor-pointer"
                >
                  {authLoading
                    ? "Authenticating..."
                    : otpSent
                    ? "Verify & Force Login"
                    : authTab === "register"
                    ? "Claim 30 Free Tokens & Register"
                    : "Sign In to Arena"}
                </button>
              </form>
            )}

            {/* Divider */}
            <div className="flex items-center gap-4 my-4">
              <div className="flex-1 h-px bg-slate-800" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Or Continue With
              </span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            {/* Target element rendered by Google GSI Script */}
            <div id="marketing-google-btn" className="w-full flex justify-center mb-2 min-h-[44px]"></div>

            {/* Fallback button if Google script is delayed */}

              

            <a
              href={`${APP_BASE}/login?exam=${data.slug}&provider=google`}
              className="w-full flex items-center justify-between px-4 py-3 bg-[#1A73E8] hover:bg-blue-600 rounded-xl transition-colors"
            >
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-white">Continue with Google</span>
                <span className="text-[10px] text-blue-100">Instant 1-Click {data.examBody} Access</span>
              </div>
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </div>
            </a>

            <a
              href={`${APP_BASE}/institute/login`}
              className="block text-center mt-5 text-[11px] text-[#5B4BFF] hover:text-indigo-400 transition-colors"
            >
              Institute or Organization Admin? Log in here →
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}