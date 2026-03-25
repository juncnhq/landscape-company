/**
 * Generate demo catalog PDF for FAM Landscape
 * Run: node scripts/generate-catalog.mjs
 */
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { writeFileSync } from 'fs';

const projects = [
  { title: 'BRG Da Nang Golf Course', category: 'Golf', location: 'Da Nang', client: 'BRG Group', year: '2015',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=900&q=80' },
  { title: 'Ba Na Hills - Suoi Mo Golf', category: 'Golf', location: 'Da Nang', client: 'Sun Group', year: '2017',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=900&q=80' },
  { title: 'Laguna Lang Co Golf Course', category: 'Golf', location: 'Thua Thien Hue', client: 'Laguna Vietnam', year: '2016',
    image: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=900&q=80' },
  { title: 'Da Nang Golf Club - The Dunes', category: 'Golf', location: 'Da Nang', client: 'VinaCapital', year: '2010',
    image: 'https://images.unsplash.com/photo-1611374243147-44a702c2d44c?w=900&q=80' },
  { title: 'Montgomerie Links Golf Course', category: 'Golf', location: 'Quang Nam', client: 'VinaCapital', year: '2012',
    image: 'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=900&q=80' },
  { title: 'FLC Quy Nhon Golf Course', category: 'Golf', location: 'Binh Dinh', client: 'FLC Group', year: '2019',
    image: 'https://images.unsplash.com/photo-1542683581-0e1d3a30f06b?w=900&q=80' },
  { title: 'Furama Resort Da Nang', category: 'Resort', location: 'Da Nang', client: 'Furama Resort', year: '2014',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=80' },
  { title: 'Vinpearl Resort & Spa', category: 'Resort', location: 'Nha Trang', client: 'Vingroup', year: '2018',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80' },
  { title: 'InterContinental Sun Peninsula', category: 'Resort', location: 'Da Nang', client: 'IHG', year: '2013',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80' },
  { title: 'Green Urban District Da Nang', category: 'Urban', location: 'Da Nang', client: 'City of Da Nang', year: '2020',
    image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=900&q=80' },
  { title: 'Vinhomes Ocean Park', category: 'Residential', location: 'Ha Noi', client: 'Vingroup', year: '2021',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80' },
  { title: 'Hoi An Central Park', category: 'Urban', location: 'Hoi An', client: 'Quang Nam Province', year: '2019',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80' },
];

const W = 841.89;
const H = 595.28;

const GREEN = rgb(0.18, 0.38, 0.22);
const DARK  = rgb(0.08, 0.08, 0.08);
const GRAY  = rgb(0.45, 0.45, 0.45);
const LIGHT = rgb(0.92, 0.92, 0.92);
const WHITE = rgb(1, 1, 1);

async function fetchJpg(url) {
  try {
    console.log(`  Fetching: ${url.split('?')[0].split('/').pop()}...`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  } catch (e) {
    console.warn(`  Warning: failed to fetch image (${e.message}), skipping`);
    return null;
  }
}

async function generate() {
  const doc = await PDFDocument.create();
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontReg  = await doc.embedFont(StandardFonts.Helvetica);

  // Pre-fetch all images
  console.log('Fetching project images...');
  const images = await Promise.all(projects.map(p => fetchJpg(p.image)));
  const embeddedImgs = await Promise.all(
    images.map(buf => buf ? doc.embedJpg(buf).catch(() => null) : null)
  );

  // Also fetch a cover background image
  console.log('Fetching cover image...');
  const coverBuf = await fetchJpg('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80');
  const coverImg = coverBuf ? await doc.embedJpg(coverBuf).catch(() => null) : null;

  // ── COVER PAGE ─────────────────────────────────────────────────────────────
  const cover = doc.addPage([W, H]);
  cover.drawRectangle({ x: 0, y: 0, width: W, height: H, color: DARK });

  // Background image on right half
  if (coverImg) {
    cover.drawImage(coverImg, { x: W * 0.45, y: 0, width: W * 0.55, height: H });
    // Dark overlay on image
    cover.drawRectangle({ x: W * 0.45, y: 0, width: W * 0.55, height: H, color: rgb(0, 0, 0), opacity: 0.45 });
  } else {
    cover.drawRectangle({ x: W * 0.45, y: 0, width: W * 0.55, height: H, color: rgb(0.12, 0.25, 0.14) });
  }

  // Green accent bar
  cover.drawRectangle({ x: 0, y: 0, width: 8, height: H, color: GREEN });

  // Branding
  cover.drawText('FAM', { x: 50, y: H - 120, size: 80, font: fontBold, color: WHITE });
  cover.drawText('LANDSCAPE', { x: 50, y: H - 162, size: 26, font: fontReg, color: rgb(0.55, 0.80, 0.55), letterSpacing: 10 });
  cover.drawLine({ start: { x: 50, y: H - 182 }, end: { x: 360, y: H - 182 }, thickness: 1, color: GREEN });
  cover.drawText('LANDSCAPE DESIGN & CONSTRUCTION', { x: 50, y: H - 205, size: 9, font: fontReg, color: rgb(0.45, 0.65, 0.45), letterSpacing: 2.5 });

  cover.drawText('PROJECT CATALOG', { x: 50, y: H / 2 - 10, size: 8, font: fontReg, color: rgb(0.45, 0.45, 0.45), letterSpacing: 2 });
  cover.drawText(`${projects.length} FEATURED`, { x: 50, y: H / 2 - 40, size: 36, font: fontBold, color: WHITE });
  cover.drawText('PROJECTS', { x: 50, y: H / 2 - 76, size: 36, font: fontBold, color: GREEN });

  const cats = [...new Set(projects.map(p => p.category))];
  cats.forEach((cat, i) => {
    const count = projects.filter(p => p.category === cat).length;
    cover.drawText(`${cat.toUpperCase()}  (${count})`, { x: 50, y: 110 - i * 22, size: 8, font: fontReg, color: rgb(0.45, 0.65, 0.45), letterSpacing: 1.5 });
  });
  cover.drawText('2010 - 2024', { x: 50, y: 38, size: 9, font: fontReg, color: rgb(0.35, 0.35, 0.35), letterSpacing: 3 });

  // ── INDEX PAGE ─────────────────────────────────────────────────────────────
  const indexPage = doc.addPage([W, H]);
  indexPage.drawRectangle({ x: 0, y: 0, width: W, height: H, color: WHITE });
  indexPage.drawRectangle({ x: 0, y: 0, width: 6, height: H, color: GREEN });

  indexPage.drawText('PROJECT INDEX', { x: 50, y: H - 65, size: 8, font: fontReg, color: GRAY, letterSpacing: 3 });
  indexPage.drawText('All Projects', { x: 50, y: H - 95, size: 26, font: fontBold, color: DARK });
  indexPage.drawLine({ start: { x: 50, y: H - 112 }, end: { x: W - 50, y: H - 112 }, thickness: 0.8, color: LIGHT });

  const colW = (W - 140) / 2;
  projects.forEach((p, i) => {
    const col = i < Math.ceil(projects.length / 2) ? 0 : 1;
    const row = col === 0 ? i : i - Math.ceil(projects.length / 2);
    const x = 50 + col * (colW + 40);
    const y = H - 150 - row * 50;

    indexPage.drawRectangle({ x, y: y - 6, width: colW - 20, height: 40, color: rgb(0.97, 0.97, 0.97) });
    indexPage.drawRectangle({ x, y: y - 6, width: 4, height: 40, color: GREEN });
    indexPage.drawText(`${String(i + 1).padStart(2, '0')}`, { x: x + 12, y: y + 18, size: 8, font: fontBold, color: GREEN });
    const label = p.title.length > 36 ? p.title.slice(0, 34) + '...' : p.title;
    indexPage.drawText(label, { x: x + 32, y: y + 18, size: 9, font: fontBold, color: DARK });
    indexPage.drawText(`${p.category}  |  ${p.location}  |  ${p.year}`, { x: x + 32, y: y + 5, size: 7.5, font: fontReg, color: GRAY });
  });

  // ── PROJECT PAGES ──────────────────────────────────────────────────────────
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    const img = embeddedImgs[i];
    const page = doc.addPage([W, H]);

    // Left dark panel
    page.drawRectangle({ x: 0, y: 0, width: W * 0.36, height: H, color: rgb(0.06, 0.06, 0.06) });
    page.drawRectangle({ x: 0, y: 0, width: 6, height: H, color: GREEN });

    // Right: real image or fallback
    const rx = W * 0.36;
    const rw = W - rx;
    if (img) {
      const imgDims = img.scale(1);
      // Fill the right area, crop to fit
      const scale = Math.max(rw / imgDims.width, H / imgDims.height);
      const iw = imgDims.width * scale;
      const ih = imgDims.height * scale;
      const ix = rx + (rw - iw) / 2;
      const iy = (H - ih) / 2;
      page.drawImage(img, { x: ix, y: iy, width: iw, height: ih });
    } else {
      page.drawRectangle({ x: rx, y: 0, width: rw, height: H, color: rgb(0.75, 0.80, 0.75) });
    }

    // Dark overlay on bottom of image for readability
    page.drawRectangle({ x: rx, y: 0, width: rw, height: H * 0.28, color: rgb(0, 0, 0), opacity: 0.75 });

    // Left panel content
    page.drawText(`${String(i + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`, {
      x: 22, y: H - 48, size: 8, font: fontReg, color: rgb(0.35, 0.55, 0.35), letterSpacing: 2,
    });
    page.drawText(p.category.toUpperCase(), { x: 22, y: H - 95, size: 7, font: fontBold, color: GREEN, letterSpacing: 3 });
    const titleLine1 = p.title.length > 24 ? p.title.slice(0, 22) + '-' : p.title;
    const titleLine2 = p.title.length > 24 ? p.title.slice(22) : '';
    page.drawText(titleLine1, { x: 22, y: H - 122, size: 14, font: fontBold, color: WHITE });
    if (titleLine2) page.drawText(titleLine2, { x: 22, y: H - 140, size: 14, font: fontBold, color: WHITE });

    page.drawLine({ start: { x: 22, y: H - 160 }, end: { x: W * 0.36 - 22, y: H - 160 }, thickness: 0.5, color: rgb(0.22, 0.22, 0.22) });

    const meta = [
      { label: 'LOCATION', value: p.location },
      { label: 'CLIENT',   value: p.client.length > 20 ? p.client.slice(0, 18) + '...' : p.client },
      { label: 'YEAR',     value: p.year },
      { label: 'TYPE',     value: p.category },
    ];
    meta.forEach((m, mi) => {
      const y = H - 198 - mi * 52;
      page.drawText(m.label, { x: 22, y: y + 14, size: 6.5, font: fontBold, color: rgb(0.38, 0.38, 0.38), letterSpacing: 2 });
      page.drawText(m.value, { x: 22, y: y, size: 11, font: fontReg, color: WHITE });
      page.drawLine({ start: { x: 22, y: y - 8 }, end: { x: W * 0.36 - 22, y: y - 8 }, thickness: 0.3, color: rgb(0.16, 0.16, 0.16) });
    });

    page.drawText('FAM LANDSCAPE', { x: 22, y: 28, size: 6.5, font: fontBold, color: rgb(0.28, 0.28, 0.28), letterSpacing: 2 });

    // Bottom overlay text on image
    page.drawText(p.title.toUpperCase(), { x: rx + 24, y: H * 0.28 - 38, size: 12, font: fontBold, color: WHITE });
    page.drawText(`${p.location}  |  ${p.year}`, { x: rx + 24, y: H * 0.28 - 58, size: 9, font: fontReg, color: rgb(0.55, 0.80, 0.55) });
    page.drawText(`${String(i + 1).padStart(2, '0')}`, { x: W - 60, y: 20, size: 28, font: fontBold, color: rgb(0.25, 0.25, 0.25) });
  }

  // ── BACK COVER ─────────────────────────────────────────────────────────────
  const back = doc.addPage([W, H]);
  back.drawRectangle({ x: 0, y: 0, width: W, height: H, color: DARK });

  if (coverImg) {
    back.drawImage(coverImg, { x: 0, y: 0, width: W * 0.45, height: H });
    back.drawRectangle({ x: 0, y: 0, width: W * 0.45, height: H, color: rgb(0, 0, 0), opacity: 0.55 });
  } else {
    back.drawRectangle({ x: 0, y: 0, width: W * 0.45, height: H, color: rgb(0.12, 0.25, 0.14) });
  }

  back.drawRectangle({ x: W - 8, y: 0, width: 8, height: H, color: GREEN });

  back.drawText('FAM', { x: W / 2 - 35, y: H / 2 + 35, size: 52, font: fontBold, color: WHITE });
  back.drawText('LANDSCAPE', { x: W / 2 - 52, y: H / 2 - 5, size: 15, font: fontReg, color: rgb(0.5, 0.78, 0.5), letterSpacing: 7 });
  back.drawLine({ start: { x: W / 2 - 80, y: H / 2 - 24 }, end: { x: W / 2 + 80, y: H / 2 - 24 }, thickness: 0.5, color: GREEN });
  back.drawText('www.famlandscape.vn', { x: W / 2 - 52, y: H / 2 - 48, size: 9, font: fontReg, color: GRAY });

  const pdfBytes = await doc.save();
  writeFileSync('public/catalog.pdf', pdfBytes);
  console.log(`\nDone: public/catalog.pdf  (${projects.length + 3} pages)`);
}

generate().catch(console.error);
