import React from 'react'
import Link from 'next/link'

type Campaign = {
  id: string
  name: string
  target: string
  sent: number
  createdAt: string
}

const sampleCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Frontend Developer Outreach - Q1 2025',
    target: 'Frontend Developer',
    sent: 45,
    createdAt: 'Sep 10, 2025',
  },
  {
    id: '2',
    name: 'Product Manager Referrals',
    target: 'Product Manager',
    sent: 20,
    createdAt: 'Sep 10, 2025',
  },
  {
    id: '3',
    name: 'Design Outreach - Q1 2025',
    target: 'Product Designer',
    sent: 10,
    createdAt: 'Sep 11, 2025',
  },
]

export default function CampaignsScreen() {
  const totalCampaigns = sampleCampaigns.length
  const totalEmailsSent = sampleCampaigns.reduce((s, c) => s + c.sent, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Email Campaigns</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and track all your job outreach campaigns</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/campaigns/create"
            className="inline-flex items-center rounded-md bg-[#ff1e00] px-4 py-2 text-white shadow hover:bg-[#e21700]"
          >
            + New Campaign
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total campaigns</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{totalCampaigns}</p>
            </div>
            <div className="bg-[#fff5f5] rounded-full p-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8L12 13L21 8" stroke="#ff1e00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="2" y="3" width="20" height="14" rx="2" stroke="#ff1e00" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Emails Sent</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{totalEmailsSent}</p>
            </div>
            <div className="bg-[#fffaf4] rounded-full p-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 12h20" stroke="#ff8a65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 7l5 5 5-5" stroke="#ff8a65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Table: campaigns history */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">All Campaigns ({totalCampaigns})</h2>
          <div className="text-sm text-slate-500">{totalCampaigns} total</div>
        </div>

        <div className="overflow-auto">
          <table className="w-full text-left min-w-[640px]">
            <thead>
              <tr className="text-sm text-slate-500 border-b">
                <th className="py-3 px-4">Campaign Name</th>
                <th className="py-3 px-4">Target</th>
                <th className="py-3 px-4">Sent</th>
                <th className="py-3 px-4">Created</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sampleCampaigns.map((c) => (
                <tr key={c.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="font-medium text-slate-900">{c.name}</div>
                    <div className="text-sm text-slate-500 mt-1">{c.target}</div>
                  </td>
                  <td className="py-4 px-4 text-slate-700">{c.target}</td>
                  <td className="py-4 px-4 font-semibold text-slate-900">{c.sent}</td>
                  <td className="py-4 px-4 text-slate-600">{c.createdAt}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-4">
                      <Link href={`/dashboard/campaigns/${c.id}`} className="text-sm text-[#ff1e00] hover:underline">
                        View
                      </Link>
                      <button className="text-sm text-slate-500 hover:text-slate-700">Stats</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
