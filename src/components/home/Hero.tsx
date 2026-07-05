'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MessageCircle, ExternalLink, ChevronDown } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

const floatingShapes = [
  { size: 80, x: '10%', y: '20%', delay: 0, duration: 20 },
  { size: 60, x: '80%', y: '15%', delay: 2, duration: 25 },
  { size: 100, x: '70%', y: '60%', delay: 4, duration: 22 },
  { size: 50, x: '20%', y: '70%', delay: 1, duration: 18 },
  { size: 70, x: '90%', y: '40%', delay: 3, duration: 24 },
  { size: 40, x: '5%', y: '50%', delay: 5, duration: 20 },
  { size: 90, x: '60%', y: '80%', delay: 2.5, duration: 26 },
  { size: 55, x: '40%', y: '10%', delay: 1.5, duration: 21 },
];

export function Hero() {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 soul-gradient-green" />

      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/5"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
          }}
          animate={{
            y: [0, -30, 0, 30, 0],
            x: [0, 15, 0, -15, 0],
            scale: [1, 1.1, 1, 0.9, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,168,78,0.15),transparent_70%)]"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <Image
            src="/soul-logo.png"
            alt="SOUL Logo"
            width={180}
            height={180}
            className="drop-shadow-2xl"
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="mb-6 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl font-[family-name:var(--font-playfair)]"
        >
          Serving Opportunities,{' '}
          <span className="text-soul-gold-light">Uplifting Lives</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="mb-10 max-w-2xl text-lg text-white/80 sm:text-xl"
        >
          {SITE_CONFIG.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <a
            href={SITE_CONFIG.whatsappCommunityLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-soul-green px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-soul-green-dark hover:shadow-xl hover:scale-105"
          >
            <MessageCircle className="h-5 w-5" />
            Join WhatsApp Community
            <ExternalLink className="h-4 w-4" />
          </a>
          <a
            href={SITE_CONFIG.whatsappChannelLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-soul-gold px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-soul-gold-dark hover:shadow-xl hover:scale-105"
          >
            <MessageCircle className="h-5 w-5" />
            Follow WhatsApp Channel
            <ExternalLink className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70 hover:text-white transition-colors"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </motion.button>
    </section>
  );
}
