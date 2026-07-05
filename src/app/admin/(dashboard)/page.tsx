'use client';

import { useEffect, useState } from 'react';
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
  Loader2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { createClient } from '@/lib/supabase/client';

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

interface DashboardStats {
  totalEvents: number;
  upcomingEvents: number;
  totalAnnouncements: number;
  galleryImages: number;
  ticketsSold: number;
  totalRevenue: number;
}

async function fetchDashboardStats(): Promise<DashboardStats> {
  const supabase = createClient();
  const today = new Date().toISOString().slice(0, 10);

  const [
    totalEvents,
    upcomingEvents,
    totalAnnouncements,
    galleryImages,
    ticketsSold,
    paidTickets,
  ] = await Promise.all([
    supabase.from('events').select('id', { count: 'exact', head: true }),
    supabase
      .from('events')
      .select('id', { count: 'exact', head: true })
      .gte('date', today)
      .eq('status', 'published'),
    supabase.from('announcements').select('id', { count: 'exact', head: true }),
    supabase.from('gallery_images').select('id', { count: 'exact', head: true }),
    supabase
      .from('tickets')
      .select('id', { count: 'exact', head: true })
      .eq('payment_status', 'paid'),
    supabase.from('tickets').select('event_id').eq('payment_status', 'paid'),
  ]);

  let totalRevenue = 0;
  const paidRows = paidTickets.data || [];
  if (paidRows.length > 0) {
    const eventIds = [...new Set(paidRows.map((t) => t.event_id))];
    const { data: eventPrices } = await supabase
      .from('events')
      .select('id, ticket_price')
      .in('id', eventIds);
    const priceMap = new Map(
      (eventPrices || []).map((e) => [e.id, e.ticket_price || 0])
    );
    totalRevenue = paidRows.reduce(
      (sum, t) => sum + (priceMap.get(t.event_id) || 0),
      0
    );
  }

  return {
    totalEvents: totalEvents.count ?? 0,
    upcomingEvents: upcomingEvents.count ?? 0,
    totalAnnouncements: totalAnnouncements.count ?? 0,
    galleryImages: galleryImages.count ?? 0,
    ticketsSold: ticketsSold.count ?? 0,
    totalRevenue,
  };
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    let active = true;
    fetchDashboardStats().then((data) => {
      if (active) setStats(data);
    });
    return () => {
      active = false;
    };
  }, []);

  const statCards = stats
    ? [
        {
          title: 'Total Events',
          value: String(stats.totalEvents),
          icon: Calendar,
          color: 'text-soul-green',
          bg: 'bg-soul-green/10',
        },
        {
          title: 'Upcoming Events',
          value: String(stats.upcomingEvents),
          icon: CalendarCheck,
          color: 'text-soul-gold',
          bg: 'bg-soul-gold/10',
        },
        {
          title: 'Total Announcements',
          value: String(stats.totalAnnouncements),
          icon: Megaphone,
          color: 'text-soul-brown',
          bg: 'bg-soul-brown/10',
        },
        {
          title: 'Gallery Images',
          value: String(stats.galleryImages),
          icon: Image,
          color: 'text-soul-green-light',
          bg: 'bg-soul-green-light/10',
        },
        {
          title: 'Tickets Sold',
          value: String(stats.ticketsSold),
          icon: Ticket,
          color: 'text-soul-brown-light',
          bg: 'bg-soul-brown-light/10',
        },
        {
          title: 'Total Revenue',
          value: `KSh ${stats.totalRevenue.toLocaleString()}`,
          icon: DollarSign,
          color: 'text-soul-gold-light',
          bg: 'bg-soul-gold-light/10',
        },
      ]
    : [];

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
        {!stats ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-soul-green" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {statCards.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.title}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
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
        )}
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No recent activity yet.</p>
            <p className="text-sm text-muted-foreground/70">
              Activity will appear here as you manage your community.
            </p>
          </CardContent>
        </Card>
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <Card>
          <CardContent className="space-y-3 pt-6">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.label} href={action.href}>
                  <Button className={`w-full justify-start h-11 ${action.color}`}>
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
  );
}
