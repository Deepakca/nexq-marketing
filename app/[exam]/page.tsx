// FILE: ./app/[exam]/page.tsx
import { EXAM_CONFIG } from "../../config/exams";
import Link from "next/link";

export default async function ExamLandingPage({ params }: { params: Promise<{ exam: string }> }) {
  const { exam } = await params;
  const data = EXAM_CONFIG[exam.toLowerCase()];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Active Campaign Banner */}
      {data.activeCampaign?.enabled && (
        <div className="bg-indigo-600 text-center py-2 text-sm font-bold">
          {data.activeCampaign.bannerText} 
          <span className="ml-2 bg-slate-950 px-2 py-0.5 rounded text-indigo-300">
            Use Code: {data.activeCampaign.promoCode}
          </span>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-slate-800 p-6 flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/" className="font-black text-xl flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">N</div>
          NexQ AI
        </Link>
        <span className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-xs font-mono text-slate-300">
          {data.examBody} Arena
        </span>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto py-24 px-6 text-center space-y-8">
        <h1 className="text-5xl font-black">{data.title}</h1>
        <p className="text-xl text-slate-400">{data.description}</p>
        
        <div className="flex justify-center gap-4 pt-6">
          <a href={data.checkoutUrl} className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl shadow-lg transition-transform hover:scale-105">
            Enroll Now — {data.pricing}
          </a>
        </div>

        {/* Features List */}
        <div className="pt-16 grid sm:grid-cols-3 gap-6 text-left">
          {data.features.map((feature: string, idx: number) => (
            <div key={idx} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
              <div className="text-indigo-400 font-black mb-2">✓</div>
              <div className="text-sm font-bold">{feature}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}