'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ExternalLink, MessageCircle, UserCircle, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { useAuthSession } from '@/lib/hooks/useAuthSession';

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
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-soul-cream-dark'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/soul-logo.png"
              alt="SOUL Logo"
              width={56}
              height={56}
              className="rounded-full"
              priority
            />
            <span className="font-heading text-lg font-semibold text-soul-green hidden sm:block">
              S.O.U.L
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-soul-green rounded-lg hover:bg-soul-cream-dark/50 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={SITE_CONFIG.whatsappCommunityLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-soul-green text-white text-sm font-medium rounded-full hover:bg-soul-green-dark transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Join Community
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={SITE_CONFIG.whatsappChannelLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-soul-gold text-white text-sm font-medium rounded-full hover:bg-soul-gold-dark transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Follow Channel
            </a>
            {user ? (
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-foreground/70 hover:text-soul-green rounded-lg hover:bg-soul-cream-dark/50 transition-all"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            ) : (
              <Link
                href="/sign-in"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-foreground/70 hover:text-soul-green rounded-lg hover:bg-soul-cream-dark/50 transition-all"
              >
                <UserCircle className="w-4 h-4" />
                Sign In
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-soul-cream-dark/50 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-b border-soul-cream-dark"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-foreground/70 hover:text-soul-green rounded-lg hover:bg-soul-cream-dark/50 transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <a
                  href={SITE_CONFIG.whatsappCommunityLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-soul-green text-white text-sm font-medium rounded-full"
                >
                  <MessageCircle className="w-4 h-4" />
                  Join WhatsApp Community
                </a>
                <a
                  href={SITE_CONFIG.whatsappChannelLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-soul-gold text-white text-sm font-medium rounded-full"
                >
                  <MessageCircle className="w-4 h-4" />
                  Follow WhatsApp Channel
                </a>
                {user ? (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleSignOut();
                    }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-soul-cream-dark text-foreground/70 text-sm font-medium rounded-full"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                ) : (
                  <Link
                    href="/sign-in"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-soul-cream-dark text-foreground/70 text-sm font-medium rounded-full"
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
