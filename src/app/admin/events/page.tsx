'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Calendar,
  MapPin,
  Users,
  DollarSign
} from 'lucide-react'

type EventStatus = 'published' | 'draft' | 'cancelled'

interface Event {
  id: string
  title: string
  date: string
  time: string
  venue: string
  status: EventStatus
  ticketsSold: number
  capacity: number
  revenue: number
  isFeatured: boolean
}

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Soul Night: Live Music Experience',
    date: '2026-07-15',
    time: '7:00 PM',
    venue: 'Nairobi Arts Centre',
    status: 'published',
    ticketsSold: 145,
    capacity: 200,
    revenue: 145000,
    isFeatured: true
  },
  {
    id: '2',
    title: 'Community Poetry Slam',
    date: '2026-07-22',
    time: '6:30 PM',
    venue: 'The Hub Karen',
    status: 'published',
    ticketsSold: 68,
    capacity: 100,
    revenue: 34000,
    isFeatured: false
  },
  {
    id: '3',
    title: 'African Art Exhibition',
    date: '2026-08-01',
    time: '10:00 AM',
    venue: 'Kenyatta Conference Centre',
    status: 'draft',
    ticketsSold: 0,
    capacity: 500,
    revenue: 0,
    isFeatured: false
  },
  {
    id: '4',
    title: 'Afrobeats Dance Workshop',
    date: '2026-08-10',
    time: '2:00 PM',
    venue: 'Soul Community Hub',
    status: 'published',
    ticketsSold: 32,
    capacity: 50,
    revenue: 16000,
    isFeatured: true
  },
  {
    id: '5',
    title: 'Sunset Jazz Evening',
    date: '2026-06-20',
    time: '5:00 PM',
    venue: 'Alchemist Bar',
    status: 'cancelled',
    ticketsSold: 0,
    capacity: 150,
    revenue: 0,
    isFeatured: false
  }
]

type FilterTab = 'all' | 'published' | 'draft' | 'cancelled'

export default function AdminEventsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredEvents = sampleEvents.filter(event => {
    const matchesTab = activeTab === 'all' || event.status === activeTab
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  const getStatusBadge = (status: EventStatus) => {
    const variants: Record<EventStatus, string> = {
      published: 'bg-soul-green/15 text-soul-green border-soul-green/20',
      draft: 'bg-soul-gold/15 text-soul-gold border-soul-gold/20',
      cancelled: 'bg-red-100 text-red-700 border-red-200'
    }
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-KE', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const tabs: { label: string; value: FilterTab; count: number }[] = [
    { label: 'All', value: 'all', count: sampleEvents.length },
    { label: 'Published', value: 'published', count: sampleEvents.filter(e => e.status === 'published').length },
    { label: 'Draft', value: 'draft', count: sampleEvents.filter(e => e.status === 'draft').length },
    { label: 'Cancelled', value: 'cancelled', count: sampleEvents.filter(e => e.status === 'cancelled').length }
  ]

  return (
    <div className="min-h-screen bg-soul-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-soul-green-dark">Events</h1>
            <p className="text-soul-brown mt-1">Manage your community events</p>
          </div>
          <Link href="/admin/events/new">
            <Button className="bg-soul-green hover:bg-soul-green-dark text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {tabs.map(tab => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.value
                    ? 'bg-soul-green text-white'
                    : 'bg-white text-soul-brown hover:bg-soul-cream-dark border border-soul-cream-dark'
                }`}
              >
                {tab.label}
                <span className={`ml-2 px-1.5 py-0.5 rounded text-xs ${
                  activeTab === tab.value ? 'bg-white/20' : 'bg-soul-cream-dark'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-soul-brown/50" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-soul-cream-dark focus:border-soul-green"
            />
          </div>
        </div>

        <Card className="bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-soul-cream-dark bg-soul-cream/50">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-soul-green-dark">Event</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-soul-green-dark">Date & Time</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-soul-green-dark">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-soul-green-dark">Tickets</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-soul-green-dark">Revenue</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-soul-green-dark">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map(event => (
                  <tr key={event.id} className="border-b border-soul-cream-dark hover:bg-soul-cream/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-soul-green/10 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-soul-green" />
                        </div>
                        <div>
                          <p className="font-medium text-soul-green-dark flex items-center gap-2">
                            {event.title}
                            {event.isFeatured && (
                              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-soul-gold/20 text-soul-gold rounded">
                                FEATURED
                              </span>
                            )}
                          </p>
                          <p className="text-sm text-soul-brown/70 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" />
                            {event.venue}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-soul-green-dark">{formatDate(event.date)}</p>
                      <p className="text-sm text-soul-brown/70">{event.time}</p>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(event.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-soul-brown/50" />
                        <span className="text-sm text-soul-green-dark">
                          {event.ticketsSold}/{event.capacity}
                        </span>
                      </div>
                      <div className="w-20 h-1.5 bg-soul-cream-dark rounded-full mt-1">
                        <div
                          className="h-full bg-soul-green rounded-full"
                          style={{ width: `${(event.ticketsSold / event.capacity) * 100}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-soul-green-dark flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {formatCurrency(event.revenue)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/events/${event.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-soul-brown hover:text-soul-green">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/events/${event.id}/edit`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-soul-brown hover:text-soul-green">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-soul-brown hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredEvents.length === 0 && (
            <div className="px-6 py-12 text-center">
              <Calendar className="w-12 h-12 text-soul-brown/30 mx-auto mb-4" />
              <p className="text-soul-brown font-medium">No events found</p>
              <p className="text-soul-brown/60 text-sm mt-1">Try adjusting your filters or search query</p>
            </div>
          )}
        </Card>

        <div className="flex items-center justify-between mt-6 px-1">
          <p className="text-sm text-soul-brown/70">
            Showing {filteredEvents.length} of {sampleEvents.length} events
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled className="border-soul-cream-dark text-soul-brown/50">
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled className="border-soul-cream-dark text-soul-brown/50">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
