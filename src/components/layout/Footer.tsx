'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, ExternalLink } from 'lucide-react';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';

export function Footer() {
  const quickLinks = NAV_LINKS.filter((link) => link.href !== '/');

  return (
    <footer className="bg-soul-green-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/soul-logo.png"
                alt="SOUL Logo"
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <h3 className="font-heading text-lg font-semibold">S.O.U.L</h3>
                <p className="text-xs text-white/60">Serving Opportunities, Uplifting Lives</p>
              </div>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed">
              {SITE_CONFIG.description}
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-soul-gold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-soul-gold mb-4">Connect With Us</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={SITE_CONFIG.whatsappCommunityLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-soul-green-light" />
                  WhatsApp Community
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.whatsappChannelLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-soul-gold" />
                  WhatsApp Channel
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-soul-green-light" />
                  {SITE_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-soul-gold mb-4">Join Our Community</h4>
            <p className="text-sm text-white/70 mb-4">
              Be part of a movement that serves, uplifts, and transforms lives.
            </p>
            <div className="space-y-3">
              <a
                href={SITE_CONFIG.whatsappCommunityLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-soul-green text-white text-sm font-medium rounded-full hover:bg-soul-green-light transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Join Community
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={SITE_CONFIG.whatsappChannelLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-soul-gold text-white text-sm font-medium rounded-full hover:bg-soul-gold-light transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Follow Channel
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 flex flex-col items-center gap-4">
          <span className="soul-dotted-arc w-20 text-soul-gold/60" />
          <p className="text-xs text-white/50 text-center">
            © 2025–{new Date().getFullYear()} S.O.U.L – Serving Opportunities, Uplifting Lives. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
