'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Loader2,
  Pin,
  MoreVertical,
  Pencil,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/shared/EmptyState';
import { Megaphone } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { listAnnouncements, deleteAnnouncement } from '@/lib/services/announcements';
import type { Announcement } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const statusVariant: Record<Announcement['status'], 'default' | 'secondary' | 'outline'> = {
  published: 'default',
  draft: 'secondary',
  archived: 'outline',
};

export default function AdminAnnouncementsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const supabase = createClient();
    listAnnouncements(supabase)
      .then((data) => {
        if (active) setAnnouncements(data);
      })
      .catch(() => toast.error('Could not load announcements'))
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return announcements;
    return announcements.filter(
      (a) => a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q)
    );
  }, [announcements, searchQuery]);

  async function handleDelete(id: string) {
    if (!confirm('Delete this announcement? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      const supabase = createClient();
      await deleteAnnouncement(supabase, id);
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
      toast.success('Announcement deleted');
    } catch {
      toast.error('Could not delete announcement');
    } finally {
      setDeletingId(null);
    }
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
              Announcements
            </h1>
            <Link href="/admin/announcements/new">
              <Button className="bg-[#2D5A3D] hover:bg-[#1E3D2A] text-white">
                <Plus className="mr-2 h-4 w-4" />
                New Announcement
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 space-y-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B6B4A]" />
            <Input
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-[#F5F0E8] bg-white pl-10"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="border-[#F5F0E8] bg-white overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-6 h-6 animate-spin text-[#2D5A3D]" />
              </div>
            ) : filtered.length === 0 ? (
              <EmptyState
                icon={<Megaphone className="w-8 h-8" />}
                title={announcements.length === 0 ? 'No announcements yet' : 'No announcements match your search'}
                description={
                  announcements.length === 0
                    ? 'Create your first announcement to get started.'
                    : 'Try a different search term.'
                }
              />
            ) : (
              <div className="divide-y divide-[#F5F0E8]">
                {filtered.map((a) => (
                  <div key={a.id} className="flex items-center justify-between gap-4 p-4 sm:p-6">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {a.is_pinned && <Pin className="w-3.5 h-3.5 text-[#C8A84E]" />}
                        <h3 className="font-semibold text-[#1E3D2A] truncate">{a.title}</h3>
                        <Badge variant={statusVariant[a.status]}>{a.status}</Badge>
                      </div>
                      <p className="text-sm text-[#8B6B4A] mt-1 line-clamp-1">{a.content}</p>
                      <p className="text-xs text-[#8B6B4A]/70 mt-1">
                        {format(new Date(a.created_at), 'MMM d, yyyy')}
                      </p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={<Button variant="ghost" size="icon" disabled={deletingId === a.id} />}
                      >
                        {deletingId === a.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <MoreVertical className="w-4 h-4" />
                        )}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem render={<Link href={`/admin/announcements/${a.id}/edit`} />}>
                          <Pencil className="w-4 h-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive" onClick={() => handleDelete(a.id)}>
                          <Trash2 className="w-4 h-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
