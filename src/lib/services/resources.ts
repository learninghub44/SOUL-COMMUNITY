import type { SupabaseClient } from '@supabase/supabase-js';
import type { Resource } from '@/types';

export type ResourceInput = Omit<Resource, 'id' | 'created_at' | 'updated_at'>;

export async function listResources(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Resource[];
}

export async function createResource(supabase: SupabaseClient, input: ResourceInput) {
  const { data, error } = await supabase
    .from('resources')
    .insert({ id: crypto.randomUUID(), ...input })
    .select()
    .single();

  if (error) throw error;
  return data as Resource;
}

export async function updateResource(
  supabase: SupabaseClient,
  id: string,
  input: Partial<ResourceInput>
) {
  const { data, error } = await supabase
    .from('resources')
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Resource;
}

export async function deleteResource(supabase: SupabaseClient, id: string) {
  const { error } = await supabase.from('resources').delete().eq('id', id);
  if (error) throw error;
}
