'use client';

import { motion } from 'framer-motion';
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

      {/* Deep forest wash so the palette reads through the footage
          and text stays legible without a card sitting on top of it */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#10241A]/85 via-[#17301F]/60 to-[#0B1811]/85" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(200,155,60,0.18),transparent_60%)]" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="mb-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl font-heading"
        >
          Serving Opportunities,{' '}
          <span className="text-[#DDB968]">Uplifting Lives</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="mb-10 max-w-2xl text-lg text-white/85 sm:text-xl"
        >
          {SITE_CONFIG.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href={SITE_CONFIG.whatsappCommunityLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C89B3C] px-8 py-4 text-base font-semibold text-[#17301F] shadow-[0_10px_30px_-6px_rgba(200,155,60,0.5)] transition-all hover:scale-105 hover:bg-[#DDB968]"
          >
            Join WhatsApp Community
          </a>
          <a
            href={SITE_CONFIG.whatsappChannelLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/5 px-8 py-4 text-base font-medium text-white/90 backdrop-blur-sm transition-all hover:bg-white/15"
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
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        aria-label="Scroll down"
      >
        <span className="soul-dotted-arc w-16 text-white/50" />
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm"
        >
          <span className="block h-2 w-2 rounded-full bg-[#DDB968]" />
        </motion.span>
      </motion.button>
    </section>
  );
}
