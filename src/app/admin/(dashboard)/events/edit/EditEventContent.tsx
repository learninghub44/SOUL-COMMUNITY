'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { getEvent, updateEvent } from '@/lib/services/events'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  ArrowLeft,
  Upload,
  X,
  Plus,
  GripVertical,
  Calendar,
  Clock,
  MapPin,
  User,
  Users,
  DollarSign,
  MessageSquare,
  LinkIcon,
  ImagePlus,
  Images,
  Trash2
} from 'lucide-react'
import { toast } from 'sonner'
import { GalleryPickerModal } from '@/components/admin/GalleryPickerModal'

interface FAQ {
  id: string
  question: string
  answer: string
}

export default function EditEventContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const eventId = searchParams.get('id') || ''
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [posterFile, setPosterFile] = useState<File | null>(null)
  const [existingImageUrl, setExistingImageUrl] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    venue: '',
    date: '',
    time: '',
    organizer: '',
    capacity: '',
    ticketPrice: '',
    isFree: false,
    whatsappLink: '',
    status: 'draft',
    isFeatured: false
  })

  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [posterPreview, setPosterPreview] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [showPosterPicker, setShowPosterPicker] = useState(false)
  const [showGalleryPicker, setShowGalleryPicker] = useState(false)
  const [eventGallery, setEventGallery] = useState<string[]>([])

  useEffect(() => {
    if (!eventId) {
      toast.error('No event specified')
      router.push('/admin/events')
      return
    }
    let active = true
    const supabase = createClient()

    getEvent(supabase, eventId)
      .then((event) => {
        if (!active) return
        setFormData({
          title: event.title || '',
          description: event.description || '',
          venue: event.venue || '',
          date: event.date || '',
          time: event.time || '',
          organizer: event.organizer || '',
          capacity: event.capacity ? String(event.capacity) : '',
          ticketPrice: event.ticket_price ? String(event.ticket_price) : '',
          isFree: event.is_free,
          whatsappLink: event.whatsapp_link || '',
          status: event.status,
          isFeatured: event.is_featured,
        })
        setFaqs(
          (event.faqs || []).map((f, i) => ({
            id: String(i + 1),
            question: f.question,
            answer: f.answer,
          }))
        )
        setExistingImageUrl(event.image_url || '')
        setPosterPreview(event.image_url || null)
        setEventGallery(event.gallery || [])
      })
      .catch(() => {
        toast.error('Could not load this event')
        router.push('/admin/events')
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })

    return () => {
      active = false
    }
  }, [eventId, router])

  const handleInputChange = (field: string, value: string | boolean | null) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handlePosterFile(e.dataTransfer.files[0])
    }
  }

  const handlePosterFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB')
      return
    }
    setPosterFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPosterPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handlePosterFromGallery = (urls: string[]) => {
    const url = urls[0]
    if (!url) return
    setExistingImageUrl(url)
    setPosterFile(null)
    setPosterPreview(url)
  }

  const addFaq = () => {
    const newFaq: FAQ = {
      id: Date.now().toString(),
      question: '',
      answer: ''
    }
    setFaqs(prev => [...prev, newFaq])
  }

  const updateFaq = (id: string, field: 'question' | 'answer', value: string) => {
    setFaqs(prev =>
      prev.map(faq =>
        faq.id === id ? { ...faq, [field]: value } : faq
      )
    )
  }

  const removeFaq = (id: string) => {
    setFaqs(prev => prev.filter(faq => faq.id !== id))
  }

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error('Title is required')
      return false
    }
    if (!formData.description.trim()) {
      toast.error('Description is required')
      return false
    }
    if (!formData.venue.trim()) {
      toast.error('Venue is required')
      return false
    }
    if (!formData.date) {
      toast.error('Date is required')
      return false
    }
    if (!formData.time) {
      toast.error('Time is required')
      return false
    }
    if (!formData.organizer.trim()) {
      toast.error('Organizer is required')
      return false
    }
    if (!formData.capacity || parseInt(formData.capacity) <= 0) {
      toast.error('Valid capacity is required')
      return false
    }
    if (!formData.isFree && (!formData.ticketPrice || parseFloat(formData.ticketPrice) < 0)) {
      toast.error('Ticket price is required for paid events')
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    const supabase = createClient()

    try {
      let imageUrl = existingImageUrl

      if (posterFile) {
        const path = `events/${crypto.randomUUID()}-${posterFile.name}`
        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(path, posterFile, { upsert: false })

        if (uploadError) {
          toast.error('Poster upload failed: ' + uploadError.message)
          setIsSubmitting(false)
          return
        }

        const { data: publicUrlData } = supabase.storage
          .from('media')
          .getPublicUrl(path)
        imageUrl = publicUrlData.publicUrl
      }

      await updateEvent(supabase, eventId, {
        title: formData.title.trim(),
        description: formData.description.trim(),
        venue: formData.venue.trim(),
        date: formData.date,
        time: formData.time,
        organizer: formData.organizer.trim(),
        image_url: imageUrl,
        capacity: parseInt(formData.capacity, 10),
        ticket_price: formData.isFree ? 0 : parseFloat(formData.ticketPrice || '0'),
        is_free: formData.isFree,
        whatsapp_link: formData.whatsappLink.trim(),
        status: formData.status as 'draft' | 'published' | 'cancelled',
        is_featured: formData.isFeatured,
        gallery: eventGallery,
        faqs: faqs.map(({ question, answer }) => ({ question, answer })),
      })

      toast.success('Event updated successfully')
      router.push('/admin/events')
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-soul-cream flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-soul-green" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-soul-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/events">
            <Button variant="ghost" size="icon" className="text-soul-brown hover:text-soul-green">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-soul-green-dark">Edit Event</h1>
            <p className="text-soul-brown mt-1">Update event details</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-white">
              <h2 className="text-lg font-semibold text-soul-green-dark mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-soul-green-dark mb-1.5">
                    Event Title *
                  </label>
                  <Input
                    placeholder="Enter event title"
                    value={formData.title}
                    onChange={e => handleInputChange('title', e.target.value)}
                    className="border-soul-cream-dark focus:border-soul-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-soul-green-dark mb-1.5">
                    Description *
                  </label>
                  <Textarea
                    placeholder="Describe your event..."
                    rows={4}
                    value={formData.description}
                    onChange={e => handleInputChange('description', e.target.value)}
                    className="border-soul-cream-dark focus:border-soul-green"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-soul-green-dark mb-1.5">
                      <User className="w-4 h-4 inline mr-1" />
                      Organizer *
                    </label>
                    <Input
                      placeholder="Organizer name"
                      value={formData.organizer}
                      onChange={e => handleInputChange('organizer', e.target.value)}
                      className="border-soul-cream-dark focus:border-soul-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-soul-green-dark mb-1.5">
                      <Users className="w-4 h-4 inline mr-1" />
                      Capacity *
                    </label>
                    <Input
                      type="number"
                      placeholder="Maximum attendees"
                      value={formData.capacity}
                      onChange={e => handleInputChange('capacity', e.target.value)}
                      className="border-soul-cream-dark focus:border-soul-green"
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white">
              <h2 className="text-lg font-semibold text-soul-green-dark mb-4">Date & Location</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-soul-green-dark mb-1.5">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Venue *
                  </label>
                  <Input
                    placeholder="Event venue"
                    value={formData.venue}
                    onChange={e => handleInputChange('venue', e.target.value)}
                    className="border-soul-cream-dark focus:border-soul-green"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-soul-green-dark mb-1.5">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Date *
                    </label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={e => handleInputChange('date', e.target.value)}
                      className="border-soul-cream-dark focus:border-soul-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-soul-green-dark mb-1.5">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Time *
                    </label>
                    <Input
                      type="time"
                      value={formData.time}
                      onChange={e => handleInputChange('time', e.target.value)}
                      className="border-soul-cream-dark focus:border-soul-green"
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white">
              <h2 className="text-lg font-semibold text-soul-green-dark mb-4">Ticketing</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-soul-cream/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-soul-green" />
                    <div>
                      <p className="font-medium text-soul-green-dark">Free Event</p>
                      <p className="text-sm text-soul-brown/70">Toggle if this event has no tickets</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleInputChange('isFree', !formData.isFree)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      formData.isFree ? 'bg-soul-green' : 'bg-soul-cream-dark'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.isFree ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                {!formData.isFree && (
                  <div>
                    <label className="block text-sm font-medium text-soul-green-dark mb-1.5">
                      Ticket Price (KES) *
                    </label>
                    <Input
                      type="number"
                      placeholder="0"
                      min="0"
                      value={formData.ticketPrice}
                      onChange={e => handleInputChange('ticketPrice', e.target.value)}
                      className="border-soul-cream-dark focus:border-soul-green"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-soul-green-dark mb-1.5">
                    <LinkIcon className="w-4 h-4 inline mr-1" />
                    WhatsApp Link
                  </label>
                  <Input
                    placeholder="https://chat.whatsapp.com/..."
                    value={formData.whatsappLink}
                    onChange={e => handleInputChange('whatsappLink', e.target.value)}
                    className="border-soul-cream-dark focus:border-soul-green"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-soul-green-dark flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  FAQs
                </h2>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addFaq}
                  className="border-soul-green text-soul-green hover:bg-soul-green hover:text-white"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add FAQ
                </Button>
              </div>
              {faqs.length === 0 ? (
                <p className="text-soul-brown/60 text-sm text-center py-6">
                  No FAQs yet. Click &quot;Add FAQ&quot; to create one.
                </p>
              ) : (
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={faq.id} className="p-4 bg-soul-cream/50 rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-soul-green-dark">FAQ {index + 1}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFaq(faq.id)}
                          className="h-8 w-8 text-soul-brown hover:text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <Input
                        placeholder="Question"
                        value={faq.question}
                        onChange={e => updateFaq(faq.id, 'question', e.target.value)}
                        className="border-soul-cream-dark focus:border-soul-green bg-white"
                      />
                      <Textarea
                        placeholder="Answer"
                        rows={2}
                        value={faq.answer}
                        onChange={e => updateFaq(faq.id, 'answer', e.target.value)}
                        className="border-soul-cream-dark focus:border-soul-green bg-white"
                      />
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-white">
              <h2 className="text-lg font-semibold text-soul-green-dark mb-4">Event Poster</h2>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragActive
                    ? 'border-soul-green bg-soul-green/5'
                    : 'border-soul-cream-dark hover:border-soul-green/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {posterPreview ? (
                  <div className="relative">
                    <img
                      src={posterPreview}
                      alt="Poster preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => {
                        setPosterPreview(null)
                        setPosterFile(null)
                        setExistingImageUrl('')
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-lg hover:bg-soul-cream"
                    >
                      <X className="w-4 h-4 text-soul-brown" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-12 h-12 mx-auto bg-soul-cream rounded-full flex items-center justify-center">
                      <ImagePlus className="w-6 h-6 text-soul-green" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-soul-green-dark">
                        Drag & drop your poster here
                      </p>
                      <p className="text-xs text-soul-brown/60 mt-1">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      <label>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={e => {
                            if (e.target.files?.[0]) {
                              handlePosterFile(e.target.files[0])
                            }
                          }}
                        />
                        <Button type="button" variant="outline" size="sm" className="border-soul-green text-soul-green hover:bg-soul-green hover:text-white cursor-pointer">
                          <Upload className="w-4 h-4 mr-2" />
                          Browse Files
                        </Button>
                      </label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowPosterPicker(true)}
                        className="border-soul-gold text-soul-gold hover:bg-soul-gold hover:text-white"
                      >
                        <Images className="w-4 h-4 mr-2" />
                        Choose from Gallery
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6 bg-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-soul-green-dark">Event Gallery</h2>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowGalleryPicker(true)}
                  className="border-soul-gold text-soul-gold hover:bg-soul-gold hover:text-white"
                >
                  <Images className="w-4 h-4 mr-2" />
                  Add from Gallery
                </Button>
              </div>
              {eventGallery.length === 0 ? (
                <p className="text-soul-brown/60 text-sm text-center py-6">
                  No gallery photos added yet. Click &quot;Add from Gallery&quot; to attach photos to this event.
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {eventGallery.map((url) => (
                    <div key={url} className="group relative rounded-lg overflow-hidden border border-soul-cream-dark">
                      <img src={url} alt="Event gallery item" className="w-full h-20 object-cover" />
                      <button
                        type="button"
                        onClick={() => setEventGallery(prev => prev.filter(u => u !== url))}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card className="p-6 bg-white">
              <h2 className="text-lg font-semibold text-soul-green-dark mb-4">Publish Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-soul-green-dark mb-1.5">
                    Status
                  </label>
                  <Select
                    value={formData.status}
                    onValueChange={value => handleInputChange('status', value)}
                  >
                    <SelectTrigger className="border-soul-cream-dark focus:border-soul-green">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-3 bg-soul-cream/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-5 h-5 text-soul-gold" />
                    <div>
                      <p className="font-medium text-soul-green-dark">Featured Event</p>
                      <p className="text-sm text-soul-brown/70">Show at the top</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleInputChange('isFeatured', !formData.isFeatured)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      formData.isFeatured ? 'bg-soul-gold' : 'bg-soul-cream-dark'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.isFeatured ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-soul-green hover:bg-soul-green-dark text-white"
              >
                {isSubmitting ? 'Updating...' : 'Update Event'}
              </Button>
              <Link href="/admin/events" className="block">
                <Button
                  variant="outline"
                  className="w-full border-soul-brown/30 text-soul-brown hover:bg-soul-cream-dark"
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <GalleryPickerModal
        open={showPosterPicker}
        onClose={() => setShowPosterPicker(false)}
        mode="single"
        onSelect={handlePosterFromGallery}
      />
      <GalleryPickerModal
        open={showGalleryPicker}
        onClose={() => setShowGalleryPicker(false)}
        mode="multi"
        initialSelected={eventGallery}
        onSelect={setEventGallery}
      />
    </div>
  )
}
