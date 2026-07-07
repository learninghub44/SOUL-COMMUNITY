import type { SupabaseClient } from '@supabase/supabase-js';
import type { Suggestion } from '@/types';

/**
 * Public insert - anyone can submit, per RLS. No public read exists
 * anywhere.
 *
 * Deliberately does NOT chain `.select().single()` after the insert:
 * with no public SELECT policy on suggestions, an anonymous
 * submitter's follow-up read would be filtered to 0 rows by RLS and
 * throw, even though the insert succeeded. We generate the id
 * ourselves and already know every field we sent, so we return that
 * instead of re-reading the row.
 */
export async function createSuggestion(
  supabase: SupabaseClient,
  input: { name?: string; email?: string; message: string }
) {
  const name = (input.name ?? '').trim().slice(0, 200);
  const email = (input.email ?? '').trim().slice(0, 320);
  const message = input.message.trim().slice(0, 2000);

  if (!message) {
    throw new Error('Please enter your suggestion.');
  }

  const id = crypto.randomUUID();

  const { error } = await supabase.from('suggestions').insert({
    id,
    name: name || null,
    email: email || null,
    message,
    status: 'new',
  });

  if (error) throw error;

  return {
    id,
    name: name || null,
    email: email || null,
    message,
    status: 'new',
    created_at: new Date().toISOString(),
  } as Suggestion;
}

/** Admin-only per RLS ("Admins can view suggestions"). */
export async function listSuggestions(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from('suggestions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Suggestion[];
}

export async function updateSuggestionStatus(
  supabase: SupabaseClient,
  id: string,
  status: Suggestion['status']
) {
  const { data, error } = await supabase
    .from('suggestions')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Suggestion;
}

export async function deleteSuggestion(supabase: SupabaseClient, id: string) {
  const { error } = await supabase.from('suggestions').delete().eq('id', id);
  if (error) throw error;
}
