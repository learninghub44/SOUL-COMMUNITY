'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Mail, MailOpen, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/shared/EmptyState';
import { createClient } from '@/lib/supabase/client';
import {
  listContactMessages,
  markContactMessageRead,
  deleteContactMessage,
} from '@/lib/services/contact';
import type { ContactMessage } from '@/types';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const supabase = createClient();
    listContactMessages(supabase)
      .then((data) => {
        if (active) setMessages(data);
      })
      .catch((err) => {
        console.error('Failed to load contact messages:', err);
        toast.error('Could not load messages');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const stats = useMemo(
    () => ({
      total: messages.length,
      unread: messages.filter((m) => !m.read).length,
    }),
    [messages]
  );

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return messages;
    return messages.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        (m.subject ?? '').toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
    );
  }, [messages, searchQuery]);

  async function toggleRead(message: ContactMessage) {
    setBusyId(message.id);
    try {
      const supabase = createClient();
      const updated = await markContactMessageRead(supabase, message.id, !message.read);
      setMessages((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
    } catch {
      toast.error('Could not update message');
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(message: ContactMessage) {
    if (!confirm(`Delete the message from ${message.name}? This cannot be undone.`)) return;
    setBusyId(message.id);
    try {
      const supabase = createClient();
      await deleteContactMessage(supabase, message.id);
      setMessages((prev) => prev.filter((m) => m.id !== message.id));
      toast.success('Message deleted');
    } catch {
      toast.error('Could not delete message');
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5] p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl font-bold text-[#1E3D2A]">Messages</h1>
          <p className="text-sm text-[#8B6B4A] mt-1">
            Submissions from the public contact form.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 grid grid-cols-2 gap-4 sm:max-w-md"
        >
          <Card className="border-[#F5F0E8] bg-white p-4">
            <p className="text-sm text-[#8B6B4A]">Total</p>
            <p className="font-display text-3xl font-bold text-[#2D5A3D]">{stats.total}</p>
          </Card>
          <Card className="border-[#F5F0E8] bg-white p-4">
            <p className="text-sm text-[#8B6B4A]">Unread</p>
            <p className="font-display text-3xl font-bold text-[#C8A84E]">{stats.unread}</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B6B4A]" />
            <Input
              placeholder="Search by name, email, subject, or message..."
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
        >
          <Card className="border-[#F5F0E8] bg-white overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-6 h-6 animate-spin text-[#2D5A3D]" />
              </div>
            ) : filtered.length === 0 ? (
              <EmptyState
                icon={<Mail className="w-8 h-8" />}
                title={messages.length === 0 ? 'No messages yet' : 'No messages match your search'}
                description={
                  messages.length === 0
                    ? 'Messages sent through the contact form will appear here.'
                    : 'Try a different search term.'
                }
              />
            ) : (
              <div className="divide-y divide-[#F5F0E8]">
                {filtered.map((message) => (
                  <div key={message.id} className="p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-[#1E3D2A] truncate">
                            {message.name}
                          </h3>
                          {!message.read && (
                            <Badge className="bg-[#C8A84E] hover:bg-[#C8A84E]">New</Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-[#8B6B4A]">
                          <a href={`mailto:${message.email}`} className="hover:underline">
                            {message.email}
                          </a>
                          <span>{format(new Date(message.created_at), 'PPp')}</span>
                        </div>
                        {message.subject && (
                          <p className="mt-2 font-medium text-[#1E3D2A]">{message.subject}</p>
                        )}
                        <p className="mt-1 text-sm text-[#4A4A4A] whitespace-pre-wrap">
                          {message.message}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={busyId === message.id}
                          onClick={() => toggleRead(message)}
                          title={message.read ? 'Mark as unread' : 'Mark as read'}
                        >
                          {message.read ? (
                            <MailOpen className="h-4 w-4" />
                          ) : (
                            <Mail className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={busyId === message.id}
                          onClick={() => handleDelete(message)}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
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
