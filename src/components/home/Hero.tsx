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

      {/* Periwinkle-to-lavender wash so the palette reads through the footage */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2E2A5C]/80 via-[#4A4499]/65 to-[#6A63C4]/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(184,181,240,0.25),transparent_65%)]" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="glass-panel w-full max-w-3xl rounded-[2rem] px-6 py-10 sm:px-12 sm:py-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="mb-6 flex justify-center"
          >
            <Image
              src="/soul-logo-sm.png"
              alt="SOUL Logo"
              width={72}
              height={72}
              className="rounded-full shadow-lg"
              priority
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
            className="mb-5 max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl font-[family-name:var(--font-playfair)] mx-auto"
          >
            Serving Opportunities,{' '}
            <span className="text-[#D9D6FA]">Uplifting Lives</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="mb-9 max-w-xl mx-auto text-base text-white/85 sm:text-lg"
          >
            {SITE_CONFIG.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: 'easeOut' }}
            className="flex flex-col gap-3 sm:flex-row sm:justify-center"
          >
            <a
              href={SITE_CONFIG.whatsappCommunityLink}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-[#2E2A5C] transition-all hover:scale-[1.03] hover:bg-white/70"
            >
              Join WhatsApp Community
            </a>
            <a
              href={SITE_CONFIG.whatsappChannelLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/50 bg-white/10 px-8 py-4 text-base font-semibold text-white transition-all hover:scale-[1.03] hover:bg-white/20"
            >
              Follow WhatsApp Channel
            </a>
          </motion.div>
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
