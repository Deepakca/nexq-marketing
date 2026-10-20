// FILE: ./app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NexQ AI | 3-Model Consensus AI Exam Evaluation for CA, CS, CMA & UPSC",
  description:
    "Stop waiting 14 days for test series feedback. Grade handwritten CA, CS, CMA & UPSC answer sheets in 60 seconds with red-pen step marking and our ₹1 Lakh Pass Challenge.",
  keywords: [
    "CA Final AI Test Series",
    "ICAI Step Marking AI Evaluator",
    "UPSC Mains Answer Evaluation AI",
    "CS Executive Case Law Grader",
    "CMA Inter Numerical Evaluator",
    "NexQ AI",
    "₹1 Lakh Pass Challenge",
  ],
  metadataBase: new URL("https://nexqai.in"),
  openGraph: {
    title: "NexQ AI — Grade Handwritten Exam Sheets in 60 Seconds",
    description:
      "3-Model Consensus AI calibrated to official ICAI, ICSI, ICMAI & UPSC rubrics. Take the ₹1,00,000 Pass Challenge.",
    url: "https://nexqai.in",
    siteName: "NexQ AI",
    images: [
      {
        url: "/images/hero-preview.jpg",
        width: 1200,
        height: 630,
        alt: "NexQ AI Exam Assessment Engine",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexQ AI | High-Stakes Exam Assessment Engine",
    description: "60-second Red-Pen step marking for CA, CS, CMA & UPSC.",
    images: ["/images/hero-preview.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "NexQ AI",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Web",
        "url": "https://nexqai.in",
        "description":
          "3-Model Consensus AI exam assessment engine for CA Final & Inter, CS Executive, CMA, and UPSC CSE Mains.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR",
        },
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does NexQ AI's 3-Model Consensus Engine evaluate handwritten answers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Every uploaded handwritten answer sheet is evaluated in parallel by three specialized AI models: Model A audits statutory provisions and accounting standards (Ind AS/SA), Model B verifies step-wise working notes and calculations, and Model C aligns scores with official ICAI, ICSI, ICMAI, and UPSC rubrics.",
            },
          },
          {
            "@type": "Question",
            "name": "How does the ₹1,00,000 Pass Challenge work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "CA Final and Inter aspirants who enroll in the Pass Challenge track, complete the scheduled full-length AI-evaluated mock test series, and achieve the required benchmark scores are backed by up to ₹1,00,000 in risk-reversal guarantee if they do not pass their official examination.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-950 text-white selection:bg-indigo-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}