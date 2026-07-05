'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Download,
  FileText,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

type ResourceCategory = 'Jobs' | 'Scholarships' | 'Learning' | 'Mental Health' | 'Career' | 'Volunteer';
type ResourceType = 'PDF' | 'Link' | 'Document';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  type: ResourceType;
  date: string;
  url?: string;
}

const sampleResources: Resource[] = [
  {
    id: '1',
    title: 'Youth Employment Program 2026',
    description: 'Government youth internship program for graduates aged 18-30.',
    category: 'Jobs',
    type: 'Link',
    date: '2026-07-01',
    url: 'https://example.com/youth-employment',
  },
  {
    id: '2',
    title: 'Africa Leadership University Scholarships',
    description: 'Full and partial scholarships for African students.',
    category: 'Scholarships',
    type: 'PDF',
    date: '2026-06-28',
  },
  {
    id: '3',
    title: 'Free Digital Skills Course',
    description: 'Online course covering web development, data analytics, and UX design.',
    category: 'Learning',
    type: 'Link',
    date: '2026-06-25',
    url: 'https://example.com/digital-skills',
  },
  {
    id: '4',
    title: 'Mental Health Awareness Guide',
    description: 'A comprehensive guide to understanding and managing mental health.',
    category: 'Mental Health',
    type: 'PDF',
    date: '2026-06-20',
  },
  {
    id: '5',
    title: 'CV Writing Template Pack',
    description: 'Professional CV templates and cover letter examples.',
    category: 'Career',
    type: 'Document',
    date: '2026-06-15',
  },
  {
    id: '6',
    title: 'Community Service Volunteer Handbook',
    description: 'Guide for new volunteers joining community outreach programs.',
    category: 'Volunteer',
    type: 'PDF',
    date: '2026-06-10',
  },
];

const categories: ResourceCategory[] = [
  'Jobs',
  'Scholarships',
  'Learning',
  'Mental Health',
  'Career',
  'Volunteer',
];

const categoryColors: Record<ResourceCategory, string> = {
  Jobs: 'bg-soul-green/10 text-soul-green',
  Scholarships: 'bg-soul-gold/15 text-soul-gold',
  Learning: 'bg-blue-100 text-blue-700',
  'Mental Health': 'bg-purple-100 text-purple-700',
  Career: 'bg-soul-brown/10 text-soul-brown',
  Volunteer: 'bg-emerald-100 text-emerald-700',
};

const typeColors: Record<ResourceType, string> = {
  PDF: 'bg-red-100 text-red-700',
  Link: 'bg-blue-100 text-blue-700',
  Document: 'bg-orange-100 text-orange-700',
};

export default function AdminResourcesPage() {
  const [activeTab, setActiveTab] = useState<ResourceCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [resources, setResources] = useState<Resource[]>(sampleResources);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCategory, setFormCategory] = useState<ResourceCategory>('Jobs');
  const [formType, setFormType] = useState<ResourceType>('PDF');
  const [formUrl, setFormUrl] = useState('');

  const filteredResources = resources.filter((r) => {
    const matchesSearch =
      searchQuery === '' ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'All' || r.category === activeTab;
    return matchesSearch && matchesTab;
  });

  const resetForm = () => {
    setFormTitle('');
    setFormDescription('');
    setFormCategory('Jobs');
    setFormType('PDF');
    setFormUrl('');
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (resource: Resource) => {
    setFormTitle(resource.title);
    setFormDescription(resource.description);
    setFormCategory(resource.category);
    setFormType(resource.type);
    setFormUrl(resource.url || '');
    setEditingId(resource.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
    toast.success('Resource deleted');
  };

  const handleSubmit = () => {
    if (!formTitle.trim()) {
      toast.error('Title is required');
      return;
    }

    if (editingId) {
      setResources((prev) =>
        prev.map((r) =>
          r.id === editingId
            ? {
                ...r,
                title: formTitle,
                description: formDescription,
                category: formCategory,
                type: formType,
                url: formUrl || undefined,
              }
            : r
        )
      );
      toast.success('Resource updated');
    } else {
      const newResource: Resource = {
        id: Date.now().toString(),
        title: formTitle,
        description: formDescription,
        category: formCategory,
        type: formType,
        date: new Date().toISOString().split('T')[0],
        url: formUrl || undefined,
      };
      setResources((prev) => [newResource, ...prev]);
      toast.success('Resource added');
    }

    resetForm();
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
              Resources
            </h1>
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

        {/* Add/Edit Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="border-[#F5F0E8] bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-bold text-[#1E3D2A]">
                  {editingId ? 'Edit Resource' : 'Add Resource'}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={resetForm}
                  className="text-[#8B6B4A] hover:text-[#1E3D2A]"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-[#8B6B4A]">
                    Title
                  </label>
                  <Input
                    placeholder="Resource title"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="border-[#F5F0E8] bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-[#8B6B4A]">
                    Description
                  </label>
                  <Textarea
                    placeholder="Brief description"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="border-[#F5F0E8] bg-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-[#8B6B4A]">
                    Category
                  </label>
                  <Select
                    value={formCategory}
                    onValueChange={(val) => setFormCategory(val as ResourceCategory)}
                  >
                    <SelectTrigger className="w-full border-[#F5F0E8] bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-[#8B6B4A]">
                    Type
                  </label>
                  <Select
                    value={formType}
                    onValueChange={(val) => setFormType(val as ResourceType)}
                  >
                    <SelectTrigger className="w-full border-[#F5F0E8] bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="Link">Link</SelectItem>
                      <SelectItem value="Document">Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-[#8B6B4A]">
                    External URL
                  </label>
                  <Input
                    placeholder="https://example.com"
                    value={formUrl}
                    onChange={(e) => setFormUrl(e.target.value)}
                    className="border-[#F5F0E8] bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-[#8B6B4A]">
                    File Upload
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      className="block w-full text-sm text-[#8B6B4A] file:mr-3 file:rounded-lg file:border-0 file:bg-[#F5F0E8] file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-[#2D5A3D] hover:file:bg-[#E8E0D4]"
                    />
                    <Download className="h-4 w-4 text-[#8B6B4A]/50" />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={resetForm} className="border-[#F5F0E8] text-[#8B6B4A]">
                  Cancel
                </Button>
                <Button
                  className="bg-[#2D5A3D] hover:bg-[#1E3D2A] text-white"
                  onClick={handleSubmit}
                >
                  {editingId ? 'Update Resource' : 'Add Resource'}
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Search & Filters */}
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
            {(['All', ...categories] as const).map((tab) => (
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

        {/* Resources Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="border-[#F5F0E8] bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#F5F0E8] bg-[#FFFBF5]">
                    <th className="px-4 py-3 font-medium text-[#8B6B4A]">Title</th>
                    <th className="px-4 py-3 font-medium text-[#8B6B4A]">Category</th>
                    <th className="px-4 py-3 font-medium text-[#8B6B4A]">Type</th>
                    <th className="px-4 py-3 font-medium text-[#8B6B4A]">Date</th>
                    <th className="px-4 py-3 font-medium text-[#8B6B4A]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResources.map((resource) => (
                    <tr
                      key={resource.id}
                      className="border-b border-[#F5F0E8] last:border-0 hover:bg-[#FFFBF5]/50"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 shrink-0 text-[#8B6B4A]/50" />
                          <div>
                            <p className="font-medium text-[#1E3D2A]">{resource.title}</p>
                            <p className="mt-0.5 line-clamp-1 text-xs text-[#8B6B4A]">
                              {resource.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${categoryColors[resource.category]}`}>
                          {resource.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${typeColors[resource.type]}`}>
                          {resource.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#8B6B4A]">{resource.date}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          {resource.url && (
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#F5F0E8] text-[#8B6B4A] hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-[#F5F0E8] text-[#8B6B4A] hover:bg-[#2D5A3D] hover:text-white"
                            onClick={() => handleEdit(resource)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-[#F5F0E8] text-[#8B6B4A] hover:bg-red-500 hover:text-white"
                            onClick={() => handleDelete(resource.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredResources.length === 0 && (
              <div className="py-12 text-center text-[#8B6B4A]">
                No resources found.
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
