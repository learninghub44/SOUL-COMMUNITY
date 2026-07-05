'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import {
  Plus,
  Search,
  Calendar,
} from 'lucide-react'
import { EmptyState } from '@/components/shared/EmptyState'

type FilterTab = 'all' | 'published' | 'draft' | 'cancelled'

export default function AdminEventsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const tabs: { label: string; value: FilterTab; count: number }[] = [
    { label: 'All', value: 'all', count: 0 },
    { label: 'Published', value: 'published', count: 0 },
    { label: 'Draft', value: 'draft', count: 0 },
    { label: 'Cancelled', value: 'cancelled', count: 0 },
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
          <EmptyState
            icon={<Calendar className="w-8 h-8" />}
            title="No events yet"
            description="Create your first event to get started."
          />
        </Card>
      </div>
    </div>
  )
}
