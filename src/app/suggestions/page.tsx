'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Lightbulb, Loader2 } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { createSuggestion } from '@/lib/services/suggestions';

export default function SuggestionsPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) {
      toast.error('Please share your suggestion first.');
      return;
    }

    setSubmitting(true);
    try {
      const supabase = createClient();
      await createSuggestion(supabase, { name, email, message });
      toast.success('Thank you for your suggestion!', {
        description: 'Our team reviews every suggestion that comes in.',
      });
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error('Failed to submit suggestion:', err);
      toast.error('Could not send your suggestion', {
        description: 'Please try again in a moment.',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-soul-cream">
      <PageHeader
        title="Suggestion Box"
        description="Have an idea for a new page, activity, or resource? Tell us - your submission goes straight to our team."
      />

      <div className="container mx-auto px-4 py-16 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-2xl p-6 sm:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-soul-gold/10 flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5 text-soul-gold" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-soul-green-dark">Share an idea</h2>
              <p className="text-sm text-muted-foreground">
                Only the SOUL admin team can see submissions.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Your Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={submitting}
            />
            <Input
              type="email"
              placeholder="Your Email (optional, in case we want to follow up)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
            />
            <Textarea
              placeholder="What would you like to see on SOUL?"
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 2000))}
              disabled={submitting}
              rows={5}
            />
            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-11 bg-soul-green hover:bg-soul-green-dark text-white font-medium"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Suggestion'
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
