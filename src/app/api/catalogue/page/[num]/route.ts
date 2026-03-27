import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

type ProjectRow = { id: string; title: string; titleEn: string | null; category: string; location: string | null; year: string | null; image: string | null; description: string | null; descriptionEn: string | null };

function coverPage(total: number, coverImage: string): string {
  return `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 100%; height: 100vh; font-family: 'Georgia', serif; overflow: hidden; background: #111; }
  .cover {
    width: 100%; height: 100%;
    background-image: url('${coverImage}');
    background-size: cover; background-position: center;
    position: relative;
    display: flex; flex-direction: column;
    justify-content: flex-end;
    padding: 40px;
  }
  .overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 55%, transparent 100%);
  }
  .content { position: relative; z-index: 1; color: white; }
  .brand { font-size: 10px; letter-spacing: 7px; text-transform: uppercase; color: #bbb; margin-bottom: 18px; }
  .title { font-size: 40px; font-weight: 300; line-height: 1.15; margin-bottom: 10px; }
  .subtitle { font-size: 13px; color: #999; font-style: italic; margin-bottom: 28px; letter-spacing: 0.5px; }
  .divider { width: 36px; height: 1px; background: #555; margin-bottom: 18px; }
  .count { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #777; }
</style>
</head>
<body>
<div class="cover">
  <div class="overlay"></div>
  <div class="content">
    <div class="brand">FAM Landscape</div>
    <div class="title">Catalogue<br>Dự Án</div>
    <div class="subtitle">Portfolio of Landscape Works</div>
    <div class="divider"></div>
    <div class="count">${total} công trình · 17+ năm kinh nghiệm</div>
  </div>
</div>
</body>
</html>`;
}

function projectPage(project: ProjectRow, locale: string): string {
  const title = locale === 'en' ? project.titleEn : project.title;
  const description = locale === 'en' ? project.descriptionEn : project.description;

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 100%; height: 100vh; font-family: 'Georgia', serif; overflow: hidden; }
  .page { width: 100%; height: 100%; display: flex; flex-direction: column; background: #fafaf8; }
  .img-wrap {
    flex: 1;
    background-image: url('${project.image}');
    background-size: cover; background-position: center;
    position: relative;
    min-height: 0;
  }
  .img-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.25) 100%);
  }
  .cat-badge {
    position: absolute; top: 14px; left: 14px;
    background: rgba(255,255,255,0.92);
    font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
    padding: 4px 10px; color: #333;
  }
  .info { padding: 16px 20px; background: #1c1c1c; color: white; flex-shrink: 0; }
  .info-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px; }
  .title { font-size: 14px; font-weight: 400; line-height: 1.35; flex: 1; padding-right: 10px; }
  .year { font-size: 11px; color: #666; white-space: nowrap; }
  .location { font-size: 11px; color: #888; margin-bottom: 7px; }
  .desc {
    font-size: 11px; color: #999; line-height: 1.55;
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
  }
</style>
</head>
<body>
<div class="page">
  <div class="img-wrap">
    <div class="img-overlay"></div>
    <div class="cat-badge">${project.category}</div>
  </div>
  <div class="info">
    <div class="info-row">
      <div class="title">${title}</div>
      <div class="year">${project.year}</div>
    </div>
    <div class="location">${project.location}</div>
    <div class="desc">${description}</div>
  </div>
</div>
</body>
</html>`;
}

function backCoverPage(): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 100%; height: 100vh;
    background: #111; font-family: 'Georgia', serif; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
  }
  .content { text-align: center; color: white; }
  .logo { font-size: 28px; font-weight: 300; letter-spacing: 8px; text-transform: uppercase; margin-bottom: 18px; }
  .line { width: 36px; height: 1px; background: #444; margin: 0 auto 18px; }
  .tagline { font-size: 10px; color: #666; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 28px; }
  .contact { font-size: 11px; color: #555; line-height: 2; }
</style>
</head>
<body>
<div class="content">
  <div class="logo">FAM</div>
  <div class="line"></div>
  <div class="tagline">Landscape · Design · Construction</div>
  <div class="contact">
    www.fam.com.vn<br>
    (+84) 02363 611 589<br>
    Đà Nẵng, Việt Nam
  </div>
</div>
</body>
</html>`;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ num: string }> }
) {
  const { num } = await params;
  const pageIndex = parseInt(num, 10);
  const locale = request.nextUrl.searchParams.get('locale') ?? 'vi';

  if (isNaN(pageIndex)) {
    return new Response('Invalid page number', { status: 400 });
  }

  const projects = await prisma.project.findMany({
    where: { published: true },
    select: { id: true, title: true, titleEn: true, category: true, location: true, year: true, image: true, description: true, descriptionEn: true },
    orderBy: { createdAt: 'desc' },
  });

  let html: string;
  if (pageIndex === 0) {
    html = coverPage(projects.length, projects[0]?.image ?? '');
  } else if (pageIndex <= projects.length) {
    html = projectPage(projects[pageIndex - 1], locale);
  } else {
    html = backCoverPage();
  }

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
