// FILE: nexq-marketing/app/page.tsx
import Link from 'next/link';

export default function MarketingHome() {
  // Dynamically resolve URLs based on the environment
  const isDev = process.env.NODE_ENV === 'development';
  const rootDomain = isDev ? 'localhost:3000' : 'nexqai.in';
  const protocol = isDev ? 'http://' : 'https://';
  
  // The Core App Gateway URL
  const APP_URL = `${protocol}app.${rootDomain}`;

  const streams = [
    { slug: "ca", name: "CA Final & Inter", desc: "ICAI 30:70 Hybrid + Red-Pen Step Marking & ₹1L Pass Challenge" },
    { slug: "cs", name: "CS Executive & Professional", desc: "ICSI Case-Law & Drafting Rubric Evaluation in 60s" },
    { slug: "cma", name: "CMA Inter & Final", desc: "ICMAI Step-Wise Numerical & Working Note Grader" },
    { slug: "upsc", name: "UPSC CSE Mains & Prelims", desc: "GS I-IV 250-Word Structural & Multidimensional Grader" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
      {/* HEADER */}
      <header className="max-w-7xl mx-auto w-full flex justify-between items-center py-6 px-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold shadow-lg">N</div>
          <span className="text-xl font-black tracking-tight">NexQ AI</span>
        </div>
        <div className="flex gap-4">
          <Link 
            href={`${APP_URL}/institute/login`} 
            className="hidden md:block px-4 py-2 text-sm font-bold text-indigo-400 border border-indigo-500/30 rounded-xl hover:bg-indigo-950/40 transition-colors"
          >
            Coaching Portal
          </Link>
          <Link 
            href={`${APP_URL}/login`} 
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-indigo-600/20"
          >
            Student Sign In
          </Link>
        </div>
      </header>

      {/* MAIN HERO & GRID */}
      <main className="max-w-5xl mx-auto my-auto py-16 px-6 text-center space-y-16 w-full">
        <div className="space-y-6">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            3-Model Consensus AI Exam Engine
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
            Select Your Exam Arena
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Dedicated exam portals calibrated to official examining body rubrics, past papers, and step-marking schemes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 text-left">
          {streams.map((s) => (
            <a
              key={s.slug}
              href={`${protocol}${s.slug}.${rootDomain}`}
              className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-indigo-500 transition-all group shadow-xl"
            >
              <div className="text-xl font-bold group-hover:text-indigo-400 transition-colors flex justify-between items-center">
                {s.name}
                <span className="inline-block transition-transform group-hover:translate-x-1 text-indigo-500">→</span>
              </div>
              <p className="text-sm text-slate-400 mt-3 leading-relaxed h-10">{s.desc}</p>
              <div className="text-[11px] font-mono font-semibold text-indigo-400 mt-6 bg-indigo-500/10 inline-block px-3 py-1.5 rounded-lg border border-indigo-500/20">
                {s.slug}.{rootDomain}
              </div>
            </a>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="text-center text-xs text-slate-600 py-8 border-t border-slate-900">
        © 2026 NexQ AI. High-stakes exam assessment engine.
      </footer>
    </div>
  );
}