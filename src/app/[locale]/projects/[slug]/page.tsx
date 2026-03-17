import { notFound } from 'next/navigation';
import { projects } from '@/lib/data';
import ProjectDetailClient from '@/components/ProjectDetailClient';

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return <ProjectDetailClient project={project} />;
}
