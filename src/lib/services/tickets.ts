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
 *
 * Deliberately does NOT chain `.select().single()` after the insert.
 * The only public SELECT policy on `tickets` is "email = auth.email()",
 * which only matches signed-in Supabase Auth users - an anonymous
 * ticket submission has no session, so that follow-up read gets
 * filtered to 0 rows by RLS and PostgREST throws even though the
 * insert itself succeeded. Since the id/reference are generated here
 * on the client anyway, we just return the object we already know
 * instead of re-reading it.
 */
export async function createTicket(
  supabase: SupabaseClient,
  input: { event_id: string; full_name: string; email: string; is_free: boolean }
) {
  const id = crypto.randomUUID();
  const reference = generateTicketReference();
  const payment_status: Ticket['payment_status'] = input.is_free ? 'paid' : 'pending';

  const { error } = await supabase.from('tickets').insert({
    id,
    event_id: input.event_id,
    full_name: input.full_name,
    email: input.email,
    ticket_reference: reference,
    qr_code: reference,
    payment_status,
  });

  if (error) throw error;

  return {
    id,
    event_id: input.event_id,
    full_name: input.full_name,
    email: input.email,
    ticket_reference: reference,
    qr_code: reference,
    payment_status,
    checked_in: false,
    checked_in_at: null,
    created_at: new Date().toISOString(),
  } as Ticket;
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
