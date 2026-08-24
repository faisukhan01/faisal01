import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const MARKETS = new Set([
  'Automotive',
  'Equipment',
  'Fleet & Mobility',
  'Marine & Aviation',
  'Energy & Renewables',
  'Banking & Lessor',
]);

function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const company = clean(body.company, 160);
  const market = clean(body.market, 60);
  const message = clean(body.message, 4000);

  if (name.length < 2) {
    return NextResponse.json(
      { error: 'Please share your name.', field: 'name' },
      { status: 422 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: 'Please share a valid email address.', field: 'email' },
      { status: 422 }
    );
  }
  if (message.length < 10) {
    return NextResponse.json(
      { error: 'Tell us a little more — 10 characters minimum.', field: 'message' },
      { status: 422 }
    );
  }
  if (market && !MARKETS.has(market)) {
    return NextResponse.json(
      { error: 'Unknown market.', field: 'market' },
      { status: 422 }
    );
  }

  try {
    const submission = await db.contactSubmission.create({
      data: {
        name,
        email,
        company: company || null,
        market: market || null,
        message,
        source: clean(body.source, 60) || 'cta-banner',
      },
      select: { id: true, createdAt: true },
    });
    return NextResponse.json({ ok: true, id: submission.id }, { status: 201 });
  } catch (err) {
    console.error('[api/contact] persistence failed:', err);
    return NextResponse.json(
      { error: 'We could not record your request. Please try again.' },
      { status: 500 }
    );
  }
}
