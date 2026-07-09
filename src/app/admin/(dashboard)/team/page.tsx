'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Upload,
  Plus,
  X,
  Loader2,
  Trash2,
  Star,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { EmptyState } from '@/components/shared/EmptyState'
import { createClient } from '@/lib/supabase/client'
import { listTeamMembers, createTeamMember, deleteTeamMember } from '@/lib/services/team'
import type { TeamMember } from '@/types'

export default function TeamAdminPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const [showAddModal, setShowAddModal] = useState(false)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [bio, setBio] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [isFounder, setIsFounder] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let active = true
    const supabase = createClient()
    listTeamMembers(supabase)
      .then((data) => active && setMembers(data))
      .catch(() => toast.error('Could not load team members'))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  function resetForm() {
    setPhotoFile(null)
    setName('')
    setRole('')
    setBio('')
    setPhone('')
    setEmail('')
    setIsFounder(false)
  }

  async function handleAdd() {
    if (!photoFile) {
      toast.error('Choose a photo first')
      return
    }
    if (!name.trim()) {
      toast.error('Enter a name')
      return
    }
    if (!role.trim()) {
      toast.error('Enter a role')
      return
    }
    setSaving(true)
    try {
      const supabase = createClient()
      const member = await createTeamMember(supabase, photoFile, {
        name: name.trim(),
        role: role.trim(),
        bio: bio.trim(),
        phone: phone.trim(),
        email: email.trim(),
        is_founder: isFounder,
      })
      setMembers((prev) =>
        [...prev, member].sort((a, b) => a.sort_order - b.sort_order)
      )
      toast.success('Team member added')
      setShowAddModal(false)
      resetForm()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not add team member')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(member: TeamMember) {
    if (!confirm(`Remove ${member.name} from the team? This cannot be undone.`)) return
    setDeletingId(member.id)
    try {
      const supabase = createClient()
      await deleteTeamMember(supabase, member)
      setMembers((prev) => prev.filter((m) => m.id !== member.id))
      toast.success('Team member removed')
    } catch {
      toast.error('Could not remove team member')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-soul-cream p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-soul-green-dark">Team</h1>
            <p className="text-soul-brown mt-1">
              Manage who appears on the public Team page
            </p>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-soul-green hover:bg-soul-green-dark text-white flex items-center gap-2"
          >
            <Plus size={18} />
            Add Team Member
          </Button>
        </div>

        <Card className="bg-white overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-soul-green" />
            </div>
          ) : members.length === 0 ? (
            <EmptyState
              icon={<Users className="w-8 h-8" />}
              title="No team members yet"
              description="Add your first team member to have them show up on the Team page."
            />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="group relative rounded-lg overflow-hidden border border-soul-cream-dark"
                >
                  <img
                    src={member.image_url}
                    alt={member.name}
                    className="w-full h-40 object-cover"
                  />
                  {member.is_founder && (
                    <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-soul-gold px-2 py-0.5 text-[11px] font-medium text-white">
                      <Star className="w-3 h-3" />
                      Founder
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex flex-col justify-between p-3 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => handleDelete(member)}
                      disabled={deletingId === member.id}
                      className="self-end text-white hover:text-red-300 shrink-0"
                      title="Remove"
                    >
                      {deletingId === member.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="p-3 bg-white">
                    <p className="font-semibold text-soul-green-dark text-sm truncate">
                      {member.name}
                    </p>
                    <p className="text-xs text-soul-brown truncate">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl max-w-2xl w-full p-6 my-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-soul-green-dark">Add Team Member</h2>
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    resetForm()
                  }}
                  className="p-2 hover:bg-soul-cream rounded-full transition-colors"
                >
                  <X size={20} className="text-soul-brown" />
                </button>
              </div>

              <label className="block border-2 border-dashed border-soul-green/30 rounded-xl p-8 text-center hover:border-soul-green transition-colors cursor-pointer">
                <Upload size={40} className="mx-auto text-soul-green/50 mb-3" />
                <p className="text-soul-brown font-medium">
                  {photoFile ? photoFile.name : 'Click to upload a photo'}
                </p>
                <p className="text-soul-brown/40 text-xs mt-2">JPG, PNG up to 10MB</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) setPhotoFile(file)
                  }}
                />
              </label>

              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-soul-green-dark mb-2">
                      Name
                    </label>
                    <Input
                      placeholder="Full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border-soul-green/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-soul-green-dark mb-2">
                      Role
                    </label>
                    <Input
                      placeholder="e.g. Counselling Psychologist"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="border-soul-green/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-soul-green-dark mb-2">
                    Bio
                  </label>
                  <textarea
                    placeholder="Short bio shown on the Team page"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-soul-green/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-soul-green/30 text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-soul-green-dark mb-2">
                      Phone (optional)
                    </label>
                    <Input
                      placeholder="+254..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="border-soul-green/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-soul-green-dark mb-2">
                      Email (optional)
                    </label>
                    <Input
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-soul-green/20"
                    />
                  </div>
                </div>
                <label className="flex items-center gap-2 text-sm text-soul-brown">
                  <input
                    type="checkbox"
                    checked={isFounder}
                    onChange={(e) => setIsFounder(e.target.checked)}
                    className="rounded border-soul-green/30"
                  />
                  This person is the Founder &amp; Director
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddModal(false)
                    resetForm()
                  }}
                  className="border-soul-green/20 text-soul-brown"
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-soul-green hover:bg-soul-green-dark text-white"
                  onClick={handleAdd}
                  disabled={saving}
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Add Member'}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
