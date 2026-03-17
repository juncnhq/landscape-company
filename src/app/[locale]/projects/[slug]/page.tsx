import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { projects } from '@/lib/data';
import { routing } from '@/i18n/routing';
import ProjectDetailClient from '@/components/ProjectDetailClient';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug }))
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return <ProjectDetailClient project={project} />;
}
