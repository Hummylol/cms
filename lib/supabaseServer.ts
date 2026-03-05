import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
// Support both new 'secret' key name and legacy 'service_role' key name
const serviceRoleKey = (
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY
) as string;

if (!supabaseUrl || !serviceRoleKey) {
  // eslint-disable-next-line no-console
  console.warn('Supabase server env is missing. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY.');
}

export const supabaseServer = createClient(supabaseUrl || '', serviceRoleKey || '');

export default supabaseServer;


