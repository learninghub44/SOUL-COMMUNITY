'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Download,
  CheckCircle,
  XCircle,
  QrCode,
  User,
  Mail,
  Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface Ticket {
  id: string;
  reference: string;
  attendee: string;
  email: string;
  phone: string;
  event: string;
  status: 'confirmed' | 'pending' | 'checked-in';
  checkedIn: boolean;
  date: string;
}

const sampleTickets: Ticket[] = [
  {
    id: '1',
    reference: 'TKT-2026-001',
    attendee: 'Aisha Patel',
    email: 'aisha.patel@email.com',
    phone: '+1 (555) 123-4567',
    event: 'Soul Sunday Gathering',
    status: 'confirmed',
    checkedIn: false,
    date: '2026-07-05',
  },
  {
    id: '2',
    reference: 'TKT-2026-002',
    attendee: 'Marcus Johnson',
    email: 'marcus.j@email.com',
    phone: '+1 (555) 234-5678',
    event: 'Soul Sunday Gathering',
    status: 'confirmed',
    checkedIn: true,
    date: '2026-07-05',
  },
  {
    id: '3',
    reference: 'TKT-2026-003',
    attendee: 'Sofia Rodriguez',
    email: 'sofia.r@email.com',
    phone: '+1 (555) 345-6789',
    event: 'Youth Night',
    status: 'pending',
    checkedIn: false,
    date: '2026-07-06',
  },
  {
    id: '4',
    reference: 'TKT-2026-004',
    attendee: 'David Kim',
    email: 'david.kim@email.com',
    phone: '+1 (555) 456-7890',
    event: 'Worship Night',
    status: 'checked-in',
    checkedIn: true,
    date: '2026-07-04',
  },
  {
    id: '5',
    reference: 'TKT-2026-005',
    attendee: 'Fatima Al-Hassan',
    email: 'fatima.h@email.com',
    phone: '+1 (555) 567-8901',
    event: 'Soul Sunday Gathering',
    status: 'pending',
    checkedIn: false,
    date: '2026-07-05',
  },
  {
    id: '6',
    reference: 'TKT-2026-006',
    attendee: 'James O\'Brien',
    email: 'james.ob@email.com',
    phone: '+1 (555) 678-9012',
    event: 'Community Picnic',
    status: 'confirmed',
    checkedIn: false,
    date: '2026-07-07',
  },
];

const filterTabs = ['All', 'Confirmed', 'Pending', 'Checked In'] as const;
type FilterTab = (typeof filterTabs)[number];

const statusVariant = (status: Ticket['status']): 'default' | 'secondary' | 'outline' => {
  if (status === 'confirmed') return 'default';
  if (status === 'pending') return 'secondary';
  return 'outline';
};

export default function AdminTicketsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [qrInput, setQrInput] = useState('');

  const filteredTickets = sampleTickets.filter((ticket) => {
    const matchesSearch =
      searchQuery === '' ||
      ticket.attendee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.reference.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab =
      activeTab === 'All' ||
      (activeTab === 'Confirmed' && ticket.status === 'confirmed') ||
      (activeTab === 'Pending' && ticket.status === 'pending') ||
      (activeTab === 'Checked In' && ticket.status === 'checked-in');

    return matchesSearch && matchesTab;
  });

  const stats = {
    total: sampleTickets.length,
    confirmed: sampleTickets.filter((t) => t.status === 'confirmed').length,
    pending: sampleTickets.filter((t) => t.status === 'pending').length,
    checkedIn: sampleTickets.filter((t) => t.checkedIn).length,
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="font-display text-3xl font-bold text-[#1E3D2A]">
              Tickets
            </h1>
            <Button className="bg-[#2D5A3D] hover:bg-[#1E3D2A] text-white">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
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

        {/* Search & Filters */}
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

          <div className="flex gap-2 overflow-x-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-[#2D5A3D] text-white'
                    : 'bg-[#F5F0E8] text-[#8B6B4A] hover:bg-[#E8E0D4]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* QR Code Verification */}
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
                  Scan or enter a ticket reference to verify
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Input
                placeholder="Enter ticket reference (e.g. TKT-2026-001)"
                value={qrInput}
                onChange={(e) => setQrInput(e.target.value)}
                className="border-[#F5F0E8]"
              />
              <Button className="bg-[#2D5A3D] hover:bg-[#1E3D2A] text-white">
                Verify
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Tickets Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card className="border-[#F5F0E8] bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#F5F0E8] bg-[#FFFBF5]">
                    <th className="px-4 py-3 font-medium text-[#8B6B4A]">
                      Reference
                    </th>
                    <th className="px-4 py-3 font-medium text-[#8B6B4A]">
                      Attendee
                    </th>
                    <th className="px-4 py-3 font-medium text-[#8B6B4A]">
                      Event
                    </th>
                    <th className="px-4 py-3 font-medium text-[#8B6B4A]">
                      Email
                    </th>
                    <th className="px-4 py-3 font-medium text-[#8B6B4A]">
                      Phone
                    </th>
                    <th className="px-4 py-3 font-medium text-[#8B6B4A]">
                      Status
                    </th>
                    <th className="px-4 py-3 font-medium text-[#8B6B4A]">
                      Checked In
                    </th>
                    <th className="px-4 py-3 font-medium text-[#8B6B4A]">
                      Date
                    </th>
                    <th className="px-4 py-3 font-medium text-[#8B6B4A]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="border-b border-[#F5F0E8] last:border-0 hover:bg-[#FFFBF5]/50"
                    >
                      <td className="px-4 py-3 font-mono text-xs font-semibold text-[#2D5A3D]">
                        {ticket.reference}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-[#8B6B4A]" />
                          <span className="text-[#1E3D2A]">
                            {ticket.attendee}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#1E3D2A]">
                        {ticket.event}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-[#8B6B4A]" />
                          <span className="text-[#1E3D2A]">{ticket.email}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-[#8B6B4A]" />
                          <span className="text-[#1E3D2A]">{ticket.phone}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={statusVariant(ticket.status)}>
                          {ticket.status === 'checked-in'
                            ? 'Checked In'
                            : ticket.status.charAt(0).toUpperCase() +
                              ticket.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        {ticket.checkedIn ? (
                          <CheckCircle className="h-5 w-5 text-[#5C8A6B]" />
                        ) : (
                          <XCircle className="h-5 w-5 text-[#C8A84E]" />
                        )}
                      </td>
                      <td className="px-4 py-3 text-[#8B6B4A]">
                        {ticket.date}
                      </td>
                      <td className="px-4 py-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#2D5A3D] text-[#2D5A3D] hover:bg-[#2D5A3D] hover:text-white"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredTickets.length === 0 && (
              <div className="py-12 text-center text-[#8B6B4A]">
                No tickets found matching your search.
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}