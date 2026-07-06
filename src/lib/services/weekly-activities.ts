import type { SupabaseClient } from '@supabase/supabase-js';
import type { WeeklyActivity } from '@/types';

export async function listWeeklyActivities(supabase: SupabaseClient) {
  const { data, error } = await supabase.from('weekly_activities').select('*');
  if (error) throw error;
  return data as WeeklyActivity[];
}

/**
 * Insert or update the row for a given day. `day` is UNIQUE in the
 * schema, so this upserts on that column - each weekday has exactly
 * one row.
 */
export async function upsertWeeklyActivity(
  supabase: SupabaseClient,
  input: Omit<WeeklyActivity, 'id' | 'created_at' | 'updated_at'> & { id?: string }
) {
  const { data, error } = await supabase
    .from('weekly_activities')
    .upsert(
      {
        id: input.id || crypto.randomUUID(),
        day: input.day,
        title: input.title,
        description: input.description,
        detailed_description: input.detailed_description,
        image_url: input.image_url,
        meeting_info: input.meeting_info,
        links: input.links,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'day' }
    )
    .select()
    .single();

  if (error) throw error;
  return data as WeeklyActivity;
}
