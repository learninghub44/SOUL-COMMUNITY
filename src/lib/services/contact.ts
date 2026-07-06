import type { SupabaseClient } from '@supabase/supabase-js';
import type { ContactMessage } from '@/types';

/**
 * Public contact form submission. Anon key can insert per RLS
 * ("Public can insert contact_messages"). Basic length limits are
 * enforced client-side (see contact/page.tsx) and again here as a
 * defense-in-depth check before hitting the network.
 */
export async function createContactMessage(
  supabase: SupabaseClient,
  input: { name: string; email: string; subject?: string; message: string }
) {
  const name = input.name.trim().slice(0, 200);
  const email = input.email.trim().slice(0, 320);
  const subject = (input.subject ?? '').trim().slice(0, 200);
  const message = input.message.trim().slice(0, 5000);

  if (!name || !email || !message) {
    throw new Error('Name, email, and message are required.');
  }

  const { data, error } = await supabase
    .from('contact_messages')
    .insert({
      id: crypto.randomUUID(),
      name,
      email,
      subject: subject || null,
      message,
      read: false,
    })
    .select()
    .single();

  if (error) throw error;
  return data as ContactMessage;
}

/** Admin-only per RLS ("Admins can view contact_messages"). */
export async function listContactMessages(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as ContactMessage[];
}

export async function markContactMessageRead(
  supabase: SupabaseClient,
  id: string,
  read: boolean
) {
  const { data, error } = await supabase
    .from('contact_messages')
    .update({ read })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as ContactMessage;
}

export async function deleteContactMessage(supabase: SupabaseClient, id: string) {
  const { error } = await supabase.from('contact_messages').delete().eq('id', id);
  if (error) throw error;
}
