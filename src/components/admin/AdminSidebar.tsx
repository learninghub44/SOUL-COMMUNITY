'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  Ticket,
  Megaphone,
  Image,
  CalendarDays,
  FolderOpen,
  Settings,
  Menu,
  LogOut,
  Loader2,
  Mail,
  Lightbulb,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/events', label: 'Workshops', icon: Calendar },
  { href: '/admin/tickets', label: 'Tickets', icon: Ticket },
  { href: '/admin/announcements', label: 'Announcements', icon: Megaphone },
  { href: '/admin/gallery', label: 'Gallery', icon: Image },
  { href: '/admin/team', label: 'Team', icon: Users },
  { href: '/admin/weekly-activities', label: 'Weekly Activities', icon: CalendarDays },
  { href: '/admin/resources', label: 'Resources', icon: FolderOpen },
  { href: '/admin/messages', label: 'Messages', icon: Mail },
  { href: '/admin/suggestions', label: 'Suggestions', icon: Lightbulb },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

interface AdminProfile {
  email: string;
  full_name: string | null;
}

function SidebarContent({
  onLinkClick,
  profile,
}: {
  onLinkClick?: () => void;
  profile: AdminProfile;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  const initial = (profile.full_name || profile.email || 'A')
    .trim()
    .charAt(0)
    .toUpperCase();

  async function handleLogout() {
    setSigningOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      toast.success('Signed out');
      router.push('/admin/login');
      router.refresh();
    } catch {
      toast.error('Could not sign out. Please try again.');
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <Link href="/admin" className="flex items-center gap-3" onClick={onLinkClick}>
          <div className="w-9 h-9 rounded-lg soul-gradient-green flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <div>
            <h1 className="font-bold text-foreground text-lg leading-tight">SOUL</h1>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const isActive =
            link.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(link.href);
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onLinkClick}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-soul-green text-white'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-soul-green/10 flex items-center justify-center shrink-0">
            <span className="text-soul-green font-medium text-sm">{initial}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {profile.full_name || 'Admin'}
            </p>
            <p className="text-xs text-muted-foreground truncate">{profile.email}</p>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            className="shrink-0 text-muted-foreground hover:text-destructive"
            onClick={handleLogout}
            disabled={signingOut}
            title="Sign out"
          >
            {signingOut ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogOut className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function AdminSidebar({
  children,
  profile,
}: {
  children: React.ReactNode;
  profile: AdminProfile;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-soul-cream">
      <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-border px-4 h-14 flex items-center gap-3">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={<Button variant="ghost" size="icon" />}
          >
            <Menu className="w-5 h-5" />
            <span className="sr-only">Toggle menu</span>
          </SheetTrigger>
          <SheetContent side="left" showCloseButton={false} className="w-64 p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <SidebarContent onLinkClick={() => setOpen(false)} profile={profile} />
          </SheetContent>
        </Sheet>

        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md soul-gradient-green flex items-center justify-center">
            <span className="text-white font-bold text-xs">S</span>
          </div>
          <span className="font-bold text-foreground">SOUL Admin</span>
        </Link>
      </header>

      <div className="flex">
        <aside className="hidden lg:block w-64 fixed inset-y-0 left-0 bg-white border-r border-border z-30">
          <SidebarContent profile={profile} />
        </aside>

        <main className="flex-1 lg:ml-64 min-h-screen">
          <div className="p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
