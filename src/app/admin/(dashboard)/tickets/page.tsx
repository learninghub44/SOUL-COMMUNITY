'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Download,
  QrCode,
  Ticket as TicketIcon,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/shared/EmptyState';
import { createClient } from '@/lib/supabase/client';
import { listTickets, getTicketByReference, checkInTicket, updatePaymentStatus } from '@/lib/services/tickets';
import type { Ticket } from '@/types';

const statusVariant: Record<Ticket['payment_status'], 'default' | 'secondary' | 'destructive' | 'outline'> = {
  paid: 'default',
  pending: 'secondary',
  refunded: 'outline',
  cancelled: 'destructive',
};

export default function AdminTicketsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [qrInput, setQrInput] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const supabase = createClient();
    listTickets(supabase)
      .then((data) => {
        if (active) setTickets(data);
      })
      .catch(() => toast.error('Could not load tickets'))
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const stats = useMemo(
    () => ({
      total: tickets.length,
      confirmed: tickets.filter((t) => t.payment_status === 'paid').length,
      pending: tickets.filter((t) => t.payment_status === 'pending').length,
      checkedIn: tickets.filter((t) => t.checked_in).length,
    }),
    [tickets]
  );

  const filteredTickets = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return tickets;
    return tickets.filter(
      (t) =>
        t.full_name.toLowerCase().includes(q) ||
        t.email.toLowerCase().includes(q) ||
        t.ticket_reference.toLowerCase().includes(q)
    );
  }, [tickets, searchQuery]);

  async function handleVerify() {
    if (!qrInput.trim()) {
      toast.error('Enter a ticket reference first');
      return;
    }
    setVerifying(true);
    try {
      const supabase = createClient();
      const ticket = await getTicketByReference(supabase, qrInput);

      if (ticket.checked_in) {
        toast.error(`Already checked in at ${format(new Date(ticket.checked_in_at!), 'PPp')}`);
        return;
      }
      if (ticket.payment_status !== 'paid') {
        toast.error(`Payment status is "${ticket.payment_status}" - not confirmed`);
        return;
      }

      const updated = await checkInTicket(supabase, ticket.id);
      setTickets((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      toast.success(`Checked in ${updated.full_name}`);
      setQrInput('');
    } catch {
      toast.error('No ticket found with that reference');
    } finally {
      setVerifying(false);
    }
  }

  async function handleMarkPaid(ticketId: string) {
    try {
      const supabase = createClient();
      const updated = await updatePaymentStatus(supabase, ticketId, 'paid');
      setTickets((prev) => prev.map((t) => (t.id === updated.id ? { ...t, ...updated } : t)));
      toast.success('Marked as paid');
    } catch {
      toast.error('Could not update payment status');
    }
  }

  function handleExportCsv() {
    if (tickets.length === 0) {
      toast.error('No tickets to export');
      return;
    }
    const header = ['Reference', 'Name', 'Email', 'Event', 'Payment Status', 'Checked In', 'Created At'];
    const rows = tickets.map((t) => [
      t.ticket_reference,
      t.full_name,
      t.email,
      t.event?.title || '',
      t.payment_status,
      t.checked_in ? 'Yes' : 'No',
      t.created_at,
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tickets-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5] p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="font-display text-3xl font-bold text-[#1E3D2A]">
              Tickets
            </h1>
            <Button
              className="bg-[#2D5A3D] hover:bg-[#1E3D2A] text-white"
              onClick={handleExportCsv}
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { label: 'Total Tickets', value: stats.total, color: '#2D5A3D' },
            { label: 'Confirmed', value: stats.confirmed, color: '#5C8A6B' },
            { label: 'Pending', value: stats.pending, color: '#C8A84E' },
            { label: 'Checked In', value: stats.checkedIn, color: '#8B6B4A' },
          ].map((stat) => (
            <Card
              key={stat.label}
              className="border-[#F5F0E8] bg-white p-4"
            >
              <p className="text-sm text-[#8B6B4A]">{stat.label}</p>
              <p
                className="font-display text-3xl font-bold"
                style={{ color: stat.color }}
              >
                {stat.value}
              </p>
            </Card>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6 space-y-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B6B4A]" />
            <Input
              placeholder="Search by name, email, or reference..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-[#F5F0E8] bg-white pl-10"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="border-[#F5F0E8] bg-white p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2D5A3D]/10">
                <QrCode className="h-5 w-5 text-[#2D5A3D]" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-[#1E3D2A]">
                  QR Code Verification
                </h3>
                <p className="text-sm text-[#8B6B4A]">
                  Scan or enter a ticket reference to verify and check in
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Input
                placeholder="Enter ticket reference (e.g. TKT-2026-001)"
                value={qrInput}
                onChange={(e) => setQrInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                className="border-[#F5F0E8]"
                disabled={verifying}
              />
              <Button
                className="bg-[#2D5A3D] hover:bg-[#1E3D2A] text-white"
                onClick={handleVerify}
                disabled={verifying}
              >
                {verifying ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Verify'}
              </Button>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card className="border-[#F5F0E8] bg-white overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-6 h-6 animate-spin text-[#2D5A3D]" />
              </div>
            ) : filteredTickets.length === 0 ? (
              <EmptyState
                icon={<TicketIcon className="w-8 h-8" />}
                title={tickets.length === 0 ? 'No tickets yet' : 'No tickets match your search'}
                description={
                  tickets.length === 0
                    ? 'Tickets will appear here once events are created and tickets are sold.'
                    : 'Try a different name, email, or reference.'
                }
              />
            ) : (
              <div className="divide-y divide-[#F5F0E8]">
                {filteredTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex items-center justify-between gap-4 p-4 sm:p-6"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-[#1E3D2A] truncate">{ticket.full_name}</h3>
                        <Badge variant={statusVariant[ticket.payment_status]}>
                          {ticket.payment_status}
                        </Badge>
                        {ticket.checked_in && (
                          <Badge variant="outline" className="gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Checked in
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-[#8B6B4A]">
                        <span>{ticket.email}</span>
                        <span className="font-mono">{ticket.ticket_reference}</span>
                        {ticket.event?.title && <span>{ticket.event.title}</span>}
                      </div>
                    </div>
                    {ticket.payment_status === 'pending' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="shrink-0 border-[#2D5A3D] text-[#2D5A3D] hover:bg-[#2D5A3D] hover:text-white"
                        onClick={() => handleMarkPaid(ticket.id)}
                      >
                        Mark as Paid
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
