// FILE: ./app/[exam]/layout.tsx
import { EXAM_CONFIG } from "../../config/exams";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ exam: string }> };

export function generateStaticParams() {
  return Object.keys(EXAM_CONFIG).map((exam) => ({ exam }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { exam } = await params;
  const data = EXAM_CONFIG[exam.toLowerCase()];
  
  if (!data) return { title: "Exam Not Found" };

  return {
    title: `${data.title} | NexQ AI`,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
    },
  };
}

export default async function ExamLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ exam: string }>;
}) {
  const { exam } = await params;
  if (!EXAM_CONFIG[exam.toLowerCase()]) notFound();

  return <>{children}</>;
}