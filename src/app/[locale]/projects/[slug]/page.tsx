import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { projects as staticProjects } from '@/lib/data';
import ProjectDetailClient from '@/components/ProjectDetailClient';

export const dynamic = 'force-dynamic';

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  let project;
  try {
    project = await prisma.project.findUnique({ where: { slug, published: true } });
  } catch {
    project = staticProjects.find((p) => p.slug === slug) ?? null;
  }

  if (!project) notFound();

  return <ProjectDetailClient project={{ ...project, articles: [] }} />;
}
