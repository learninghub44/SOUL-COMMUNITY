import type { SupabaseClient } from '@supabase/supabase-js';
import type { MemberProfile } from '@/types';

export interface SignUpProfileInput {
  full_name: string;
  email: string;
  password: string;
  phone?: string;
  gender?: string;
  age?: number | null;
  county?: string;
  support_categories?: string[];
  personal_statement?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  emergency_contact_relationship?: string;
  location_lat?: number | null;
  location_lng?: number | null;
}

/**
 * Creates an auth account and, if a session is available immediately
 * (i.e. email confirmation is off), writes the profile row right away.
 * If Supabase requires email confirmation first, there is no session
 * yet - so the extra profile fields are also stashed in the auth
 * user's metadata and picked up by ensureMemberProfile() the first
 * time they sign in.
 */
export async function signUpMember(supabase: SupabaseClient, input: SignUpProfileInput) {
  const { email, password, full_name, ...rest } = input;

  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: { full_name, ...rest },
    },
  });

  if (error) throw error;

  if (data.session && data.user) {
    await upsertMemberProfile(supabase, data.user.id, { full_name, email, ...rest });
  }

  return data;
}

async function upsertMemberProfile(
  supabase: SupabaseClient,
  id: string,
  input: Omit<SignUpProfileInput, 'password'>
) {
  const { error } = await supabase.from('member_profiles').upsert({
    id,
    full_name: input.full_name,
    email: input.email,
    phone: input.phone || null,
    gender: input.gender || null,
    age: input.age ?? null,
    county: input.county || null,
    support_categories: input.support_categories || [],
    personal_statement: input.personal_statement || null,
    emergency_contact_name: input.emergency_contact_name || null,
    emergency_contact_phone: input.emergency_contact_phone || null,
    emergency_contact_relationship: input.emergency_contact_relationship || null,
    location_lat: input.location_lat ?? null,
    location_lng: input.location_lng ?? null,
    updated_at: new Date().toISOString(),
  });

  if (error) throw error;
}

/**
 * Call right after a successful sign-in. Creates the member_profiles
 * row from stashed signup metadata if it's missing (covers the
 * email-confirmation-required case), otherwise does nothing.
 */
export async function ensureMemberProfile(supabase: SupabaseClient) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: existing } = await supabase
    .from('member_profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  if (existing) return existing as MemberProfile;

  const meta = user.user_metadata || {};
  await upsertMemberProfile(supabase, user.id, {
    full_name: meta.full_name || user.email || 'Member',
    email: user.email || '',
    phone: meta.phone,
    gender: meta.gender,
    age: meta.age ?? null,
    county: meta.county,
    support_categories: meta.support_categories,
    personal_statement: meta.personal_statement,
    emergency_contact_name: meta.emergency_contact_name,
    emergency_contact_phone: meta.emergency_contact_phone,
    emergency_contact_relationship: meta.emergency_contact_relationship,
    location_lat: meta.location_lat ?? null,
    location_lng: meta.location_lng ?? null,
  });

  const { data } = await supabase
    .from('member_profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  return data as MemberProfile | null;
}
