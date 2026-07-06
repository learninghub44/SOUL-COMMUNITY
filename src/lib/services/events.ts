import type { SupabaseClient } from '@supabase/supabase-js';
import type { Event } from '@/types';

export type EventInput = Omit<
  Event,
  'id' | 'tickets_sold' | 'created_at' | 'updated_at'
>;

/** Fetch all events, most recent first. Admin-only (RLS enforces this). */
export async function listEvents(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Event[];
}

/** Published events only, soonest first. For public-facing pages. */
export async function listPublishedEvents(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'published')
    .order('date', { ascending: true });

  if (error) throw error;
  return data as Event[];
}

export async function getEvent(supabase: SupabaseClient, id: string) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as Event;
}

export async function createEvent(
  supabase: SupabaseClient,
  input: EventInput
) {
  const { data, error } = await supabase
    .from('events')
    .insert({ id: crypto.randomUUID(), ...input })
    .select()
    .single();

  if (error) throw error;
  return data as Event;
}

export async function updateEvent(
  supabase: SupabaseClient,
  id: string,
  input: Partial<EventInput>
) {
  const { data, error } = await supabase
    .from('events')
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Event;
}

export async function deleteEvent(supabase: SupabaseClient, id: string) {
  const { error } = await supabase.from('events').delete().eq('id', id);
  if (error) throw error;
}
