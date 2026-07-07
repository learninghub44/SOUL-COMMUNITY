'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Loader2, Eye, EyeOff, MapPin, Check } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { createClient } from '@/lib/supabase/client';
import { signUpMember } from '@/lib/services/members';
import { GENDER_OPTIONS, KENYA_COUNTIES, SUPPORT_CATEGORIES } from '@/lib/constants';

export default function SignUpPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [locating, setLocating] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [county, setCounty] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [statement, setStatement] = useState('');
  const [emName, setEmName] = useState('');
  const [emPhone, setEmPhone] = useState('');
  const [emRelationship, setEmRelationship] = useState('');
  const [password, setPassword] = useState('');

  function toggleCategory(cat: string) {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  function useLiveLocation() {
    if (!navigator.geolocation) {
      toast.error('Location is not supported on this device.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
        toast.success('Location captured');
      },
      () => {
        setLocating(false);
        toast.error('Could not get your location. You can skip this - it is optional.');
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !password) {
      toast.error('Full name, email, and password are required.');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    setSubmitting(true);
    try {
      const supabase = createClient();
      const { session } = await signUpMember(supabase, {
        full_name: fullName.trim(),
        email: email.trim(),
        password,
        phone: phone.trim() || undefined,
        gender: gender || undefined,
        age: age ? Number(age) : null,
        county: county || undefined,
        support_categories: categories,
        personal_statement: statement.trim() || undefined,
        emergency_contact_name: emName.trim() || undefined,
        emergency_contact_phone: emPhone.trim() || undefined,
        emergency_contact_relationship: emRelationship.trim() || undefined,
        location_lat: location?.lat ?? null,
        location_lng: location?.lng ?? null,
      });

      if (session) {
        toast.success('Account created. Welcome to SOUL.');
        router.push('/');
      } else {
        toast.success('Account created!', {
          description: 'Check your email to confirm your account, then sign in.',
        });
        router.push('/sign-in');
      }
    } catch (err) {
      console.error('Sign up failed:', err);
      toast.error(err instanceof Error ? err.message : 'Could not create your account');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-soul-cream">
      <PageHeader
        title="Join Our Community"
        description="Creating an account is never required to browse SOUL - it's here if you'd like support and want us to be able to reach you."
      />

      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-2xl p-6 sm:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-soul-green-dark">Basic Information</h2>
              <Input
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={submitting}
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting}
              />
              <Input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={submitting}
              />
              <Select value={gender} onValueChange={(val) => setGender(val ?? '')}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  {GENDER_OPTIONS.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                min={0}
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                disabled={submitting}
              />
              <Select value={county} onValueChange={(val) => setCounty(val ?? '')}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select County (Kenya)" />
                </SelectTrigger>
                <SelectContent>
                  {KENYA_COUNTIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-soul-green-dark">Support Category</h2>
              <p className="text-sm text-muted-foreground">
                What type of support are you looking for? (Select all that apply)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SUPPORT_CATEGORIES.map((cat) => {
                  const checked = categories.includes(cat);
                  return (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className="flex items-center gap-2 text-left text-sm py-1.5 group"
                    >
                      <span
                        className={`w-4 h-4 shrink-0 rounded border flex items-center justify-center transition-colors ${
                          checked
                            ? 'bg-soul-green border-soul-green'
                            : 'border-soul-green/40 group-hover:border-soul-green'
                        }`}
                      >
                        {checked && <Check className="w-3 h-3 text-white" />}
                      </span>
                      <span className="text-foreground/80">{cat}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-semibold text-soul-green-dark">
                Personal Statement (Optional)
              </h2>
              <Textarea
                placeholder="Tell us more about your situation or what kind of support you're seeking - max 200 characters"
                value={statement}
                onChange={(e) => setStatement(e.target.value.slice(0, 200))}
                disabled={submitting}
                rows={3}
              />
              <p className="text-xs text-muted-foreground text-right">
                {statement.length}/200
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-soul-green-dark">
                Emergency Contact (Optional)
              </h2>
              <Input
                placeholder="Contact Name"
                value={emName}
                onChange={(e) => setEmName(e.target.value)}
                disabled={submitting}
              />
              <Input
                type="tel"
                placeholder="Contact Phone Number"
                value={emPhone}
                onChange={(e) => setEmPhone(e.target.value)}
                disabled={submitting}
              />
              <Input
                placeholder="Relationship (e.g. Parent, Sibling)"
                value={emRelationship}
                onChange={(e) => setEmRelationship(e.target.value)}
                disabled={submitting}
              />
            </section>

            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-soul-green-dark">
                  Live Location (Optional)
                </h2>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={useLiveLocation}
                  disabled={locating}
                  className="border-soul-gold text-soul-gold-dark hover:bg-soul-gold/10"
                >
                  {locating ? (
                    <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                  ) : (
                    <MapPin className="w-4 h-4 mr-1.5" />
                  )}
                  {location ? 'Location Captured' : 'Use Live Location'}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Sharing your location helps us connect you to nearby support -
                it&apos;s entirely optional and only visible to admins.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-semibold text-soul-green-dark">Password</h2>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={submitting}
                  className="pr-10"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </section>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-12 bg-soul-gold hover:bg-soul-gold-dark text-white font-medium text-base"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/sign-in" className="text-soul-green font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
