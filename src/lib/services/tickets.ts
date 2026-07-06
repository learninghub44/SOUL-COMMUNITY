import type { SupabaseClient } from '@supabase/supabase-js';
import type { Ticket } from '@/types';

/** All tickets, most recent first, with their event joined in. */
export async function listTickets(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from('tickets')
    .select('*, event:events(id, title, date, venue)')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as unknown as Ticket[];
}

/** Look up a single ticket by its reference code (for QR/manual check-in). */
export async function getTicketByReference(
  supabase: SupabaseClient,
  reference: string
) {
  const { data, error } = await supabase
    .from('tickets')
    .select('*, event:events(id, title, date, venue)')
    .eq('ticket_reference', reference.trim())
    .single();

  if (error) throw error;
  return data as unknown as Ticket;
}

export async function checkInTicket(supabase: SupabaseClient, id: string) {
  const { data, error } = await supabase
    .from('tickets')
    .update({ checked_in: true, checked_in_at: new Date().toISOString() })
    .eq('id', id)
    .select('*, event:events(id, title, date, venue)')
    .single();

  if (error) throw error;
  return data as unknown as Ticket;
}

export async function updatePaymentStatus(
  supabase: SupabaseClient,
  id: string,
  status: Ticket['payment_status']
) {
  const { data, error } = await supabase
    .from('tickets')
    .update({ payment_status: status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Ticket;
}
