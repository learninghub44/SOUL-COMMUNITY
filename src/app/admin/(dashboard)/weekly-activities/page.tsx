'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Edit, Save, Plus, Trash2, ExternalLink, Loader2, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { listWeeklyActivities, upsertWeeklyActivity } from '@/lib/services/weekly-activities'

interface ActivityLink {
  id: number
  title: string
  url: string
}

interface DayActivity {
  id?: string
  day: string
  title: string
  description: string
  detailedDescription: string
  meetingInfo: string
  image: string
  links: ActivityLink[]
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function emptyDay(day: string): DayActivity {
  return {
    day,
    title: '',
    description: '',
    detailedDescription: '',
    meetingInfo: '',
    image: '',
    links: [],
  }
}

export default function WeeklyActivitiesPage() {
  const [activities, setActivities] = useState<DayActivity[]>(DAYS.map(emptyDay))
  const [loading, setLoading] = useState(true)
  const [expandedDay, setExpandedDay] = useState<string | null>(null)
  const [editingActivity, setEditingActivity] = useState<DayActivity | null>(null)
  const [saving, setSaving] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    let active = true
    const supabase = createClient()
    listWeeklyActivities(supabase)
      .then((rows) => {
        if (!active) return
        setActivities(
          DAYS.map((day) => {
            const row = rows.find((r) => r.day === day)
            if (!row) return emptyDay(day)
            return {
              id: row.id,
              day: row.day,
              title: row.title,
              description: row.description,
              detailedDescription: row.detailed_description,
              meetingInfo: row.meeting_info,
              image: row.image_url,
              links: (row.links || []).map((l, i) => ({ id: i + 1, title: l.label, url: l.url })),
            }
          })
        )
      })
      .catch(() => toast.error('Could not load weekly activities'))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  const handleEdit = (activity: DayActivity) => {
    setExpandedDay(activity.day)
    setEditingActivity({ ...activity })
    setImageFile(null)
  }

  const handleCancel = () => {
    setExpandedDay(null)
    setEditingActivity(null)
    setImageFile(null)
  }

  const handleSave = async () => {
    if (!editingActivity) return
    setSaving(true)
    try {
      const supabase = createClient()
      let imageUrl = editingActivity.image

      if (imageFile) {
        const path = `weekly-activities/${crypto.randomUUID()}-${imageFile.name}`
        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(path, imageFile, { upsert: false })
        if (uploadError) throw new Error('Image upload failed: ' + uploadError.message)
        const { data } = supabase.storage.from('media').getPublicUrl(path)
        imageUrl = data.publicUrl
      }

      const saved = await upsertWeeklyActivity(supabase, {
        id: editingActivity.id,
        day: editingActivity.day,
        title: editingActivity.title,
        description: editingActivity.description,
        detailed_description: editingActivity.detailedDescription,
        image_url: imageUrl,
        meeting_info: editingActivity.meetingInfo,
        links: editingActivity.links.map((l) => ({ label: l.title, url: l.url })),
      })

      setActivities((prev) =>
        prev.map((a) =>
          a.day === saved.day
            ? {
                id: saved.id,
                day: saved.day,
                title: saved.title,
                description: saved.description,
                detailedDescription: saved.detailed_description,
                meetingInfo: saved.meeting_info,
                image: saved.image_url,
                links: (saved.links || []).map((l, i) => ({ id: i + 1, title: l.label, url: l.url })),
              }
            : a
        )
      )
      setExpandedDay(null)
      setEditingActivity(null)
      setImageFile(null)
      toast.success(`${saved.day} activities updated successfully!`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not save changes')
    } finally {
      setSaving(false)
    }
  }

  const handleFieldChange = (field: keyof DayActivity, value: string) => {
    if (!editingActivity) return
    setEditingActivity({ ...editingActivity, [field]: value })
  }

  const handleAddLink = () => {
    if (!editingActivity) return
    const newLink: ActivityLink = { id: Date.now(), title: '', url: '' }
    setEditingActivity({ ...editingActivity, links: [...editingActivity.links, newLink] })
  }

  const handleRemoveLink = (linkId: number) => {
    if (!editingActivity) return
    setEditingActivity({
      ...editingActivity,
      links: editingActivity.links.filter((l) => l.id !== linkId),
    })
  }

  const handleLinkChange = (linkId: number, field: keyof ActivityLink, value: string) => {
    if (!editingActivity) return
    setEditingActivity({
      ...editingActivity,
      links: editingActivity.links.map((l) => (l.id === linkId ? { ...l, [field]: value } : l)),
    })
  }

  return (
    <div className="min-h-screen bg-soul-cream p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-soul-green-dark">Weekly Activities</h1>
          <p className="text-soul-brown mt-1">Manage the weekly activity schedule for the community</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-soul-green" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={expandedDay === activity.day ? 'col-span-full' : ''}
              >
                <Card className="bg-white overflow-hidden h-full">
                  <div className="bg-soul-green p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold">{activity.day}</h2>
                        <p className="text-soul-cream/80 text-sm">{activity.title || 'Not set up yet'}</p>
                      </div>
                      {expandedDay !== activity.day && (
                        <button
                          onClick={() => handleEdit(activity)}
                          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                      )}
                    </div>
                  </div>

                  {expandedDay !== activity.day ? (
                    <div className="p-4">
                      <p className="text-soul-brown text-sm line-clamp-2">
                        {activity.description || 'No description yet.'}
                      </p>
                      <p className="text-soul-brown/60 text-xs mt-3">{activity.meetingInfo}</p>
                      {activity.links.length > 0 && (
                        <div className="mt-3 flex items-center gap-1 text-soul-green text-xs">
                          <ExternalLink size={12} />
                          <span>{activity.links.length} link{activity.links.length > 1 ? 's' : ''}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-4 space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium text-soul-green-dark mb-1">Title</label>
                          <Input
                            value={editingActivity?.title || ''}
                            onChange={(e) => handleFieldChange('title', e.target.value)}
                            className="border-soul-green/20"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-soul-green-dark mb-1">Description</label>
                          <Input
                            value={editingActivity?.description || ''}
                            onChange={(e) => handleFieldChange('description', e.target.value)}
                            className="border-soul-green/20"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-soul-green-dark mb-1">
                            Detailed Description
                          </label>
                          <Textarea
                            value={editingActivity?.detailedDescription || ''}
                            onChange={(e) => handleFieldChange('detailedDescription', e.target.value)}
                            rows={4}
                            className="border-soul-green/20 resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-soul-green-dark mb-1">
                            Meeting Info
                          </label>
                          <Input
                            value={editingActivity?.meetingInfo || ''}
                            onChange={(e) => handleFieldChange('meetingInfo', e.target.value)}
                            className="border-soul-green/20"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-soul-green-dark mb-1">Image</label>
                          <label className="flex items-center gap-2 border-2 border-dashed border-soul-green/20 rounded-lg p-4 text-center hover:border-soul-green/40 transition-colors cursor-pointer justify-center">
                            <Upload size={16} className="text-soul-brown/60" />
                            <p className="text-soul-brown/60 text-sm">
                              {imageFile ? imageFile.name : editingActivity?.image ? 'Replace image' : 'Click to upload image'}
                            </p>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) setImageFile(file)
                              }}
                            />
                          </label>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-soul-green-dark">Links</label>
                            <button
                              onClick={handleAddLink}
                              className="flex items-center gap-1 text-soul-green text-sm hover:underline"
                            >
                              <Plus size={14} />
                              Add Link
                            </button>
                          </div>
                          <div className="space-y-2">
                            {editingActivity?.links.map((link) => (
                              <div key={link.id} className="flex gap-2">
                                <Input
                                  value={link.title}
                                  onChange={(e) => handleLinkChange(link.id, 'title', e.target.value)}
                                  placeholder="Link title"
                                  className="border-soul-green/20 flex-1"
                                />
                                <Input
                                  value={link.url}
                                  onChange={(e) => handleLinkChange(link.id, 'url', e.target.value)}
                                  placeholder="URL"
                                  className="border-soul-green/20 flex-1"
                                />
                                <button
                                  onClick={() => handleRemoveLink(link.id)}
                                  className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                                >
                                  <Trash2 size={16} className="text-red-500" />
                                </button>
                              </div>
                            ))}
                            {editingActivity?.links.length === 0 && (
                              <p className="text-soul-brown/40 text-sm italic">No links added yet</p>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                          <Button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-soul-green hover:bg-soul-green-dark text-white flex items-center gap-2"
                          >
                            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                            Save Changes
                          </Button>
                          <Button
                            variant="outline"
                            onClick={handleCancel}
                            disabled={saving}
                            className="border-soul-green/20 text-soul-brown"
                          >
                            Cancel
                          </Button>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
