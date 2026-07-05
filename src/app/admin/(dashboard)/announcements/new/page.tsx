'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Save, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function NewAnnouncementPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>(
    'draft'
  );
  const [isPinned, setIsPinned] = useState(false);
  const [scheduledAt, setScheduledAt] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handlePublish = () => {
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    if (!content.trim()) {
      toast.error('Please enter content');
      return;
    }
    toast.success('Announcement published successfully');
    router.push('/admin/announcements');
  };

  const handleSaveDraft = () => {
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    toast.success('Announcement saved as draft');
    router.push('/admin/announcements');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      toast.success(`Image "${file.name}" selected`);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] p-6 lg:p-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/admin/announcements"
            className="mb-4 inline-flex items-center gap-2 text-sm text-[#8B6B4A] hover:text-[#2D5A3D] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Announcements
          </Link>
          <h1 className="font-display text-3xl font-bold text-[#1E3D2A]">
            New Announcement
          </h1>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-[#F5F0E8] bg-white p-6 space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-[#1E3D2A]"
              >
                Title
              </label>
              <Input
                id="title"
                placeholder="Enter announcement title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-[#F5F0E8]"
              />
            </div>

            {/* Content */}
            <div>
              <label
                htmlFor="content"
                className="mb-2 block text-sm font-medium text-[#1E3D2A]"
              >
                Content
              </label>
              <Textarea
                id="content"
                placeholder="Write your announcement content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px] border-[#F5F0E8]"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#1E3D2A]">
                Image
              </label>
              <div className="flex items-center gap-4">
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-dashed border-[#F5F0E8] bg-[#FFFBF5] px-6 py-4 text-sm text-[#8B6B4A] transition-colors hover:border-[#2D5A3D] hover:text-[#2D5A3D]">
                  <Upload className="h-4 w-4" />
                  {imageFile ? imageFile.name : 'Choose an image'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                {imageFile && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#F5F0E8] text-[#8B6B4A]"
                    onClick={() => setImageFile(null)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>

            {/* Status & Pinned */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-medium text-[#1E3D2A]"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as typeof status)}
                  className="w-full rounded-lg border border-[#F5F0E8] bg-white px-3 py-2 text-sm text-[#1E3D2A] outline-none focus:border-[#2D5A3D] focus:ring-1 focus:ring-[#2D5A3D]"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#1E3D2A]">
                  Pinned
                </label>
                <button
                  type="button"
                  onClick={() => setIsPinned(!isPinned)}
                  className={`flex h-10 w-full items-center gap-2 rounded-lg border px-3 text-sm font-medium transition-colors ${
                    isPinned
                      ? 'border-[#C8A84E] bg-[#C8A84E]/10 text-[#C8A84E]'
                      : 'border-[#F5F0E8] bg-white text-[#8B6B4A]'
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded ${
                      isPinned ? 'bg-[#C8A84E] text-white' : 'bg-[#F5F0E8]'
                    }`}
                  >
                    {isPinned && (
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  {isPinned ? 'Pinned' : 'Pin this announcement'}
                </button>
              </div>
            </div>

            {/* Scheduled At */}
            <div>
              <label
                htmlFor="scheduledAt"
                className="mb-2 block text-sm font-medium text-[#1E3D2A]"
              >
                Schedule For Later (optional)
              </label>
              <input
                id="scheduledAt"
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                className="w-full rounded-lg border border-[#F5F0E8] bg-white px-3 py-2 text-sm text-[#1E3D2A] outline-none focus:border-[#2D5A3D] focus:ring-1 focus:ring-[#2D5A3D]"
              />
            </div>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end"
        >
          <Button
            variant="outline"
            className="border-[#8B6B4A] text-[#8B6B4A] hover:bg-[#8B6B4A] hover:text-white"
            onClick={handleSaveDraft}
          >
            <Save className="mr-2 h-4 w-4" />
            Save as Draft
          </Button>
          <Button
            className="bg-[#2D5A3D] hover:bg-[#1E3D2A] text-white"
            onClick={handlePublish}
          >
            <Send className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </motion.div>
      </div>
    </div>
  );
}