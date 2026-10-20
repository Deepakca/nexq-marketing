// FILE: ./app/i/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

// Fetch from AWS API (Replace with your actual AWS backend endpoint)
async function getInstituteData(slug: string) {
  try {
    const res = await fetch(`https://api.nexqai.in/v1/institutes/${slug}`, {
      next: { revalidate: 300 }, // Cache on Vercel for 5 minutes
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null; // Fallback for dev mode without live API
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const institute = await getInstituteData(slug);
  
  if (!institute) return { title: "Institute Not Found | NexQ AI" };
  return {
    title: `${institute.name} — AI Mock Test Portal`,
    description: `Official evaluation portal for ${institute.name} powered by NexQ AI.`,
  };
}

export default async function InstituteLandingPage({ params }: Props) {
  const { slug } = await params;
  const institute = await getInstituteData(slug);

  // If institute isn't found in AWS DB, show 404
  if (!institute) notFound(); 

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 py-4 px-6 flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-black">{institute.name}</h1>
          <span className="text-[10px] text-slate-500 font-mono">POWERED BY NEXQ AI</span>
        </div>
        <a href={`https://app.nexqai.in/login?institute=${slug}`} className="px-5 py-2 bg-indigo-600 rounded-lg text-sm font-bold">
          Student Login
        </a>
      </header>

      <main className="max-w-4xl mx-auto py-20 px-6 text-center space-y-8">
        <h2 className="text-4xl font-black">{institute.headline || `${institute.name} Mock Series`}</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          {institute.tagline || "Submit handwritten answer sheets for 60-second evaluations."}
        </p>

        {/* Render Packages from DB */}
        <div className="grid sm:grid-cols-2 gap-6 pt-10 text-left">
          {institute.packages?.map((pkg: any) => (
            <div key={pkg.id} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
              <h3 className="text-xl font-bold">{pkg.title}</h3>
              <p className="text-slate-400 text-sm mt-2">{pkg.description}</p>
              <div className="mt-6 flex justify-between items-center">
                <span className="text-emerald-400 font-black">₹{pkg.price}</span>
                <a href={`https://app.nexqai.in/enroll?package=${pkg.id}&institute=${slug}`} className="px-4 py-2 bg-slate-800 rounded-lg text-sm font-bold">
                  Enroll
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}