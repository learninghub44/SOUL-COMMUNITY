'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Pin,
  PinOff,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface Announcement {
  id: string;
  title: string;
  content: string;
  status: 'published' | 'draft' | 'archived';
  pinned: boolean;
  date: string;
}

const sampleAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Soul Sunday Gathering - This Week',
    content:
      'Join us this Sunday for an uplifting time of worship, word, and fellowship. Doors open at 9:30 AM.',
    status: 'published',
    pinned: true,
    date: '2026-07-03',
  },
  {
    id: '2',
    title: 'Youth Night Registration Open',
    content:
      'Calling all young adults ages 16-25! Register now for our monthly Youth Night event happening July 12th.',
    status: 'published',
    pinned: false,
    date: '2026-07-01',
  },
  {
    id: '3',
    title: 'Community Service Day',
    content:
      'We are organizing a community service day on July 20th. Sign up at the welcome desk or contact the office.',
    status: 'draft',
    pinned: false,
    date: '2026-06-28',
  },
  {
    id: '4',
    title: 'New Small Groups Starting',
    content:
      'Exciting news! We are launching 5 new small groups this fall. Stay tuned for more details on how to join.',
    status: 'archived',
    pinned: false,
    date: '2026-06-15',
  },
  {
    id: '5',
    title: 'Worship Night - Mark Your Calendars',
    content:
      'Save the date for an incredible night of worship and praise on August 1st. More details coming soon.',
    status: 'published',
    pinned: true,
    date: '2026-07-04',
  },
];

const filterTabs = ['All', 'Published', 'Draft', 'Archived', 'Pinned'] as const;
type FilterTab = (typeof filterTabs)[number];

const statusVariant = (status: Announcement['status']): 'default' | 'secondary' | 'outline' => {
  if (status === 'published') return 'default';
  if (status === 'draft') return 'secondary';
  return 'outline';
};

export default function AdminAnnouncementsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [announcements, setAnnouncements] = useState(sampleAnnouncements);

  const filteredAnnouncements = announcements.filter((a) => {
    const matchesSearch =
      searchQuery === '' ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab =
      activeTab === 'All' ||
      (activeTab === 'Published' && a.status === 'published') ||
      (activeTab === 'Draft' && a.status === 'draft') ||
      (activeTab === 'Archived' && a.status === 'archived') ||
      (activeTab === 'Pinned' && a.pinned);

    return matchesSearch && matchesTab;
  });

  const togglePin = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, pinned: !a.pinned } : a))
    );
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
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
              placeholder="Search announcements..."
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

        {/* Announcements List */}
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
                    <th className="px-4 py-3 font-medium text-[#8B6B4A]">
                      Title
                    </th>
                    <th className="px-4 py-3 font-medium text-[#8B6B4A]">
                      Status
                    </th>
                    <th className="px-4 py-3 font-medium text-[#8B6B4A]">
                      Pinned
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
                  {filteredAnnouncements.map((announcement) => (
                    <tr
                      key={announcement.id}
                      className="border-b border-[#F5F0E8] last:border-0 hover:bg-[#FFFBF5]/50"
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-[#1E3D2A]">
                            {announcement.title}
                          </p>
                          <p className="mt-1 line-clamp-1 text-xs text-[#8B6B4A]">
                            {announcement.content}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={statusVariant(announcement.status)}>
                          {announcement.status.charAt(0).toUpperCase() +
                            announcement.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        {announcement.pinned ? (
                          <Badge variant="outline">
                            <Pin className="mr-1 inline h-3 w-3" />
                            Pinned
                          </Badge>
                        ) : (
                          <span className="text-[#8B6B4A]/50">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-[#8B6B4A]">
                        {announcement.date}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-[#F5F0E8] text-[#8B6B4A] hover:bg-[#2D5A3D] hover:text-white"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-[#F5F0E8] text-[#8B6B4A] hover:bg-[#2D5A3D] hover:text-white"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-[#F5F0E8] text-[#C8A84E] hover:bg-[#C8A84E] hover:text-white"
                            onClick={() => togglePin(announcement.id)}
                          >
                            {announcement.pinned ? (
                              <PinOff className="h-4 w-4" />
                            ) : (
                              <Pin className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-[#F5F0E8] text-[#8B6B4A] hover:bg-red-500 hover:text-white"
                            onClick={() => deleteAnnouncement(announcement.id)}
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
            {filteredAnnouncements.length === 0 && (
              <div className="py-12 text-center text-[#8B6B4A]">
                No announcements found.
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}