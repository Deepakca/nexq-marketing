// FILE: ./app/i/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const instant = false;

type Props = { params: Promise<{ slug: string }> };

async function getInstituteData(slug: string) {
  try {
    const res = await fetch(`https://api.nexqai.in/api/v1/institute/settings/resolve-portal?host=${slug}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getInstituteData(slug);
  if (!data) return { title: "Institute Not Found | NexQ AI" };

  return {
    title: `${data.name} — AI Mock Test Portal`,
    description: `Official evaluation portal for ${data.name} powered by NexQ AI.`,
  };
}

export default async function InstituteLandingPage({ params }: Props) {
  const { slug } = await params;
  const portal = await getInstituteData(slug);

  if (!portal || portal.portal_type !== "INSTITUTE") {
    notFound();
  }

  const landing = portal.landing_config || {};
  const branding = portal.branding || {};

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
      <header className="border-b border-slate-800 py-4 px-6 flex justify-between items-center max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3">
          {branding.logo_url && (
            <img src={branding.logo_url} alt={portal.name} className="h-8 w-auto rounded-md" />
          )}
          <div>
            <h1 className="text-lg font-black">{portal.name}</h1>
            <span className="text-[10px] text-slate-500 font-mono">POWERED BY NEXQ AI</span>
          </div>
        </div>
        <a
          href={`https://app.nexqai.in/login?institute=${slug}`}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-bold transition-colors"
        >
          Student Login
        </a>
      </header>

      <main className="max-w-4xl mx-auto py-20 px-6 text-center space-y-8 flex-1">
        <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-bold">
          {landing.hero_badge || "Official Assessment Portal"}
        </span>
        <h2 className="text-4xl font-black">
          {landing.hero_headline || `${portal.name} Test Series`}
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          {landing.hero_subheadline || "Submit handwritten answer sheets for 60-second evaluations."}
        </p>

        {landing.faculty_members?.length > 0 && (
          <div className="pt-10 text-left">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Faculty Panel</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {landing.faculty_members.map((fac: any, i: number) => (
                <div key={i} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-3">
                  <img src={fac.photo_url || "/images/avatar-placeholder.png"} alt={fac.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="text-xs font-bold text-white">{fac.name}</div>
                    <div className="text-[11px] text-indigo-400">{fac.subject}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-600">
        © 2026 {portal.name}. Verified Partner Portal powered by NexQ AI.
      </footer>
    </div>
  );
}