import type { SupabaseClient } from '@supabase/supabase-js';
import type { WebsiteSettings } from '@/types';

/**
 * website_settings is a single-row table (no unique key enforcing
 * that, but the whole site only ever reads the first row). This
 * fetches that row if it exists.
 */
export async function getWebsiteSettings(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from('website_settings')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data as WebsiteSettings | null;
}

export async function saveWebsiteSettings(
  supabase: SupabaseClient,
  existingId: string | null,
  input: Omit<WebsiteSettings, 'id' | 'updated_at'>
) {
  const { data, error } = await supabase
    .from('website_settings')
    .upsert({
      id: existingId || crypto.randomUUID(),
      ...input,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data as WebsiteSettings;
}
