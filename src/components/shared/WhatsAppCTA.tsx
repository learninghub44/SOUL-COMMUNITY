'use client';

import { motion } from 'framer-motion';
import { MessageCircle, ExternalLink } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export function WhatsAppCTA() {
  return (
    <section className="py-20 bg-soul-cream-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--soul-green)_0%,_transparent_50%)]" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-[family-name:var(--font-playfair)] mb-4">
            Join SOUL Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Become part of a community that serves, uplifts, and transforms lives.
            Connect with like-minded individuals and make a difference.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href={SITE_CONFIG.whatsappCommunityLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-soul-green text-white font-semibold rounded-full shadow-lg hover:bg-soul-green-dark transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Join WhatsApp Community
              <ExternalLink className="w-4 h-4" />
            </motion.a>
            <motion.a
              href={SITE_CONFIG.whatsappChannelLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-soul-gold text-white font-semibold rounded-full shadow-lg hover:bg-soul-gold-dark transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Follow WhatsApp Channel
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
