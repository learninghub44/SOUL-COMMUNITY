'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  Search,
  Calendar,
  Loader2,
  MoreVertical,
  Pencil,
  Trash2,
  MapPin,
} from 'lucide-react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { EmptyState } from '@/components/shared/EmptyState'
import { createClient } from '@/lib/supabase/client'
import { listEvents, deleteEvent } from '@/lib/services/events'
import type { Event } from '@/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type FilterTab = 'all' | 'published' | 'draft' | 'cancelled'

const statusVariant: Record<Event['status'], 'default' | 'secondary' | 'destructive'> = {
  published: 'default',
  draft: 'secondary',
  cancelled: 'destructive',
}

export default function AdminEventsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    const supabase = createClient()

    listEvents(supabase)
      .then((data) => {
        if (active) setEvents(data)
      })
      .catch(() => {
        toast.error('Could not load workshops')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const tabs: { label: string; value: FilterTab; count: number }[] = [
    { label: 'All', value: 'all', count: events.length },
    { label: 'Published', value: 'published', count: events.filter(e => e.status === 'published').length },
    { label: 'Draft', value: 'draft', count: events.filter(e => e.status === 'draft').length },
    { label: 'Cancelled', value: 'cancelled', count: events.filter(e => e.status === 'cancelled').length },
  ]

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesTab = activeTab === 'all' || event.status === activeTab
      const matchesSearch =
        searchQuery.trim() === '' ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.venue?.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesTab && matchesSearch
    })
  }, [events, activeTab, searchQuery])

  async function handleDelete(id: string) {
    if (!confirm('Delete this workshop? This cannot be undone.')) return

    setDeletingId(id)
    try {
      const supabase = createClient()
      await deleteEvent(supabase, id)
      setEvents((prev) => prev.filter((e) => e.id !== id))
      toast.success('Workshop deleted')
    } catch {
      toast.error('Could not delete workshop')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-soul-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-soul-green-dark">Workshops</h1>
            <p className="text-soul-brown mt-1">Manage your community workshops</p>
          </div>
          <Link href="/admin/events/new">
            <Button className="bg-soul-green hover:bg-soul-green-dark text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Workshop
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
              placeholder="Search workshops..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-soul-cream-dark focus:border-soul-green"
            />
          </div>
        </div>

        <Card className="bg-white overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-soul-green" />
            </div>
          ) : filteredEvents.length === 0 ? (
            <EmptyState
              icon={<Calendar className="w-8 h-8" />}
              title={events.length === 0 ? 'No workshops yet' : 'No workshops match your filters'}
              description={
                events.length === 0
                  ? 'Create your first workshop to get started.'
                  : 'Try a different search term or filter.'
              }
            />
          ) : (
            <div className="divide-y divide-border">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between gap-4 p-4 sm:p-6 hover:bg-soul-cream/40 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-foreground truncate">{event.title}</h3>
                      <Badge variant={statusVariant[event.status] ?? 'secondary'}>
                        {event.status}
                      </Badge>
                      {event.is_featured && <Badge variant="outline">Featured</Badge>}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                      {event.date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {format(new Date(event.date), 'MMM d, yyyy')}
                        </span>
                      )}
                      {event.venue && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {event.venue}
                        </span>
                      )}
                      <span>{event.tickets_sold} / {event.capacity || '∞'} tickets</span>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={<Button variant="ghost" size="icon" disabled={deletingId === event.id} />}
                    >
                      {deletingId === event.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <MoreVertical className="w-4 h-4" />
                      )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        render={<Link href={`/admin/events/edit?id=${event.id}`} />}
                      >
                        <Pencil className="w-4 h-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => handleDelete(event.id)}
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
