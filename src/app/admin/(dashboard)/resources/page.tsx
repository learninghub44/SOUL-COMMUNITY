'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  FileText,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/shared/EmptyState';
import { createClient } from '@/lib/supabase/client';
import { listResources, createResource, updateResource, deleteResource } from '@/lib/services/resources';
import type { Resource } from '@/types';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

// DB stores lowercase/underscore category + type values; the UI shows
// friendly labels. These maps convert between the two.
const CATEGORY_LABELS: Record<Resource['category'], string> = {
  jobs: 'Jobs',
  scholarships: 'Scholarships',
  learning: 'Learning',
  mental_health: 'Mental Health',
  career: 'Career',
  volunteer: 'Volunteer',
};
const CATEGORIES = Object.keys(CATEGORY_LABELS) as Resource['category'][];

const TYPE_LABELS: Record<Resource['type'], string> = {
  pdf: 'PDF',
  link: 'Link',
  document: 'Document',
};
const TYPES = Object.keys(TYPE_LABELS) as Resource['type'][];

export default function AdminResourcesPage() {
  const [activeTab, setActiveTab] = useState<Resource['category'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCategory, setFormCategory] = useState<Resource['category']>('jobs');
  const [formType, setFormType] = useState<Resource['type']>('pdf');
  const [formUrl, setFormUrl] = useState('');

  useEffect(() => {
    let active = true;
    const supabase = createClient();
    listResources(supabase)
      .then((data) => active && setResources(data))
      .catch(() => toast.error('Could not load resources'))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const filteredResources = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return resources.filter((r) => {
      const matchesSearch =
        q === '' || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q);
      const matchesTab = activeTab === 'all' || r.category === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [resources, searchQuery, activeTab]);

  const resetForm = () => {
    setFormTitle('');
    setFormDescription('');
    setFormCategory('jobs');
    setFormType('pdf');
    setFormUrl('');
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (resource: Resource) => {
    setFormTitle(resource.title);
    setFormDescription(resource.description);
    setFormCategory(resource.category);
    setFormType(resource.type);
    setFormUrl(resource.external_url || '');
    setEditingId(resource.id);
    setShowForm(true);
  };

  async function handleDelete(id: string) {
    if (!confirm('Delete this resource? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      const supabase = createClient();
      await deleteResource(supabase, id);
      setResources((prev) => prev.filter((r) => r.id !== id));
      toast.success('Resource deleted');
    } catch {
      toast.error('Could not delete resource');
    } finally {
      setDeletingId(null);
    }
  }

  async function handleSubmit() {
    if (!formTitle.trim()) {
      toast.error('Title is required');
      return;
    }
    setSaving(true);
    try {
      const supabase = createClient();
      const input = {
        title: formTitle.trim(),
        description: formDescription.trim(),
        category: formCategory,
        type: formType,
        file_url: null,
        external_url: formUrl.trim() || null,
      };

      if (editingId) {
        const updated = await updateResource(supabase, editingId, input);
        setResources((prev) => prev.map((r) => (r.id === editingId ? updated : r)));
        toast.success('Resource updated');
      } else {
        const created = await createResource(supabase, input);
        setResources((prev) => [created, ...prev]);
        toast.success('Resource added');
      }
      resetForm();
    } catch {
      toast.error('Could not save resource');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5] p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="font-display text-3xl font-bold text-[#1E3D2A]">Resources</h1>
            <Button
              className="bg-[#2D5A3D] hover:bg-[#1E3D2A] text-white"
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Resource
            </Button>
          </div>
        </motion.div>

        {showForm && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Card className="border-[#F5F0E8] bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-bold text-[#1E3D2A]">
                  {editingId ? 'Edit Resource' : 'Add Resource'}
                </h2>
                <Button variant="ghost" size="icon" onClick={resetForm} className="text-[#8B6B4A] hover:text-[#1E3D2A]">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-[#8B6B4A]">Title</label>
                  <Input
                    placeholder="Resource title"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="border-[#F5F0E8] bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-[#8B6B4A]">Description</label>
                  <Textarea
                    placeholder="Brief description"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="border-[#F5F0E8] bg-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-[#8B6B4A]">Category</label>
                  <Select value={formCategory} onValueChange={(val) => setFormCategory(val as Resource['category'])}>
                    <SelectTrigger className="w-full border-[#F5F0E8] bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {CATEGORY_LABELS[cat]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-[#8B6B4A]">Type</label>
                  <Select value={formType} onValueChange={(val) => setFormType(val as Resource['type'])}>
                    <SelectTrigger className="w-full border-[#F5F0E8] bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TYPES.map((t) => (
                        <SelectItem key={t} value={t}>
                          {TYPE_LABELS[t]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-[#8B6B4A]">External URL</label>
                  <Input
                    placeholder="https://example.com"
                    value={formUrl}
                    onChange={(e) => setFormUrl(e.target.value)}
                    className="border-[#F5F0E8] bg-white"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={resetForm} className="border-[#F5F0E8] text-[#8B6B4A]" disabled={saving}>
                  Cancel
                </Button>
                <Button className="bg-[#2D5A3D] hover:bg-[#1E3D2A] text-white" onClick={handleSubmit} disabled={saving}>
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : editingId ? (
                    'Update Resource'
                  ) : (
                    'Add Resource'
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 space-y-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B6B4A]" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-[#F5F0E8] bg-white pl-10"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {(['all', ...CATEGORIES] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-[#2D5A3D] text-white'
                    : 'bg-[#F5F0E8] text-[#8B6B4A] hover:bg-[#E8E0D4]'
                }`}
              >
                {tab === 'all' ? 'All' : CATEGORY_LABELS[tab]}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="border-[#F5F0E8] bg-white overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-6 h-6 animate-spin text-[#2D5A3D]" />
              </div>
            ) : filteredResources.length === 0 ? (
              <EmptyState
                icon={<FileText className="w-8 h-8" />}
                title={resources.length === 0 ? 'No resources yet' : 'No resources match your filters'}
                description={
                  resources.length === 0
                    ? 'Add your first resource to get started.'
                    : 'Try a different search term or category.'
                }
              />
            ) : (
              <div className="divide-y divide-[#F5F0E8]">
                {filteredResources.map((r) => (
                  <div key={r.id} className="flex items-center justify-between gap-4 p-4 sm:p-6">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-[#1E3D2A] truncate">{r.title}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#F5F0E8] text-[#8B6B4A]">
                          {CATEGORY_LABELS[r.category]}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#F5F0E8] text-[#8B6B4A]">
                          {TYPE_LABELS[r.type]}
                        </span>
                      </div>
                      <p className="text-sm text-[#8B6B4A] mt-1 line-clamp-1">{r.description}</p>
                      {r.external_url && (
                        <a
                          href={r.external_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[#2D5A3D] mt-1 hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" /> {r.external_url}
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(r)}>
                        <Edit className="w-4 h-4 text-[#8B6B4A]" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(r.id)}
                        disabled={deletingId === r.id}
                      >
                        {deletingId === r.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4 text-red-500" />
                        )}
                      </Button>
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
