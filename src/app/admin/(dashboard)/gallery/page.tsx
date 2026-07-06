'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Image as ImageIcon,
  Upload,
  FolderOpen,
  Plus,
  X,
  Loader2,
  Trash2,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { EmptyState } from '@/components/shared/EmptyState'
import { createClient } from '@/lib/supabase/client'
import {
  listGalleryImages,
  uploadGalleryImage,
  deleteGalleryImage,
  listGalleryAlbums,
  createGalleryAlbum,
  deleteGalleryAlbum,
} from '@/lib/services/gallery'
import type { GalleryImage, GalleryAlbum } from '@/types'

const CATEGORIES = ['Events', 'Community', 'Activities', 'Celebrations', 'Other']

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<'images' | 'albums'>('images')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showAlbumModal, setShowAlbumModal] = useState(false)

  const [images, setImages] = useState<GalleryImage[]>([])
  const [albums, setAlbums] = useState<GalleryAlbum[]>([])
  const [loadingImages, setLoadingImages] = useState(true)
  const [loadingAlbums, setLoadingAlbums] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadTitle, setUploadTitle] = useState('')
  const [uploadCategory, setUploadCategory] = useState('')
  const [uploading, setUploading] = useState(false)

  const [albumName, setAlbumName] = useState('')
  const [albumDescription, setAlbumDescription] = useState('')
  const [creatingAlbum, setCreatingAlbum] = useState(false)

  useEffect(() => {
    let active = true
    const supabase = createClient()
    listGalleryImages(supabase)
      .then((data) => active && setImages(data))
      .catch(() => toast.error('Could not load gallery images'))
      .finally(() => active && setLoadingImages(false))
    listGalleryAlbums(supabase)
      .then((data) => active && setAlbums(data))
      .catch(() => toast.error('Could not load albums'))
      .finally(() => active && setLoadingAlbums(false))
    return () => {
      active = false
    }
  }, [])

  async function handleUpload() {
    if (!uploadFile) {
      toast.error('Choose an image first')
      return
    }
    if (!uploadTitle.trim()) {
      toast.error('Enter a title')
      return
    }
    setUploading(true)
    try {
      const supabase = createClient()
      const image = await uploadGalleryImage(supabase, uploadFile, {
        title: uploadTitle.trim(),
        description: '',
        category: uploadCategory,
      })
      setImages((prev) => [image, ...prev])
      toast.success('Image uploaded')
      setShowUploadModal(false)
      setUploadFile(null)
      setUploadTitle('')
      setUploadCategory('')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  async function handleDeleteImage(id: string) {
    if (!confirm('Delete this image? This cannot be undone.')) return
    setDeletingId(id)
    try {
      const supabase = createClient()
      await deleteGalleryImage(supabase, id)
      setImages((prev) => prev.filter((i) => i.id !== id))
      toast.success('Image deleted')
    } catch {
      toast.error('Could not delete image')
    } finally {
      setDeletingId(null)
    }
  }

  async function handleCreateAlbum() {
    if (!albumName.trim()) {
      toast.error('Enter an album name')
      return
    }
    setCreatingAlbum(true)
    try {
      const supabase = createClient()
      const album = await createGalleryAlbum(supabase, {
        name: albumName.trim(),
        description: albumDescription.trim(),
      })
      setAlbums((prev) => [album, ...prev])
      toast.success('Album created')
      setShowAlbumModal(false)
      setAlbumName('')
      setAlbumDescription('')
    } catch {
      toast.error('Could not create album')
    } finally {
      setCreatingAlbum(false)
    }
  }

  async function handleDeleteAlbum(id: string) {
    if (!confirm('Delete this album? Images stay but will be unassigned.')) return
    setDeletingId(id)
    try {
      const supabase = createClient()
      await deleteGalleryAlbum(supabase, id)
      setAlbums((prev) => prev.filter((a) => a.id !== id))
      toast.success('Album deleted')
    } catch {
      toast.error('Could not delete album')
    } finally {
      setDeletingId(null)
    }
  }

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
            {loadingImages ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-6 h-6 animate-spin text-soul-green" />
              </div>
            ) : images.length === 0 ? (
              <EmptyState
                icon={<ImageIcon className="w-8 h-8" />}
                title="No images yet"
                description="Upload your first image to get started."
              />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {images.map((image) => (
                  <div key={image.id} className="group relative rounded-lg overflow-hidden border border-soul-cream-dark">
                    <img
                      src={image.image_url}
                      alt={image.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-end justify-between p-2 opacity-0 group-hover:opacity-100">
                      <p className="text-white text-xs truncate">{image.title}</p>
                      <button
                        onClick={() => handleDeleteImage(image.id)}
                        disabled={deletingId === image.id}
                        className="text-white hover:text-red-300 shrink-0"
                      >
                        {deletingId === image.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        {activeTab === 'albums' && (
          <div>
            <div className="mb-6">
              <Button
                onClick={() => setShowAlbumModal(true)}
                className="bg-soul-green hover:bg-soul-green-dark text-white flex items-center gap-2"
              >
                <Plus size={18} />
                Create Album
              </Button>
            </div>
            <Card className="bg-white overflow-hidden">
              {loadingAlbums ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="w-6 h-6 animate-spin text-soul-green" />
                </div>
              ) : albums.length === 0 ? (
                <EmptyState
                  icon={<FolderOpen className="w-8 h-8" />}
                  title="No albums yet"
                  description="Create your first album to organize images."
                />
              ) : (
                <div className="divide-y divide-border">
                  {albums.map((album) => (
                    <div key={album.id} className="flex items-center justify-between gap-4 p-4">
                      <div>
                        <h3 className="font-semibold text-soul-green-dark">{album.name}</h3>
                        <p className="text-sm text-soul-brown">
                          {album.image_count} {album.image_count === 1 ? 'image' : 'images'}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteAlbum(album.id)}
                        disabled={deletingId === album.id}
                        className="p-2 text-soul-brown hover:text-red-600 transition-colors"
                      >
                        {deletingId === album.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
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

              <label className="block border-2 border-dashed border-soul-green/30 rounded-xl p-12 text-center hover:border-soul-green transition-colors cursor-pointer">
                <Upload size={48} className="mx-auto text-soul-green/50 mb-4" />
                <p className="text-soul-brown font-medium">
                  {uploadFile ? uploadFile.name : 'Drag and drop images here'}
                </p>
                <p className="text-soul-brown/60 text-sm mt-1">or click to browse</p>
                <p className="text-soul-brown/40 text-xs mt-4">Supports JPG, PNG, GIF up to 10MB</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) setUploadFile(file)
                  }}
                />
              </label>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-soul-green-dark mb-2">
                    Title
                  </label>
                  <Input
                    placeholder="Enter image title"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    className="border-soul-green/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-soul-green-dark mb-2">
                    Category
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-soul-green/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-soul-green/30"
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowUploadModal(false)}
                  className="border-soul-green/20 text-soul-brown"
                  disabled={uploading}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-soul-green hover:bg-soul-green-dark text-white"
                  onClick={handleUpload}
                  disabled={uploading}
                >
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Upload'}
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {showAlbumModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl max-w-md w-full p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-soul-green-dark">Create Album</h2>
                <button
                  onClick={() => setShowAlbumModal(false)}
                  className="p-2 hover:bg-soul-cream rounded-full transition-colors"
                >
                  <X size={20} className="text-soul-brown" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-soul-green-dark mb-2">Name</label>
                  <Input
                    placeholder="Album name"
                    value={albumName}
                    onChange={(e) => setAlbumName(e.target.value)}
                    className="border-soul-green/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-soul-green-dark mb-2">Description</label>
                  <Input
                    placeholder="Optional description"
                    value={albumDescription}
                    onChange={(e) => setAlbumDescription(e.target.value)}
                    className="border-soul-green/20"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowAlbumModal(false)}
                  className="border-soul-green/20 text-soul-brown"
                  disabled={creatingAlbum}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-soul-green hover:bg-soul-green-dark text-white"
                  onClick={handleCreateAlbum}
                  disabled={creatingAlbum}
                >
                  {creatingAlbum ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create'}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
