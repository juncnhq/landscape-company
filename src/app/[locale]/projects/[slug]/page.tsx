import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import ProjectDetailClient from '@/components/ProjectDetailClient';

export const dynamic = 'force-dynamic';

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = await prisma.project.findUnique({ where: { slug, published: true } });
  if (!project) notFound();

  return <ProjectDetailClient project={{ ...project, articles: [] }} />;
}
