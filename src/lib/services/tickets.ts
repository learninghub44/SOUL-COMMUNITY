import type { SupabaseClient } from '@supabase/supabase-js';
import type { Ticket } from '@/types';

/** Generates a short human-readable reference like SOUL-8F2K9Q. */
function generateTicketReference() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `SOUL-${code}`;
}

/**
 * Public registration for an event. Anon key can insert per RLS
 * ("Public can insert tickets"). Free events are marked paid
 * immediately since no money changes hands; paid events are left
 * pending until an admin confirms payment (no payment gateway is
 * wired up yet).
 */
export async function createTicket(
  supabase: SupabaseClient,
  input: { event_id: string; full_name: string; email: string; is_free: boolean }
) {
  const reference = generateTicketReference();
  const { data, error } = await supabase
    .from('tickets')
    .insert({
      id: crypto.randomUUID(),
      event_id: input.event_id,
      full_name: input.full_name,
      email: input.email,
      ticket_reference: reference,
      qr_code: reference,
      payment_status: input.is_free ? 'paid' : 'pending',
    })
    .select()
    .single();

  if (error) throw error;
  return data as Ticket;
}

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
