"use client"

import React, { useState, KeyboardEvent } from 'react'
import Link from 'next/link'
import * as Popover from '@radix-ui/react-popover'
import { Cross2Icon } from '@radix-ui/react-icons'

type Template = {
  id: number
  subject: string
  message: string
  followUp: string
}

const audienceOptions = [
  { value: 'hr', label: 'HR' },
  { value: 'company', label: 'Company' },
  { value: 'employee', label: 'Employee' },
]

export default function CreateCampaignScreen() {
  const [campaignName, setCampaignName] = useState('')
  const [targetAudience, setTargetAudience] = useState<string[]>([])
  const [targetRole, setTargetRole] = useState('')
  const [targetLocation, setTargetLocation] = useState('')
  const [skillInput, setSkillInput] = useState('')
  const [skills, setSkills] = useState<string[]>([])

  const [templates, setTemplates] = useState<Template[]>([
    { id: 1, subject: '', message: '', followUp: '' },
  ])

  function toggleAudience(val: string) {
    setTargetAudience((prev) => (prev.includes(val) ? prev.filter((p) => p !== val) : [...prev, val]))
  }

  function onSkillKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault()
      if (!skills.includes(skillInput.trim())) {
        setSkills((s) => [...s, skillInput.trim()])
      }
      setSkillInput('')
    }
  }

  function removeSkill(skill: string) {
    setSkills((s) => s.filter((x) => x !== skill))
  }

  function addTemplate() {
    if (templates.length >= 3) return
    const id = templates.length + 1
    setTemplates((t) => [...t, { id, subject: '', message: '', followUp: '' }])
  }

  function removeTemplate(id: number) {
    // Keep at least one template
    if (templates.length <= 1) return
    setTemplates((t) => t.filter((tpl) => tpl.id !== id))
  }

  const [confirmOpenId, setConfirmOpenId] = useState<number | null>(null)

  function updateTemplate(id: number, field: keyof Template, value: string) {
    setTemplates((t) => t.map((tpl) => (tpl.id === id ? { ...tpl, [field]: value } : tpl)))
  }

  function submitForm(e: React.FormEvent) {
    e.preventDefault()
    // For now just log the form data. Later hook to inMemory store or API.
    const payload = { campaignName, targetAudience, targetRole, targetLocation, skills, templates }
    console.log('Create campaign payload:', payload)
    alert('Campaign saved (stub). Check console for payload.')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Create Campaign</h1>
          <p className="text-sm text-slate-500 mt-1">Build your outreach campaign and add up to 3 email templates.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/campaigns" className="text-sm text-slate-600 hover:underline">
            Back
          </Link>
        </div>
      </div>

      <form onSubmit={submitForm} className="grid grid-cols-1 gap-6">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-slate-900 mb-4">Filters</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Campaign Name *</label>
              <input
                required
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="e.g., Frontend Developer Outreach"
                className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#ff1e00]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Target Audience *</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {audienceOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleAudience(opt.value)}
                    className={`px-3 py-1 text-sm rounded-full border ${
                      targetAudience.includes(opt.value)
                        ? 'bg-[#ffefec] border-[#ffb4a6] text-[#ff1e00]'
                        : 'bg-white border-gray-200 text-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Target Role</label>
              <input
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g., Frontend Developer"
                className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#ff1e00]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Target Location</label>
              <input
                value={targetLocation}
                onChange={(e) => setTargetLocation(e.target.value)}
                placeholder="e.g., Bangalore, Remote"
                className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#ff1e00]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">Target Skills</label>
              <div className="mt-1">
                <input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={onSkillKeyDown}
                  placeholder="Type a skill and press Enter"
                  className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#ff1e00]"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span key={s} className="inline-flex items-center gap-2 rounded-full bg-[#fff5f5] px-3 py-1 text-sm text-[#ff4d2e]">
                      {s}
                      <button type="button" onClick={() => removeSkill(s)} className="ml-1 text-xs">×</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-slate-900">Templates</h2>
            <div className="text-sm text-slate-500">Add up to 3 templates</div>
          </div>

          <div className="mt-4 space-y-4">
            {templates.map((tpl, idx) => (
              <div key={tpl.id} className="rounded-md border border-gray-100 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-800">Template {idx + 1}</div>
                  <div className="flex items-center gap-3">
                    {templates.length > 1 && (
                      <Popover.Root open={confirmOpenId === tpl.id} onOpenChange={(open) => setConfirmOpenId(open ? tpl.id : null)}>
                        <Popover.Trigger asChild>
                          <button
                            type="button"
                            aria-label={`Remove template ${idx + 1}`}
                            className="text-slate-600 hover:text-red-600 p-1 rounded"
                          >
                            <Cross2Icon />
                          </button>
                        </Popover.Trigger>

                        <Popover.Portal>
                          <Popover.Content side="right" align="center" className="z-50 w-56 rounded-md border border-gray-200 bg-white p-3 shadow-sm">
                            <div className="text-sm text-slate-800 font-medium">Remove template?</div>
                            <div className="text-xs text-slate-500 mt-1">Are you sure you want to remove this template?</div>
                            <div className="mt-3 flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setConfirmOpenId(null)}
                                className="rounded-md border border-gray-200 px-3 py-1 text-sm text-slate-700 hover:bg-gray-50"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() => { removeTemplate(tpl.id); setConfirmOpenId(null) }}
                                className="rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                              >
                                Remove
                              </button>
                            </div>
                          </Popover.Content>
                        </Popover.Portal>
                      </Popover.Root>
                    )}
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Subject</label>
                    <input
                      value={tpl.subject}
                      onChange={(e) => updateTemplate(tpl.id, 'subject', e.target.value)}
                      placeholder="Subject line"
                      className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#ff1e00]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">Message</label>
                    <textarea
                      value={tpl.message}
                      onChange={(e) => updateTemplate(tpl.id, 'message', e.target.value)}
                      placeholder="Write your outreach message here"
                      rows={6}
                      className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#ff1e00]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">Follow-up message (optional)</label>
                    <textarea
                      value={tpl.followUp}
                      onChange={(e) => updateTemplate(tpl.id, 'followUp', e.target.value)}
                      placeholder="Optional follow-up message"
                      rows={3}
                      className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#ff1e00]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3">
            {templates.length < 3 && (
              <button type="button" onClick={addTemplate} className="inline-flex items-center rounded-md bg-[#ff1e00] px-4 py-2 text-white shadow hover:bg-[#e21700] text-sm">
                + Add Template
              </button>
            )}
            <div className="text-sm text-slate-500">{templates.length} / 3</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="inline-flex items-center rounded-md bg-[#ff1e00] px-5 py-2 text-white shadow hover:bg-[#e21700]">
            Create Campaign
          </button>
          <Link href="/dashboard/campaigns" className="text-sm text-slate-600 hover:underline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
