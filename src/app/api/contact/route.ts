import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const TOPICS = new Set(['Product inquiry', 'Partnership', 'Support', 'Something else']);

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
  const topic = clean(body.topic, 60);
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
  if (topic && !TOPICS.has(topic)) {
    return NextResponse.json(
      { error: 'Unknown topic.', field: 'topic' },
      { status: 422 }
    );
  }

  try {
    const submission = await db.contactSubmission.create({
      data: {
        name,
        email,
        company: company || null,
        topic: topic || null,
        message,
        source: clean(body.source, 60) || 'cta-banner',
      },
      select: { id: true, createdAt: true },
    });
    return NextResponse.json({ ok: true, id: submission.id }, { status: 201 });
  } catch (err) {
    console.error('[api/contact] persistence failed:', err);
    return NextResponse.json(
      { error: 'We could not record your message. Please try again.' },
      { status: 500 }
    );
  }
}
