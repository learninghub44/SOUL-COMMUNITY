'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/constants';

export function Hero() {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Togetherness video background */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="https://images.pexels.com/videos/7660184/adult-brainstorming-business-child-7660184.jpeg"
        aria-hidden="true"
      >
        <source
          src="https://videos.pexels.com/video-files/7660184/7660184-uhd_1440_2560_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Periwinkle-to-lavender wash so the palette reads through the footage
          and text stays legible without a card sitting on top of it */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2E2A5C]/85 via-[#3A3480]/60 to-[#241F3D]/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(184,181,240,0.22),transparent_60%)]" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <Image
            src="/soul-logo-sm.png"
            alt="SOUL Logo"
            width={88}
            height={88}
            className="rounded-full shadow-2xl"
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mb-6 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl font-[family-name:var(--font-playfair)]"
        >
          Serving Opportunities,{' '}
          <span className="text-[#D9D6FA]">Uplifting Lives</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mb-10 max-w-2xl text-lg text-white/85 sm:text-xl"
        >
          {SITE_CONFIG.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href={SITE_CONFIG.whatsappCommunityLink}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-[#2E2A5C] transition-all hover:scale-105 hover:bg-white/70"
          >
            Join WhatsApp Community
          </a>
          <a
            href={SITE_CONFIG.whatsappChannelLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/50 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20"
          >
            Follow WhatsApp Channel
          </a>
        </motion.div>
      </div>

      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="h-9 w-9 rounded-full border border-white/50 bg-white/10 backdrop-blur-md"
        />
      </motion.button>
    </section>
  );
}
