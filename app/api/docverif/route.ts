import { NextResponse } from 'next/server';
import supabaseServer from '@/lib/supabaseServer';

// This route expects pre-uploaded file URLs. If you need file uploads, use Supabase Storage or Next uploads.
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      tenthMarksheetUrl,
      twelfthMarksheetUrl,
      transferCertificateUrl,
      photoUrl,
      communityCertificateUrl,
      notes,
    } = data || {};

    const insertPayload = {
      tenth_marksheet_url: tenthMarksheetUrl || null,
      twelfth_marksheet_url: twelfthMarksheetUrl || null,
      transfer_certificate_url: transferCertificateUrl || null,
      photo_url: photoUrl || null,
      community_certificate_url: communityCertificateUrl || null,
      notes: notes || null,
    };

    const { error } = await supabaseServer.from('document_verifications').insert(insertPayload);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


