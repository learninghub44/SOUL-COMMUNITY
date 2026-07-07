'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Lightbulb, Trash2, Loader2, Archive, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/shared/EmptyState';
import { createClient } from '@/lib/supabase/client';
import {
  listSuggestions,
  updateSuggestionStatus,
  deleteSuggestion,
} from '@/lib/services/suggestions';
import type { Suggestion } from '@/types';

const statusStyle: Record<Suggestion['status'], string> = {
  new: 'bg-[#C8A84E] hover:bg-[#C8A84E]',
  reviewed: 'bg-[#2D5A3D] hover:bg-[#2D5A3D]',
  archived: 'bg-[#8B6B4A] hover:bg-[#8B6B4A]',
};

export default function AdminSuggestionsPage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const supabase = createClient();
    listSuggestions(supabase)
      .then((data) => {
        if (active) setSuggestions(data);
      })
      .catch((err) => {
        console.error('Failed to load suggestions:', err);
        toast.error('Could not load suggestions');
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
      total: suggestions.length,
      new: suggestions.filter((s) => s.status === 'new').length,
    }),
    [suggestions]
  );

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return suggestions;
    return suggestions.filter(
      (s) =>
        (s.name ?? '').toLowerCase().includes(q) ||
        (s.email ?? '').toLowerCase().includes(q) ||
        s.message.toLowerCase().includes(q)
    );
  }, [suggestions, searchQuery]);

  async function setStatus(s: Suggestion, status: Suggestion['status']) {
    setBusyId(s.id);
    try {
      const supabase = createClient();
      const updated = await updateSuggestionStatus(supabase, s.id, status);
      setSuggestions((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    } catch {
      toast.error('Could not update suggestion');
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(s: Suggestion) {
    if (!confirm('Delete this suggestion? This cannot be undone.')) return;
    setBusyId(s.id);
    try {
      const supabase = createClient();
      await deleteSuggestion(supabase, s.id);
      setSuggestions((prev) => prev.filter((item) => item.id !== s.id));
      toast.success('Suggestion deleted');
    } catch {
      toast.error('Could not delete suggestion');
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5] p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl font-bold text-[#1E3D2A]">Suggestions</h1>
          <p className="text-sm text-[#8B6B4A] mt-1">
            Submissions from the public suggestion box. Only admins can see these.
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
            <p className="text-sm text-[#8B6B4A]">New</p>
            <p className="font-display text-3xl font-bold text-[#C8A84E]">{stats.new}</p>
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
              placeholder="Search by name, email, or message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-[#F5F0E8] bg-white pl-10"
            />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-[#F5F0E8] bg-white overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-6 h-6 animate-spin text-[#2D5A3D]" />
              </div>
            ) : filtered.length === 0 ? (
              <EmptyState
                icon={<Lightbulb className="w-8 h-8" />}
                title={suggestions.length === 0 ? 'No suggestions yet' : 'No suggestions match your search'}
                description={
                  suggestions.length === 0
                    ? 'Suggestions submitted through the public suggestion box will appear here.'
                    : 'Try a different search term.'
                }
              />
            ) : (
              <div className="divide-y divide-[#F5F0E8]">
                {filtered.map((s) => (
                  <div key={s.id} className="p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-[#1E3D2A] truncate">
                            {s.name || 'Anonymous'}
                          </h3>
                          <Badge className={statusStyle[s.status]}>{s.status}</Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-[#8B6B4A]">
                          {s.email && (
                            <a href={`mailto:${s.email}`} className="hover:underline">
                              {s.email}
                            </a>
                          )}
                          <span>{format(new Date(s.created_at), 'PPp')}</span>
                        </div>
                        <p className="mt-2 text-sm text-[#4A4A4A] whitespace-pre-wrap">{s.message}</p>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        {s.status !== 'reviewed' && (
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={busyId === s.id}
                            onClick={() => setStatus(s, 'reviewed')}
                            title="Mark reviewed"
                          >
                            <CheckCircle2 className="h-4 w-4 text-[#2D5A3D]" />
                          </Button>
                        )}
                        {s.status !== 'archived' && (
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={busyId === s.id}
                            onClick={() => setStatus(s, 'archived')}
                            title="Archive"
                          >
                            <Archive className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={busyId === s.id}
                          onClick={() => handleDelete(s)}
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
