'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Download,
  QrCode,
  Ticket,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/shared/EmptyState';

export default function AdminTicketsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [qrInput, setQrInput] = useState('');

  const stats = {
    total: 0,
    confirmed: 0,
    pending: 0,
    checkedIn: 0,
  };

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
            <Button className="bg-[#2D5A3D] hover:bg-[#1E3D2A] text-white">
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

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card className="border-[#F5F0E8] bg-white overflow-hidden">
            <EmptyState
              icon={<Ticket className="w-8 h-8" />}
              title="No tickets yet"
              description="Tickets will appear here once events are created and tickets are sold."
            />
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
