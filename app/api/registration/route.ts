import { NextResponse } from 'next/server';
import supabaseServer from '@/lib/supabaseServer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { fullName, email, phone, dob, address, course } = data || {};

    if (!fullName || !email || !phone || !dob || !address || !course) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const insertPayload = {
      full_name: fullName,
      email,
      phone,
      dob,
      address,
      course,
    };

    const { error } = await supabaseServer.from('online_registrations').insert(insertPayload);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


