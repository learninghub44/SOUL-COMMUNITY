import type { SupabaseClient } from '@supabase/supabase-js';
import type { TeamMember } from '@/types';

export async function listTeamMembers(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data as TeamMember[];
}

/** Returns the storage path (e.g. "team/uuid-name.jpg") for a public "media" bucket URL, or null if it's not one of ours (e.g. a static /team/*.jpg asset). */
function storagePathFromUrl(url: string): string | null {
  const marker = '/storage/v1/object/public/media/';
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return url.slice(idx + marker.length);
}

export async function createTeamMember(
  supabase: SupabaseClient,
  file: File,
  input: {
    name: string;
    role: string;
    bio: string;
    phone: string;
    email: string;
    is_founder: boolean;
  }
) {
  const path = `team/${crypto.randomUUID()}-${file.name}`;
  const { error: uploadError } = await supabase.storage
    .from('media')
    .upload(path, file, { upsert: false });
  if (uploadError) throw uploadError;

  const { data: publicUrlData } = supabase.storage.from('media').getPublicUrl(path);

  const { data, error } = await supabase
    .from('team_members')
    .insert({
      name: input.name,
      role: input.role,
      bio: input.bio,
      image_url: publicUrlData.publicUrl,
      phone: input.phone || null,
      email: input.email || null,
      is_founder: input.is_founder,
      sort_order: input.is_founder ? 0 : 99,
    })
    .select()
    .single();

  if (error) {
    // Roll back the uploaded file if the row insert failed
    await supabase.storage.from('media').remove([path]);
    throw error;
  }
  return data as TeamMember;
}

export async function deleteTeamMember(supabase: SupabaseClient, member: TeamMember) {
  const { error } = await supabase.from('team_members').delete().eq('id', member.id);
  if (error) throw error;

  // Best-effort cleanup of the photo in storage. Static /public assets
  // (legacy seed rows) aren't in the bucket, so silently skip those.
  const path = storagePathFromUrl(member.image_url);
  if (path) {
    await supabase.storage.from('media').remove([path]);
  }
}
