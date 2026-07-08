'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Image as ImageIcon, Loader2, X, Check } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/shared/EmptyState'
import { createClient } from '@/lib/supabase/client'
import { listGalleryImages } from '@/lib/services/gallery'
import type { GalleryImage } from '@/types'

interface GalleryPickerModalProps {
  open: boolean
  onClose: () => void
  /** 'single' returns exactly one URL and closes on click. 'multi' lets the admin
   *  select several images and confirm with a button. */
  mode?: 'single' | 'multi'
  /** Pre-selected URLs, used to show current selection when reopening in multi mode. */
  initialSelected?: string[]
  onSelect: (urls: string[]) => void
}

export function GalleryPickerModal({
  open,
  onClose,
  mode = 'single',
  initialSelected = [],
  onSelect,
}: GalleryPickerModalProps) {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<string[]>(initialSelected)
  const [loadedForOpen, setLoadedForOpen] = useState(false)

  // Reset selection and loading state each time the modal transitions to open.
  if (open && !loadedForOpen) {
    setLoadedForOpen(true)
    setSelected(initialSelected)
    setLoading(true)
  } else if (!open && loadedForOpen) {
    setLoadedForOpen(false)
  }

  useEffect(() => {
    if (!open) return
    let active = true
    const supabase = createClient()
    listGalleryImages(supabase)
      .then((data) => active && setImages(data))
      .catch(() => toast.error('Could not load gallery images'))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [open])

  if (!open) return null

  const toggleImage = (url: string) => {
    if (mode === 'single') {
      onSelect([url])
      onClose()
      return
    }
    setSelected((prev) =>
      prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
    )
  }

  const handleConfirm = () => {
    onSelect(selected)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-3xl w-full max-h-[85vh] flex flex-col"
      >
        <div className="flex items-center justify-between p-6 border-b border-soul-cream-dark">
          <div>
            <h2 className="text-xl font-bold text-soul-green-dark">Choose from Gallery</h2>
            <p className="text-sm text-soul-brown/70 mt-0.5">
              {mode === 'multi'
                ? 'Select one or more images, then confirm.'
                : 'Click an image to use it.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-soul-cream rounded-full transition-colors shrink-0"
          >
            <X size={20} className="text-soul-brown" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 flex-1">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-soul-green" />
            </div>
          ) : images.length === 0 ? (
            <EmptyState
              icon={<ImageIcon className="w-8 h-8" />}
              title="No images in the gallery yet"
              description="Upload images from the Gallery page first, then come back here to pick one."
            />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => {
                const isSelected = selected.includes(image.image_url)
                return (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => toggleImage(image.image_url)}
                    className={`group relative rounded-lg overflow-hidden border-2 transition-colors text-left ${
                      isSelected
                        ? 'border-soul-green'
                        : 'border-soul-cream-dark hover:border-soul-green/50'
                    }`}
                  >
                    <img
                      src={image.image_url}
                      alt={image.title}
                      className="w-full h-28 object-cover"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-soul-green/30 flex items-center justify-center">
                        <div className="bg-soul-green rounded-full p-1.5">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                    <p className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-xs px-2 py-1 truncate">
                      {image.title}
                    </p>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {mode === 'multi' && (
          <div className="flex items-center justify-between gap-3 p-6 border-t border-soul-cream-dark">
            <p className="text-sm text-soul-brown/70">
              {selected.length} {selected.length === 1 ? 'image' : 'images'} selected
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="border-soul-green/20 text-soul-brown"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                className="bg-soul-green hover:bg-soul-green-dark text-white"
              >
                Use Selected
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
