'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import {
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  MessageCircle,
  UserCircle,
  LogOut,
} from 'lucide-react';
import { toast } from 'sonner';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { useAuthSession } from '@/lib/hooks/useAuthSession';
import { buttonVariants } from '@/components/marketing/Button';
import { WhatsAppJoinGate } from '@/components/shared/WhatsAppJoinGate';

/**
 * Navbar (Step 3 of the redesign).
 *
 * NAV_LINKS has 9 entries, too many to sit inline on a single row at
 * desktop width, so the first four stay inline and the rest collapse
 * into a "More" dropdown. Mobile keeps the full flat list under the
 * hamburger, since there's no row-width constraint there. Every link
 * and function from NAV_LINKS is preserved; this is a visual/UX
 * restructure only.
 *
 * Uses the Step 1 tokens + Step 2 marketing Button primitive. Menu
 * behavior comes straight from @base-ui/react/menu (the same primitive
 * src/components/ui/dropdown-menu.tsx wraps for the admin dashboard),
 * but styled here independently so nothing in admin can be affected by
 * marketing-side changes.
 */

const PRIMARY_COUNT = 4;
const primaryLinks = NAV_LINKS.slice(0, PRIMARY_COUNT);
const secondaryLinks = NAV_LINKS.slice(PRIMARY_COUNT);

const navLinkClass =
  'px-3 py-2 text-sm font-medium text-foreground/70 hover:text-primary rounded-xl hover:bg-muted transition-colors';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuthSession();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [isOpen]);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    toast.success('Signed out');
    router.push('/');
    router.refresh();
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/95 backdrop-blur-md soul-shadow border-b border-border'
          : 'bg-transparent'
      )}
    >
      <div className="container-app">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/soul-logo.png"
              alt="SOUL Logo"
              width={48}
              height={48}
              className="rounded-full"
              priority
            />
            <span className="font-heading text-lg font-semibold text-primary hidden sm:block">
              S.O.U.L
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {primaryLinks.map((link) => (
              <Link key={link.href} href={link.href} className={navLinkClass}>
                {link.label}
              </Link>
            ))}

            <MenuPrimitive.Root>
              <MenuPrimitive.Trigger
                className={cn(navLinkClass, 'inline-flex items-center gap-1 data-[popup-open]:bg-muted data-[popup-open]:text-primary')}
              >
                More
                <ChevronDown className="w-3.5 h-3.5" />
              </MenuPrimitive.Trigger>
              <MenuPrimitive.Portal>
                <MenuPrimitive.Positioner className="z-50 outline-none" align="start" sideOffset={8}>
                  <MenuPrimitive.Popup className="min-w-[200px] rounded-2xl border border-border bg-card p-2 soul-shadow-lg outline-none data-[side=bottom]:slide-in-from-top-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95">
                    {secondaryLinks.map((link) => (
                      <MenuPrimitive.Item
                        key={link.href}
                        render={<Link href={link.href} />}
                        className="block cursor-default rounded-xl px-3 py-2 text-sm font-medium text-foreground/70 outline-none select-none data-[highlighted]:bg-muted data-[highlighted]:text-primary"
                      >
                        {link.label}
                      </MenuPrimitive.Item>
                    ))}
                  </MenuPrimitive.Popup>
                </MenuPrimitive.Positioner>
              </MenuPrimitive.Portal>
            </MenuPrimitive.Root>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <WhatsAppJoinGate
              className={cn(buttonVariants({ variant: 'primary', size: 'sm' }), 'gap-2')}
            >
              <MessageCircle className="w-4 h-4" />
              Join Community
              <ExternalLink className="w-3 h-3" />
            </WhatsAppJoinGate>
            <WhatsAppJoinGate
              className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'gap-2')}
            >
              <MessageCircle className="w-4 h-4" />
              Follow Channel
            </WhatsAppJoinGate>
            {user ? (
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-foreground/70 hover:text-primary rounded-xl hover:bg-muted transition-colors"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            ) : (
              <Link
                href="/sign-in"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-foreground/70 hover:text-primary rounded-xl hover:bg-muted transition-colors"
              >
                <UserCircle className="w-4 h-4" />
                Sign In
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 overflow-y-auto bg-background lg:hidden"
          >
            <div className="container-app py-4 space-y-1 min-h-full">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-foreground/70 hover:text-primary rounded-xl hover:bg-muted transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <WhatsAppJoinGate
                  className={cn(buttonVariants({ variant: 'primary', size: 'md' }), 'w-full')}
                >
                  <MessageCircle className="w-4 h-4" />
                  Join WhatsApp Community
                </WhatsAppJoinGate>
                <WhatsAppJoinGate
                  className={cn(buttonVariants({ variant: 'secondary', size: 'md' }), 'w-full')}
                >
                  <MessageCircle className="w-4 h-4" />
                  Follow WhatsApp Channel
                </WhatsAppJoinGate>
                {user ? (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleSignOut();
                    }}
                    className={cn(buttonVariants({ variant: 'ghost', size: 'md' }), 'w-full border border-border')}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                ) : (
                  <Link
                    href="/sign-in"
                    onClick={() => setIsOpen(false)}
                    className={cn(buttonVariants({ variant: 'ghost', size: 'md' }), 'w-full border border-border')}
                  >
                    <UserCircle className="w-4 h-4" />
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
