import type { SupabaseClient } from '@supabase/supabase-js';
import type { Announcement } from '@/types';

export type AnnouncementInput = Omit<
  Announcement,
  'id' | 'created_at' | 'updated_at'
>;

export async function listAnnouncements(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Announcement[];
}

/** Published announcements only, pinned first, newest first. For public-facing pages. */
export async function listPublishedAnnouncements(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .eq('status', 'published')
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Announcement[];
}

export async function getAnnouncement(supabase: SupabaseClient, id: string) {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as Announcement;
}

export async function createAnnouncement(
  supabase: SupabaseClient,
  input: AnnouncementInput
) {
  const { data, error } = await supabase
    .from('announcements')
    .insert({ id: crypto.randomUUID(), ...input })
    .select()
    .single();

  if (error) throw error;
  return data as Announcement;
}

export async function updateAnnouncement(
  supabase: SupabaseClient,
  id: string,
  input: Partial<AnnouncementInput>
) {
  const { data, error } = await supabase
    .from('announcements')
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Announcement;
}

export async function deleteAnnouncement(supabase: SupabaseClient, id: string) {
  const { error } = await supabase.from('announcements').delete().eq('id', id);
  if (error) throw error;
}
