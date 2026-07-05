'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Image as ImageIcon,
  Upload,
  Trash2,
  Edit,
  FolderOpen,
  Grid,
  Plus,
  X,
  Eye,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

const sampleImages = [
  { id: 1, title: 'Community Garden', category: 'Events', date: '2026-06-15', color: '#2D5A3D' },
  { id: 2, title: 'Youth Workshop', category: 'Programs', date: '2026-06-12', color: '#5C8A6B' },
  { id: 3, title: 'Cultural Celebration', category: 'Events', date: '2026-06-10', color: '#C8A84E' },
  { id: 4, title: 'Community Meeting', category: 'Meetings', date: '2026-06-08', color: '#8B6B4A' },
  { id: 5, title: 'Youth Sports Day', category: 'Sports', date: '2026-06-05', color: '#1E3D2A' },
  { id: 6, title: 'Art Exhibition', category: 'Culture', date: '2026-06-03', color: '#A67C52' },
  { id: 7, title: 'Health Outreach', category: 'Health', date: '2026-06-01', color: '#D4BC6E' },
  { id: 8, title: 'Community Harvest', category: 'Events', date: '2026-05-28', color: '#5C8A6B' },
]

const sampleAlbums = [
  { id: 1, name: 'Community Events', imageCount: 12, color: '#2D5A3D' },
  { id: 2, name: 'Youth Programs', imageCount: 8, color: '#C8A84E' },
  { id: 3, name: 'Cultural Activities', imageCount: 15, color: '#8B6B4A' },
]

const categories = ['All', 'Events', 'Programs', 'Meetings', 'Sports', 'Culture', 'Health']

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<'images' | 'albums'>('images')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [images, setImages] = useState(sampleImages)
  const [albums, setAlbums] = useState(sampleAlbums)

  const filteredImages = selectedCategory === 'All'
    ? images
    : images.filter(img => img.category === selectedCategory)

  const handleDelete = (id: number) => {
    setImages(images.filter(img => img.id !== id))
  }

  const handleDeleteAlbum = (id: number) => {
    setAlbums(albums.filter(album => album.id !== id))
  }

  return (
    <div className="min-h-screen bg-soul-cream p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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

        {/* Tabs */}
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

        {/* Images Tab */}
        {activeTab === 'images' && (
          <div>
            {/* Category Filter */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-soul-green text-white'
                      : 'bg-white text-soul-brown hover:bg-soul-cream-dark'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="group relative overflow-hidden bg-white">
                    <div
                      className="aspect-square flex items-center justify-center"
                      style={{ backgroundColor: image.color }}
                    >
                      <ImageIcon size={48} className="text-white/50" />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-soul-green-dark truncate">{image.title}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <Badge className="bg-soul-cream-dark text-soul-brown text-xs">
                          {image.category}
                        </Badge>
                        <span className="text-xs text-soul-brown/60">{image.date}</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button className="p-2 bg-white rounded-full hover:bg-soul-cream transition-colors">
                        <Eye size={18} className="text-soul-green-dark" />
                      </button>
                      <button className="p-2 bg-white rounded-full hover:bg-soul-cream transition-colors">
                        <Edit size={18} className="text-soul-brown" />
                      </button>
                      <button
                        onClick={() => handleDelete(image.id)}
                        className="p-2 bg-white rounded-full hover:bg-red-100 transition-colors"
                      >
                        <Trash2 size={18} className="text-red-500" />
                      </button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Albums Tab */}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {albums.map((album, index) => (
                <motion.div
                  key={album.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group relative overflow-hidden bg-white hover:shadow-lg transition-shadow">
                    <div
                      className="aspect-video flex items-center justify-center"
                      style={{ backgroundColor: album.color }}
                    >
                      <FolderOpen size={64} className="text-white/50" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-soul-green-dark">{album.name}</h3>
                      <p className="text-soul-brown/60 text-sm mt-1">{album.imageCount} images</p>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <button className="p-2 bg-white rounded-full hover:bg-soul-cream transition-colors shadow-md">
                        <Edit size={16} className="text-soul-brown" />
                      </button>
                      <button
                        onClick={() => handleDeleteAlbum(album.id)}
                        className="p-2 bg-white rounded-full hover:bg-red-100 transition-colors shadow-md"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Modal */}
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
                    {categories.filter(c => c !== 'All').map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-soul-green-dark mb-2">
                    Album
                  </label>
                  <select className="w-full px-3 py-2 border border-soul-green/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-soul-green/30">
                    <option value="">No album</option>
                    {albums.map(album => (
                      <option key={album.id} value={album.id}>{album.name}</option>
                    ))}
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
