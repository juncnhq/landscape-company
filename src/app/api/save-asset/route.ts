import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name } = body;
  const dir = join(process.cwd(), 'public/images/shapes');
  mkdirSync(dir, { recursive: true });

  let buffer: Buffer;

  if (body.url) {
    const res = await fetch(body.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Referer': 'https://nayonacademy.com/',
        'Accept': 'image/png,image/*,*/*',
      },
    });
    const ab = await res.arrayBuffer();
    buffer = Buffer.from(ab);
  } else if (body.data) {
    const base64 = (body.data as string).replace(/^data:image\/\w+;base64,/, '');
    buffer = Buffer.from(base64, 'base64');
  } else {
    return NextResponse.json({ error: 'no data' }, { status: 400 });
  }

  writeFileSync(join(dir, name), buffer);
  return NextResponse.json({ ok: true, path: `/images/shapes/${name}`, size: buffer.length });
}
