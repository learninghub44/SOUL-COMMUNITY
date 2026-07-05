'use client';

import Link from 'next/link';
import {
  Calendar,
  CalendarCheck,
  Megaphone,
  Image,
  Ticket,
  DollarSign,
  Plus,
  Upload,
  ArrowRight,
  Clock,
  Users,
  TrendingUp,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

const stats = [
  {
    title: 'Total Events',
    value: '24',
    icon: Calendar,
    change: '+3 this month',
    color: 'text-soul-green',
    bg: 'bg-soul-green/10',
  },
  {
    title: 'Upcoming Events',
    value: '8',
    icon: CalendarCheck,
    change: 'Next: Jan 15',
    color: 'text-soul-gold',
    bg: 'bg-soul-gold/10',
  },
  {
    title: 'Total Announcements',
    value: '56',
    icon: Megaphone,
    change: '+12 this month',
    color: 'text-soul-brown',
    bg: 'bg-soul-brown/10',
  },
  {
    title: 'Gallery Images',
    value: '342',
    icon: Image,
    change: '+28 this week',
    color: 'text-soul-green-light',
    bg: 'bg-soul-green-light/10',
  },
  {
    title: 'Tickets Sold',
    value: '1,247',
    icon: Ticket,
    change: '+89 this week',
    color: 'text-soul-brown-light',
    bg: 'bg-soul-brown-light/10',
  },
  {
    title: 'Total Revenue',
    value: '$12,450',
    icon: DollarSign,
    change: '+$1,200 this month',
    color: 'text-soul-gold-light',
    bg: 'bg-soul-gold-light/10',
  },
];

const recentActivity = [
  {
    id: '1',
    action: 'New event created',
    detail: 'Business Networking Night',
    time: '2 hours ago',
    icon: Calendar,
    color: 'text-soul-green',
  },
  {
    id: '2',
    action: 'Tickets sold',
    detail: '15 tickets for Nature Hike',
    time: '4 hours ago',
    icon: Ticket,
    color: 'text-soul-gold',
  },
  {
    id: '3',
    action: 'Announcement posted',
    detail: 'Community Meetup Reminder',
    time: '6 hours ago',
    icon: Megaphone,
    color: 'text-soul-brown',
  },
  {
    id: '4',
    action: 'Photos uploaded',
    detail: '12 photos to Outdoor gallery',
    time: '1 day ago',
    icon: Image,
    color: 'text-soul-green-light',
  },
  {
    id: '5',
    action: 'New member joined',
    detail: 'sarah@example.com',
    time: '1 day ago',
    icon: Users,
    color: 'text-soul-brown-light',
  },
];

const quickActions = [
  {
    label: 'Create Event',
    href: '/admin/events/new',
    icon: Plus,
    color: 'bg-soul-green hover:bg-soul-green-dark text-white',
  },
  {
    label: 'New Announcement',
    href: '/admin/announcements/new',
    icon: Megaphone,
    color: 'bg-soul-brown hover:bg-soul-brown/90 text-white',
  },
  {
    label: 'Upload Photos',
    href: '/admin/gallery/upload',
    icon: Upload,
    color: 'bg-soul-gold hover:bg-soul-gold/90 text-soul-green-dark',
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <AnimatedSection>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your community.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {stat.change}
                      </p>
                    </div>
                    <div className={`p-2.5 rounded-lg ${stat.bg}`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AnimatedSection delay={0.2} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-soul-green" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 pb-4 last:pb-0 border-b border-border last:border-0"
                    >
                      <div className={`p-2 rounded-lg bg-muted shrink-0 mt-0.5`}>
                        <Icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          {activity.action}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {activity.detail}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                        {activity.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.label} href={action.href}>
                    <Button
                      className={`w-full justify-start h-11 ${action.color}`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {action.label}
                      <ArrowRight className="w-4 h-4 ml-auto" />
                    </Button>
                  </Link>
                );
              })}
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
}
