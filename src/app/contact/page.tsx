'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Send,
  ExternalLink,
  Globe,
  Share2,
  Link,
  Video,
} from 'lucide-react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/shared/PageHeader'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SITE_CONFIG } from '@/lib/constants'

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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast.success('Message sent successfully!', {
      description: 'We will get back to you soon.',
    })

    setFormData({ name: '', email: '', subject: '', message: '' })
    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: MessageCircle,
      title: 'WhatsApp Community',
      description: 'Join our vibrant community',
      href: SITE_CONFIG.whatsappCommunityLink || '#',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Channel',
      description: 'Stay updated with our channel',
      href: SITE_CONFIG.whatsappChannelLink || '#',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      icon: Mail,
      title: 'Email',
      description: SITE_CONFIG.email || 'info@soulcommunity.org',
      href: `mailto:${SITE_CONFIG.email || 'info@soulcommunity.org'}`,
      color: 'text-soul-brown',
      bgColor: 'bg-amber-50',
    },
    {
      icon: Phone,
      title: 'Phone',
      description: SITE_CONFIG.phone || '+254 700 000 000',
      href: `tel:${SITE_CONFIG.phone || '+254700000000'}`,
      color: 'text-soul-green',
      bgColor: 'bg-green-50',
    },
  ]

  const socialLinks = [
    {
      icon: Globe,
      name: 'Facebook',
      href: '#',
      color: 'hover:text-blue-600',
    },
    {
      icon: Share2,
      name: 'Instagram',
      href: '#',
      color: 'hover:text-pink-500',
    },
    {
      icon: Link,
      name: 'Twitter',
      href: '#',
      color: 'hover:text-sky-500',
    },
    {
      icon: Video,
      name: 'YouTube',
      href: '#',
      color: 'hover:text-red-600',
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(45,90,61,0.08)]">
              <h2 className="text-2xl font-bold text-soul-green-dark mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full border-gray-200 focus:border-soul-green focus:ring-soul-green"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full border-gray-200 focus:border-soul-green focus:ring-soul-green"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="w-full border-gray-200 focus:border-soul-green focus:ring-soul-green"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more..."
                    className="w-full border-gray-200 focus:border-soul-green focus:ring-soul-green resize-none"
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
                    <span className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-soul-green-dark mb-6">
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
                    className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-[0_2px_12px_rgba(45,90,61,0.06)] hover:shadow-[0_4px_20px_rgba(45,90,61,0.12)] transition-shadow"
                  >
                    <div
                      className={`p-3 rounded-xl ${item.bgColor}`}
                    >
                      <item.icon className={`h-6 w-6 ${item.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </motion.a>
                ))}
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-xl p-6 shadow-[0_2px_12px_rgba(45,90,61,0.06)]">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Follow Us
                </h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-gray-50 rounded-xl text-gray-600 ${social.color} transition-colors`}
                      aria-label={social.name}
                    >
                      <social.icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Google Maps Placeholder */}
        <AnimatedSection className="mt-16">
          <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(45,90,61,0.08)]">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-soul-green/10 rounded-lg">
                  <MapPin className="h-5 w-5 text-soul-green" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Our Location</h3>
                  <p className="text-sm text-gray-600">
                    {'Nairobi, Kenya'}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-80 bg-gray-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-soul-green/40 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">
                    Google Maps Integration
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Map will be displayed here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </main>
  )
}