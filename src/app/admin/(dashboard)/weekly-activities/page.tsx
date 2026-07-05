'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Edit, Save, Plus, Trash2, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'

interface ActivityLink {
  id: number
  title: string
  url: string
}

interface DayActivity {
  day: string
  shortDay: string
  title: string
  description: string
  detailedDescription: string
  meetingInfo: string
  image: string
  links: ActivityLink[]
}

const initialActivities: DayActivity[] = [
  {
    day: 'Monday',
    shortDay: 'Mon',
    title: 'Youth Empowerment Program',
    description: 'Leadership development and mentorship sessions for young community members.',
    detailedDescription: 'Our Youth Empowerment Program focuses on developing leadership skills, building confidence, and providing mentorship opportunities for ages 14-25. Activities include workshops, group discussions, and community service projects.',
    meetingInfo: 'Community Hall, Room 201 | 4:00 PM - 6:00 PM',
    image: '',
    links: [
      { id: 1, title: 'Registration Form', url: 'https://forms.soulcommunity.org/youth-reg' },
    ],
  },
  {
    day: 'Tuesday',
    shortDay: 'Tue',
    title: 'Health & Wellness',
    description: 'Health screenings, fitness classes, and wellness workshops.',
    detailedDescription: 'Tuesday is dedicated to community health and wellness. We offer free health screenings, yoga classes, nutrition workshops, and mental health support sessions. All community members are welcome.',
    meetingInfo: 'Wellness Center | 9:00 AM - 12:00 PM',
    image: '',
    links: [],
  },
  {
    day: 'Wednesday',
    shortDay: 'Wed',
    title: 'Cultural Arts Workshop',
    description: 'Creative expression through traditional and modern arts.',
    detailedDescription: 'Join us for a celebration of cultural expression through art, music, and storytelling. This workshop includes painting, drumming, dance, and traditional craft-making for all skill levels.',
    meetingInfo: 'Arts Pavilion | 3:00 PM - 5:30 PM',
    image: '',
    links: [
      { id: 1, title: 'Gallery', url: 'https://soulcommunity.org/gallery' },
    ],
  },
  {
    day: 'Thursday',
    shortDay: 'Thu',
    title: 'Skills Development',
    description: 'Workshops on practical skills for personal and professional growth.',
    detailedDescription: 'Thursday workshops cover essential life and professional skills including financial literacy, digital literacy, resume building, and interview preparation. Guest speakers from local businesses participate.',
    meetingInfo: 'Training Center, Floor 2 | 10:00 AM - 1:00 PM',
    image: '',
    links: [],
  },
  {
    day: 'Friday',
    shortDay: 'Fri',
    title: 'Community Garden',
    description: 'Urban farming, sustainability projects, and environmental education.',
    detailedDescription: 'Our Community Garden initiative promotes sustainable living and environmental stewardship. Activities include gardening workshops, composting education, farm-to-table cooking classes, and youth nature exploration.',
    meetingInfo: 'Community Garden, East Side | 8:00 AM - 11:00 AM',
    image: '',
    links: [
      { id: 1, title: 'Volunteer Sign-up', url: 'https://soulcommunity.org/garden-volunteer' },
      { id: 2, title: 'Seasonal Guide', url: 'https://soulcommunity.org/garden-guide' },
    ],
  },
  {
    day: 'Saturday',
    shortDay: 'Sat',
    title: 'Sports & Recreation',
    description: 'Team sports, fitness challenges, and outdoor activities.',
    detailedDescription: 'Saturday is for active community engagement through sports and recreation. We organize basketball tournaments, soccer matches, group fitness classes, hiking trips, and family-friendly outdoor activities.',
    meetingInfo: 'Sports Complex & Recreation Fields | 9:00 AM - 2:00 PM',
    image: '',
    links: [],
  },
  {
    day: 'Sunday',
    shortDay: 'Sun',
    title: 'Community Gathering',
    description: 'Weekly fellowship, potluck, and community planning.',
    detailedDescription: 'Our Sunday Community Gathering brings everyone together for fellowship, shared meals, and collaborative planning. Features a potluck lunch, community announcements, and open forum for ideas and feedback.',
    meetingInfo: 'Main Community Hall | 11:00 AM - 3:00 PM',
    image: '',
    links: [
      { id: 1, title: 'Event Calendar', url: 'https://soulcommunity.org/calendar' },
    ],
  },
]

export default function WeeklyActivitiesPage() {
  const [activities, setActivities] = useState<DayActivity[]>(initialActivities)
  const [expandedDay, setExpandedDay] = useState<string | null>(null)
  const [editingActivity, setEditingActivity] = useState<DayActivity | null>(null)

  const handleEdit = (activity: DayActivity) => {
    setExpandedDay(activity.day)
    setEditingActivity({ ...activity })
  }

  const handleCancel = () => {
    setExpandedDay(null)
    setEditingActivity(null)
  }

  const handleSave = () => {
    if (!editingActivity) return

    setActivities(activities.map(a =>
      a.day === editingActivity.day ? editingActivity : a
    ))
    setExpandedDay(null)
    setEditingActivity(null)
    toast.success(`${editingActivity.day} activities updated successfully!`)
  }

  const handleFieldChange = (field: keyof DayActivity, value: string) => {
    if (!editingActivity) return
    setEditingActivity({ ...editingActivity, [field]: value })
  }

  const handleAddLink = () => {
    if (!editingActivity) return
    const newLink: ActivityLink = {
      id: Date.now(),
      title: '',
      url: '',
    }
    setEditingActivity({
      ...editingActivity,
      links: [...editingActivity.links, newLink],
    })
  }

  const handleRemoveLink = (linkId: number) => {
    if (!editingActivity) return
    setEditingActivity({
      ...editingActivity,
      links: editingActivity.links.filter(l => l.id !== linkId),
    })
  }

  const handleLinkChange = (linkId: number, field: keyof ActivityLink, value: string) => {
    if (!editingActivity) return
    setEditingActivity({
      ...editingActivity,
      links: editingActivity.links.map(l =>
        l.id === linkId ? { ...l, [field]: value } : l
      ),
    })
  }

  return (
    <div className="min-h-screen bg-soul-cream p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-soul-green-dark">Weekly Activities</h1>
          <p className="text-soul-brown mt-1">Manage the weekly activity schedule for the community</p>
        </div>

        {/* Activities Grid */}
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
                {/* Day Header */}
                <div className="bg-soul-green p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold">{activity.day}</h2>
                      <p className="text-soul-cream/80 text-sm">{activity.title}</p>
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

                {/* Card Content */}
                {expandedDay !== activity.day ? (
                  <div className="p-4">
                    <p className="text-soul-brown text-sm line-clamp-2">{activity.description}</p>
                    <p className="text-soul-brown/60 text-xs mt-3">{activity.meetingInfo}</p>
                    {activity.links.length > 0 && (
                      <div className="mt-3 flex items-center gap-1 text-soul-green text-xs">
                        <ExternalLink size={12} />
                        <span>{activity.links.length} link{activity.links.length > 1 ? 's' : ''}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Edit Form */
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-4 space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-soul-green-dark mb-1">
                          Title
                        </label>
                        <Input
                          value={editingActivity?.title || ''}
                          onChange={(e) => handleFieldChange('title', e.target.value)}
                          className="border-soul-green/20"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-soul-green-dark mb-1">
                          Description
                        </label>
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
                        <label className="block text-sm font-medium text-soul-green-dark mb-1">
                          Image
                        </label>
                        <div className="border-2 border-dashed border-soul-green/20 rounded-lg p-4 text-center hover:border-soul-green/40 transition-colors cursor-pointer">
                          <p className="text-soul-brown/60 text-sm">Click to upload image</p>
                        </div>
                      </div>

                      {/* Links Section */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-soul-green-dark">
                            Links
                          </label>
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

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-2">
                        <Button
                          onClick={handleSave}
                          className="bg-soul-green hover:bg-soul-green-dark text-white flex items-center gap-2"
                        >
                          <Save size={16} />
                          Save Changes
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleCancel}
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
      </div>
    </div>
  )
}
