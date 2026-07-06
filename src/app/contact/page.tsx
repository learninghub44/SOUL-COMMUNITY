'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { PageHeader } from '@/components/shared/PageHeader'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { SocialLinks } from '@/components/shared/SocialLinks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SITE_CONFIG } from '@/lib/constants'
import { createClient } from '@/lib/supabase/client'
import { createContactMessage } from '@/lib/services/contact'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const supabase = createClient()
      await createContactMessage(supabase, formData)

      toast.success('Message sent successfully!', {
        description: 'We will get back to you soon.',
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error('Failed to submit contact message:', err)
      toast.error('Could not send your message', {
        description: 'Please try again in a moment, or reach us directly via WhatsApp or email below.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      label: 'WA',
      title: 'WhatsApp Community',
      description: 'Join our vibrant community',
      href: SITE_CONFIG.whatsappCommunityLink || '#',
    },
    {
      label: 'WA',
      title: 'WhatsApp Channel',
      description: 'Stay updated with our channel',
      href: SITE_CONFIG.whatsappChannelLink || '#',
    },
    {
      label: '@',
      title: 'Email',
      description: SITE_CONFIG.email || 'info@soulcommunity.org',
      href: `mailto:${SITE_CONFIG.email || 'info@soulcommunity.org'}`,
    },
  ]

  return (
    <main className="min-h-screen bg-soul-cream">
      <PageHeader
        title="Contact Us"
        description="We'd love to hear from you"
      />

      <div className="container mx-auto px-4 py-16">
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Contact Form */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-soul-green-dark mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground/70 mb-2"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    maxLength={200}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full border-soul-cream-dark focus:border-soul-green focus:ring-soul-green"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground/70 mb-2"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={320}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full border-soul-cream-dark focus:border-soul-green focus:ring-soul-green"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-foreground/70 mb-2"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    maxLength={200}
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="w-full border-soul-cream-dark focus:border-soul-green focus:ring-soul-green"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground/70 mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    maxLength={5000}
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more..."
                    className="w-full border-soul-cream-dark focus:border-soul-green focus:ring-soul-green resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-soul-green hover:bg-soul-green-dark text-white py-6"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-soul-green-dark mb-2">
                Get in Touch
              </h2>

              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={item.title}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      item.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                    className="glass-card flex items-center gap-4 p-4 rounded-xl"
                  >
                    <div className="w-11 h-11 rounded-xl bg-soul-green/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-soul-green font-heading">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social Media */}
              {Object.values(SITE_CONFIG.social).some(Boolean) && (
                <div className="glass-card rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-4">
                    Follow Us
                  </h3>
                  <SocialLinks className="flex flex-wrap gap-3" />
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>

        {/* Location */}
        <AnimatedSection className="mt-16">
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-soul-cream-dark">
              <div>
                <h3 className="font-semibold text-foreground">Our Location</h3>
                <p className="text-sm text-muted-foreground">Nairobi, Kenya</p>
              </div>
            </div>
            <div className="relative h-80 bg-soul-cream-dark/40 flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground font-medium">
                  Map coming soon
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </main>
  )
}
