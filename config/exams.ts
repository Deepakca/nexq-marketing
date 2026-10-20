// FILE: ./config/exams.ts
export const EXAM_CONFIG: Record<string, any> = {
  ca: {
    slug: "ca",
    name: "CA Final & Inter",
    title: "CA Final AI Test Series & ₹1L Pass Challenge",
    description: "Upload handwritten ICAI answers. Get Ind AS and working note step-marking in 60s.",
    examBody: "ICAI",
    activeCampaign: {
      enabled: true,
      bannerText: "MAY 2027 ATTEMPT: Enroll in the ₹1L Pass Challenge today.",
      promoCode: "CAMAY27",
    },
    features: ["Ind AS & SA Citation Audits", "Step-Wise Working Note Marks", "ICAI 30:70 Hybrid Scheme Calibration"],
    pricing: "₹1,499 / module",
    checkoutUrl: "https://app.nexqai.in/enroll?exam=ca"
  },
  cs: {
    slug: "cs",
    name: "CS Executive & Professional",
    title: "CS AI Case-Law & Drafting Evaluation",
    description: "Evaluate your Company Law board resolutions, legal language, and NCLT/SC citations in 60s.",
    examBody: "ICSI",
    activeCampaign: { enabled: false },
    features: ["Resolution Format Grader", "Companies Act Section Check", "Case-Law Precedent Matcher"],
    pricing: "₹1,499 / module",
    checkoutUrl: "https://app.nexqai.in/enroll?exam=cs"
  },
  cma: {
    slug: "cma",
    name: "CMA Inter & Final",
    title: "CMA Step-Wise Numerical Evaluator",
    description: "Awards partial step marks for Cost Sheet formulas even when final balance totals diverge.",
    examBody: "ICMAI",
    activeCampaign: { enabled: false },
    features: ["Cost Sheet Formula Audit", "Variance Step Marking", "CAS Standard Verification"],
    pricing: "₹1,499 / module",
    checkoutUrl: "https://app.nexqai.in/enroll?exam=cma"
  },
  upsc: {
    slug: "upsc",
    name: "UPSC CSE Mains",
    title: "UPSC GS Mains AI Answer Evaluation",
    description: "Multidimensional structural evaluation for GS I-IV and Essay papers.",
    examBody: "UPSC",
    activeCampaign: {
      enabled: false,
      bannerText: "MAINS CRASH COURSE LIVE.",
      promoCode: "MAINS100",
    },
    features: ["Directive Word Alignment", "Constitutional Article/Data Mapping", "Topper Percentile Benchmarking"],
    pricing: "₹1,999 / test",
    checkoutUrl: "https://app.nexqai.in/enroll?exam=upsc"
  }
};