This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Supabase Setup

1. Create a Supabase project. In Settings → API, copy your Project URL and anon public key.
2. Create a `.env.local` file at the repo root with:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
# Server-only key, NEVER expose to client
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

3. Database tables (SQL):

```
create table if not exists online_registrations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  dob date not null,
  address text not null,
  course text not null,
  created_at timestamp with time zone default now()
);

create table if not exists document_verifications (
  id uuid primary key default gen_random_uuid(),
  tenth_marksheet_url text,
  twelfth_marksheet_url text,
  transfer_certificate_url text,
  photo_url text,
  community_certificate_url text,
  notes text,
  created_at timestamp with time zone default now()
);
```

4. Ensure RLS is enabled and add policies to allow inserts for anonymous users if desired, or keep inserts through server-side routes only.

5. Run the app and test:

```
npm install
npm run dev
```

Then submit the forms at `admission/onlineregistration` and `admission/docverif`.

## Storage (PDF uploads for Doc Verification)

1. In Supabase Storage, create a bucket named `documents` (private).
2. Keep it private; uploads happen via server using `SUPABASE_SERVICE_ROLE_KEY`.
3. The upload endpoint is `POST /api/docverif/upload` with `multipart/form-data` fields:
   - `applicant` (string)
   - `tenth` (File, PDF), `twelfth` (File, PDF), `tc` (File, PDF), `photo` (File, PDF), `community` (File, PDF)
   - `notes` (string)
4. The server saves files under `documents/<applicant>/<timestamp>-<filename>.pdf` and writes paths to `document_verifications`.

## Face Attendance (Demo)

The attendance demo at `/attendance` uses `face-api.js` and expects model files under `public/models`. If you don't provide them, the app will fall back to a CDN automatically.

Place these files in `public/models` if you want local hosting:

- `tiny_face_detector_model-weights_manifest.json` and shard files
- `face_landmark_68_model-weights_manifest.json` and shards
- `face_recognition_model-weights_manifest.json` and shards
