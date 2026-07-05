'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Image, Megaphone, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const icons = { Home, Calendar, Image, Megaphone, Phone };

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: 'Home' },
  { href: '/events', label: 'Events', icon: 'Calendar' },
  { href: '/gallery', label: 'Gallery', icon: 'Image' },
  { href: '/announcements', label: 'News', icon: 'Megaphone' },
  { href: '/contact', label: 'Contact', icon: 'Phone' },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-soul-cream-dark safe-area-bottom lg:hidden">
      <div className="grid grid-cols-5 h-16">
        {NAV_ITEMS.map((item) => {
          const Icon = icons[item.icon as keyof typeof icons];
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors',
                isActive
                  ? 'text-soul-green'
                  : 'text-muted-foreground hover:text-soul-green'
              )}
            >
              <Icon className={cn('w-5 h-5', isActive && 'text-soul-green')} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
