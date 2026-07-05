import { createBrowserClient } from '@supabase/ssr';

/**
 * Supabase client for use in Client Components ('use client').
 * Reads/writes the auth session via cookies so the session is visible
 * to the server (middleware, Server Components, Route Handlers) too.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
