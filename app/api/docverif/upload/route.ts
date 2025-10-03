import { NextResponse } from 'next/server';
import supabaseServer from '@/lib/supabaseServer';

function makePath(prefix: string, filename: string) {
  const ts = Date.now();
  const safe = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
  return `${prefix}/${ts}-${safe}`;
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const notes = (form.get('notes') as string) || null;
    const applicant = ((form.get('applicant') as string) || 'anonymous').replace(/[^a-zA-Z0-9_-]/g, '_');

    const tenth = form.get('tenth') as File | null;
    const twelfth = form.get('twelfth') as File | null;
    const tc = form.get('tc') as File | null;
    const photo = form.get('photo') as File | null;
    const community = form.get('community') as File | null;

    const bucket = supabaseServer.storage.from('documents');

    async function uploadIfPresent(key: string, file: File | null) {
      if (!file) return null;
      if (file.type !== 'application/pdf') {
        throw new Error(`${key} must be a PDF`);
      }
      const arrayBuffer = await file.arrayBuffer();
      const path = makePath(applicant, file.name || `${key}.pdf`);
      const { error } = await bucket.upload(path, Buffer.from(arrayBuffer), {
        contentType: 'application/pdf',
        upsert: true,
      });
      if (error) throw new Error(error.message);
      return path;
    }

    const [tenthPath, twelfthPath, tcPath, photoPath, communityPath] = await Promise.all([
      uploadIfPresent('tenth', tenth),
      uploadIfPresent('twelfth', twelfth),
      uploadIfPresent('tc', tc),
      uploadIfPresent('photo', photo),
      uploadIfPresent('community', community),
    ]);

    const { error } = await supabaseServer.from('document_verifications').insert({
      tenth_marksheet_url: tenthPath,
      twelfth_marksheet_url: twelfthPath,
      transfer_certificate_url: tcPath,
      photo_url: photoPath,
      community_certificate_url: communityPath,
      notes,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true, paths: { tenthPath, twelfthPath, tcPath, photoPath, communityPath } });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}


