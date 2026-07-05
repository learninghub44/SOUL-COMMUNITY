'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Image as ImageIcon,
  Upload,
  FolderOpen,
  Plus,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { EmptyState } from '@/components/shared/EmptyState'

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<'images' | 'albums'>('images')
  const [showUploadModal, setShowUploadModal] = useState(false)

  return (
    <div className="min-h-screen bg-soul-cream p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-soul-green-dark">Gallery</h1>
            <p className="text-soul-brown mt-1">Manage community images and albums</p>
          </div>
          <Button
            onClick={() => setShowUploadModal(true)}
            className="bg-soul-green hover:bg-soul-green-dark text-white flex items-center gap-2"
          >
            <Upload size={18} />
            Upload Images
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('images')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'images'
                ? 'bg-soul-green text-white'
                : 'bg-white text-soul-brown hover:bg-soul-cream-dark'
            }`}
          >
            <ImageIcon size={18} />
            Images
          </button>
          <button
            onClick={() => setActiveTab('albums')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'albums'
                ? 'bg-soul-green text-white'
                : 'bg-white text-soul-brown hover:bg-soul-cream-dark'
            }`}
          >
            <FolderOpen size={18} />
            Albums
          </button>
        </div>

        {activeTab === 'images' && (
          <Card className="bg-white overflow-hidden">
            <EmptyState
              icon={<ImageIcon className="w-8 h-8" />}
              title="No images yet"
              description="Upload your first image to get started."
            />
          </Card>
        )}

        {activeTab === 'albums' && (
          <div>
            <div className="mb-6">
              <Button
                onClick={() => {}}
                className="bg-soul-green hover:bg-soul-green-dark text-white flex items-center gap-2"
              >
                <Plus size={18} />
                Create Album
              </Button>
            </div>
            <Card className="bg-white overflow-hidden">
              <EmptyState
                icon={<FolderOpen className="w-8 h-8" />}
                title="No albums yet"
                description="Create your first album to organize images."
              />
            </Card>
          </div>
        )}

        {showUploadModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl max-w-2xl w-full p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-soul-green-dark">Upload Images</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-2 hover:bg-soul-cream rounded-full transition-colors"
                >
                  <X size={20} className="text-soul-brown" />
                </button>
              </div>

              <div className="border-2 border-dashed border-soul-green/30 rounded-xl p-12 text-center hover:border-soul-green transition-colors cursor-pointer">
                <Upload size={48} className="mx-auto text-soul-green/50 mb-4" />
                <p className="text-soul-brown font-medium">Drag and drop images here</p>
                <p className="text-soul-brown/60 text-sm mt-1">or click to browse</p>
                <p className="text-soul-brown/40 text-xs mt-4">Supports JPG, PNG, GIF up to 10MB</p>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-soul-green-dark mb-2">
                    Title
                  </label>
                  <Input placeholder="Enter image title" className="border-soul-green/20" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-soul-green-dark mb-2">
                    Category
                  </label>
                  <select className="w-full px-3 py-2 border border-soul-green/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-soul-green/30">
                    <option value="">Select category</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowUploadModal(false)}
                  className="border-soul-green/20 text-soul-brown"
                >
                  Cancel
                </Button>
                <Button className="bg-soul-green hover:bg-soul-green-dark text-white">
                  Upload
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
