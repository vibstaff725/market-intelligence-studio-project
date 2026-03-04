"""Script to write all Stitch-faithful React components."""
import os

SRC = os.path.join(os.path.dirname(__file__), 'src')
COMP = os.path.join(SRC, 'components')

# ── Sidebar ──────────────────────────────────────────────────────────────────
SIDEBAR = r"""const NAV = [
  { id: 'dashboard', icon: 'account_tree',   label: 'Pipeline'  },
  { id: 'templates', icon: 'description',    label: 'Templates' },
  { id: 'knowledge', icon: 'manage_search',  label: 'Knowledge' },
  { id: 'calendar',  icon: 'calendar_month', label: 'Calendar'  },
]

const MODULES = [
  { label: 'Data-CoT',    color: '#10B981' },
  { label: 'Concept-CoT', color: '#F59E0B' },
  { label: 'Thesis-CoT',  color: '#60A5FA' },
  { label: 'Compliance',  color: '#A78BFA' },
]

const S = {
  aside:  { width: 200, minWidth: 200, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: 24, paddingBottom: 24, background: 'var(--color-bg-base)', borderRight: '1px solid var(--color-border-dark)' },
  top:    { display: 'flex', flexDirection: 'column', gap: 28 },
  logo:   { display: 'flex', alignItems: 'center', gap: 10, padding: '0 20px' },
  kBox:   { width: 32, height: 32, borderRadius: 6, background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-syne)', fontWeight: 700, color: '#fff', fontSize: 18 },
  kLabel: { fontFamily: 'var(--font-syne)', fontSize: 20, fontWeight: 700, color: 'var(--color-text-1)', letterSpacing: '-0.5px' },
  nav:    { display: 'flex', flexDirection: 'column' },
  mods:   { padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 8 },
  modHdr: { fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-4)', marginBottom: 4 },
  modRow: { display: 'flex', alignItems: 'center', gap: 8 },
  modTxt: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-3)' },
  bot:    { padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 16 },
  newBtn: { width: '100%', padding: '8px 0', background: 'var(--color-primary)', border: 'none', borderRadius: 4, color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer' },
  avatar: { display: 'flex', alignItems: 'center', gap: 10 },
  avCir:  { width: 28, height: 28, borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' },
}

export default function Sidebar({ page, onNavigate }) {
  return (
    <aside style={S.aside}>
      <div style={S.top}>
        <div style={S.logo}>
          <div style={S.kBox}>K</div>
          <span style={S.kLabel}>KAFI</span>
        </div>
        <nav style={S.nav}>
          {NAV.map(({ id, icon, label }) => {
            const active = page === id
            return (
              <button key={id} onClick={() => onNavigate(id)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px', fontSize: 13, fontFamily: 'var(--font-sans)', fontWeight: 500, border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 150ms ease', width: '100%', borderLeft: active ? '2px solid var(--color-primary)' : '2px solid transparent', background: active ? 'rgba(249,115,22,0.08)' : 'transparent', color: active ? 'var(--color-primary)' : 'var(--color-text-2)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, lineHeight: 1 }}>{icon}</span>
                {label}
              </button>
            )
          })}
        </nav>
        <div style={S.mods}>
          <p style={S.modHdr}>AI MODULES</p>
          {MODULES.map(({ label, color }) => (
            <div key={label} style={S.modRow}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
              <span style={S.modTxt}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={S.bot}>
        <button style={S.newBtn}>+ NEW REPORT</button>
        <div style={S.avatar}>
          <div style={S.avCir}>LN</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--color-text-1)' }}>Hai Tran</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)' }}>Macro Analyst</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
"""

# ── Dashboard ─────────────────────────────────────────────────────────────────
DASHBOARD = r"""import { useState } from 'react'

const TICKER = [
  { label: 'VN-INDEX', value: '1,287.4', change: '+0.83%', up: true },
  { label: 'USD/VND',  value: '25,642',  change: '+0.12%', up: true },
  { label: 'HNX30',    value: '198.6',   change: '-0.21%', up: false },
  { label: 'VN CPI',   value: '+4.9%',   change: 'est 4.5%', up: false },
  { label: 'SBV RATE', value: '4.50%',   change: 'Hold', up: null },
  { label: 'US10Y',    value: '4.41%',   change: '-3bps', up: false },
  { label: 'FED RATE', value: '4.25–4.50%', change: 'Unch', up: null },
  { label: 'WTI',      value: '$71.2',   change: '+1.1%', up: true },
  { label: 'GOLD',     value: '$2,941',  change: '+0.4%', up: true },
  { label: 'VNIBOR 3M',value: '4.82%',  change: '-2bps', up: false },
]

const PIPELINE = [
  { id: 'RPT-031', title: 'VN Macro Monthly Outlook — March 2026', type: 'Macro Monthly',   analyst: 'Hai Tran', status: 'ai-draft',      priority: 'high',   progress: 62,  due: 'Feb 28', updated: '08:43' },
  { id: 'RPT-030', title: 'Flash Note: CPI Feb 2026',             type: 'Flash Note',       analyst: 'Hai Tran', status: 'data-assembly', priority: 'urgent', progress: 18,  due: 'Today',  updated: '07:12' },
  { id: 'RPT-029', title: 'Vietnam Strategy Q1 2026',             type: 'Strategy',         analyst: 'M. Tran',   status: 'compliance',    priority: 'high',   progress: 91,  due: 'Feb 27', updated: 'Yesterday' },
  { id: 'RPT-028', title: 'ASEAN Rate Cycle: Divergence Thesis',  type: 'Macro Thematic',   analyst: 'Hai Tran', status: 'published',     priority: 'normal', progress: 100, due: '—',      updated: 'Feb 24' },
  { id: 'RPT-027', title: 'Banking Sector: SBV Rate Cut Impact',  type: 'Sector',           analyst: 'A. Pham',   status: 'queued',        priority: 'normal', progress: 0,   due: 'Mar 3',  updated: 'Feb 23' },
  { id: 'RPT-026', title: 'USD/VND Outlook: Fed Pivot & Flows',   type: 'Flash Note',       analyst: 'M. Tran',   status: 'published',     priority: 'normal', progress: 100, due: '—',      updated: 'Feb 22' },
]

const STATUS = {
  'ai-draft':      { label: 'AI DRAFT',    color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
  'data-assembly': { label: 'DATA ASSM.',  color: '#F97316', bg: 'rgba(249,115,22,0.15)' },
  'compliance':    { label: 'COMPLIANCE',  color: '#60A5FA', bg: 'rgba(96,165,250,0.15)' },
  'published':     { label: 'PUBLISHED',   color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
  'queued':        { label: 'QUEUED',      color: '#3E5B72', bg: 'rgba(62,91,114,0.15)'  },
}

const BAR_COLOR = { 'ai-draft': '#F59E0B', 'data-assembly': '#F97316', 'compliance': '#60A5FA', 'published': '#10B981', 'queued': '#1A2C3E' }

const COT_STAGES = [
  { key: 'data',      label: 'Data-CoT',    desc: 'Cross-referenced 124 tickers via Bloomberg API.',         state: 'done' },
  { key: 'concept',   label: 'Concept-CoT', desc: 'Mapping tech cyclical patterns vs VN macro headwinds.',   state: 'done' },
  { key: 'thesis',    label: 'Thesis-CoT',  desc: 'Synthesizing final investment rating recommendation.',    state: 'active' },
  { key: 'comp',      label: 'Compliance',  desc: 'Automated regulatory and disclosure audit.',              state: 'pending' },
]

const ACTIVITY = [
  { time: '09:14', icon: 'smart_toy',    color: '#F59E0B', text: 'AI draft ready for review',             id: 'RPT-031' },
  { time: '08:43', icon: 'database',     color: '#38BDF8', text: 'Bloomberg: CPI data ingested (12 ser.)',id: 'RPT-030' },
  { time: '08:21', icon: 'verified_user',color: '#10B981', text: 'Compliance cleared — 0 flags',          id: 'RPT-029' },
  { time: 'Yest.', icon: 'upload',       color: '#10B981', text: 'Published to distribution list (43)',    id: 'RPT-028' },
  { time: 'Yest.', icon: 'smart_toy',    color: '#F59E0B', text: 'FinRobot CoT: 3/3 agents complete',     id: 'RPT-029' },
  { time: 'Feb 24',icon: 'database',     color: '#38BDF8', text: 'FiinPro: Banking sector data synced',   id: 'RPT-027' },
]

const STATS = [
  { label: 'Active Reports',  value: '6',     sub: '2 urgent',          color: '#F97316' },
  { label: 'Avg Draft Time',  value: '1.8h',  sub: '↓ 74% vs baseline', color: '#10B981' },
  { label: 'Compliance Rate', value: '94%',   sub: '1st-pass clearance',color: '#60A5FA' },
  { label: 'Published Feb',   value: '12',    sub: '↑ 3 vs Jan',        color: '#F59E0B' },
]

export default function Dashboard() {
  const [selected, setSelected] = useState('RPT-031')
  const sel = PIPELINE.find(r => r.id === selected)

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, background: 'var(--color-bg-base)', height: '100%', overflow: 'hidden' }}>

      {/* Ticker */}
      <div style={{ height: 32, background: '#000', borderBottom: '1px solid var(--color-border-dark)', display: 'flex', alignItems: 'center', overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ overflow: 'hidden', display: 'flex', flex: 1 }}>
          <div className="animate-marquee" style={{ alignItems: 'center', gap: '2.5rem' }}>
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <span style={{ color: 'var(--color-text-3)' }}>{t.label}</span>
                <span style={{ color: t.up === true ? '#10B981' : t.up === false ? '#EF4444' : 'var(--color-text-2)', fontWeight: 500 }}>{t.value}</span>
                <span style={{ color: t.up === true ? '#10B981' : t.up === false ? '#EF4444' : 'var(--color-text-3)', fontSize: 9 }}>{t.change}</span>
                <span style={{ color: 'var(--color-border-dark)', marginLeft: 8, fontSize: 12 }}>|</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderBottom: '1px solid var(--color-border-dark)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 20, fontWeight: 700, color: 'var(--color-text-1)', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>Research Pipeline</h1>
          <span style={{ background: 'rgba(249,115,22,0.2)', color: 'var(--color-primary)', padding: '2px 8px', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700 }}>6 ACTIVE</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-3)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block' }}/>SYSTEM ONLINE</span>
          <span>WED 26 FEB 2026 · 09:14 ICT</span>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, padding: '20px 24px 0' }}>
          {STATS.map(({ label, value, sub, color }) => (
            <div key={label} style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border-dark)', borderLeft: `3px solid ${color}`, padding: '14px 16px', borderRadius: 4 }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-3)', marginBottom: 6 }}>{label}</p>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-syne)', fontSize: 24, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{value}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color }} >{sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Content split */}
        <div style={{ display: 'flex', gap: 0, padding: '16px 24px', flex: 1, minHeight: 0, height: 460 }}>

          {/* Pipeline table */}
          <div style={{ flex: '0 0 65%', display: 'flex', flexDirection: 'column', border: '1px solid var(--color-border-dark)', background: 'var(--color-bg-card)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--color-border-dark)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-bg-surface)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-text-3)' }}>Master Pipeline Feed</span>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--color-text-3)', cursor: 'pointer' }}>filter_list</span>
            </div>
            <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
                <thead>
                  <tr style={{ background: 'var(--color-bg-surface)', position: 'sticky', top: 0 }}>
                    {['ID','TITLE','STATUS','ANALYST','PROGRESS','DUE'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', fontWeight: 400, fontSize: 9, letterSpacing: '0.08em', color: 'var(--color-text-3)', textAlign: 'left', borderBottom: '1px solid var(--color-border-dark)', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PIPELINE.map(r => {
                    const st = STATUS[r.status]
                    const isSelected = r.id === selected
                    return (
                      <tr key={r.id} onClick={() => setSelected(r.id)} style={{ cursor: 'pointer', borderLeft: isSelected ? '2px solid var(--color-primary)' : '2px solid transparent', background: isSelected ? 'rgba(249,115,22,0.06)' : 'transparent', borderBottom: '1px solid rgba(26,44,62,0.5)', transition: 'background 150ms' }}>
                        <td style={{ padding: '12px 14px', color: '#F59E0B', whiteSpace: 'nowrap' }}>{r.id}</td>
                        <td style={{ padding: '12px 14px', maxWidth: 220 }}>
                          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--color-text-1)' }}>{r.title}</div>
                          <div style={{ fontSize: 9, color: 'var(--color-text-3)', marginTop: 2 }}>{r.type}</div>
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          <span style={{ background: st.bg, color: st.color, border: `1px solid ${st.color}40`, padding: '2px 6px', borderRadius: 3, fontSize: 9, whiteSpace: 'nowrap' }}>
                            {r.priority === 'urgent' && <span style={{ color: '#EF4444', marginRight: 4 }}>!!!</span>}
                            {st.label}
                          </span>
                        </td>
                        <td style={{ padding: '12px 14px', color: 'var(--color-text-2)', whiteSpace: 'nowrap' }}>{r.analyst}</td>
                        <td style={{ padding: '12px 14px' }}>
                          <div style={{ width: 80, height: 3, background: 'var(--color-border-dark)', borderRadius: 2, overflow: 'hidden' }}>
                            <div style={{ width: `${r.progress}%`, height: '100%', background: BAR_COLOR[r.status], transition: 'width 0.5s ease' }} />
                          </div>
                          <span style={{ fontSize: 9, color: 'var(--color-text-3)', marginTop: 2, display: 'block' }}>{r.progress}%</span>
                        </td>
                        <td style={{ padding: '12px 14px', color: 'var(--color-text-2)', whiteSpace: 'nowrap' }}>{r.due}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detail panel */}
          <div style={{ flex: '0 0 35%', display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--color-border-dark)', borderRight: '1px solid var(--color-border-dark)', borderBottom: '1px solid var(--color-border-dark)', background: 'var(--color-bg-card)', padding: 20, overflow: 'hidden' }}>
            {sel && <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#F59E0B', marginBottom: 4 }}>{sel.id}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-1)', lineHeight: 1.35, maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{sel.title}</div>
                  <div style={{ fontSize: 10, color: 'var(--color-text-3)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>Analyst: {sel.analyst}</div>
                </div>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-text-3)', cursor: 'pointer' }}>open_in_full</span>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: 16 }}>FinRobot Chain-of-Thought</p>
              <div style={{ position: 'relative', paddingLeft: 24, flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }} className="custom-scrollbar">
                <div style={{ position: 'absolute', left: 7, top: 4, bottom: 4, width: 1, background: 'var(--color-border-dark)' }} />
                {COT_STAGES.map(({ key, label, desc, state }) => {
                  const dotColor = state === 'done' ? '#10B981' : state === 'active' ? '#F59E0B' : 'var(--color-border-dark)'
                  const textColor = state === 'pending' ? 'var(--color-text-3)' : 'var(--color-text-1)'
                  const stateLabel = state === 'done' ? 'Complete' : state === 'active' ? 'In Progress' : 'Pending'
                  const stateColor = state === 'done' ? '#10B981' : state === 'active' ? '#F59E0B' : 'var(--color-text-4)'
                  return (
                    <div key={key} style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: -24, top: 2, width: 14, height: 14, borderRadius: '50%', background: dotColor, border: '2px solid var(--color-bg-card)', display: 'inline-block', boxShadow: state === 'active' ? `0 0 8px ${dotColor}80` : 'none' }} />
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: textColor, fontWeight: 500 }}>{label}</div>
                      <div style={{ fontSize: 10, color: 'var(--color-text-3)', marginTop: 3 }}>{desc}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: stateColor, textTransform: 'uppercase', marginTop: 4 }}>{stateLabel}</div>
                    </div>
                  )
                })}
              </div>
              <button style={{ marginTop: 16, padding: '8px 0', border: '1px solid var(--color-border-dark)', borderRadius: 3, background: 'transparent', color: 'var(--color-text-2)', fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', width: '100%' }}>VIEW FULL AUDIT LOG</button>
            </>}
          </div>
        </div>

        {/* Activity feed */}
        <div style={{ borderTop: '1px solid var(--color-border-dark)', padding: '12px 24px', background: 'var(--color-bg-surface)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>terminal</span>
              Live System Logs
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-primary)' }}>BUFFER: 82%</span>
          </div>
          <div className="custom-scrollbar" style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
            {ACTIVITY.map((a, i) => (
              <div key={i} style={{ flexShrink: 0, width: 240, background: 'var(--color-bg-card)', border: '1px solid var(--color-border-dark)', padding: '8px 10px', display: 'flex', gap: 10, borderRadius: 3 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: a.color, flexShrink: 0 }}>{a.icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)' }}>{a.time} · <span style={{ color: 'var(--color-primary)' }}>{a.id}</span></div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-1)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
"""

# ── TemplateGallery ───────────────────────────────────────────────────────────
TEMPLATES = r"""import { useState } from 'react'

const TEMPLATES = [
  { id: 'macro',    name: 'Macro Monthly Outlook',    cat: 'Macro',        catColor: '#F97316', uses: 142, avgTime: '2.1h', pages: '8–12', agents: ['Data-CoT','Concept-CoT','Thesis-CoT'], sources: ['Bloomberg Macro','GSO Data','SBV Reports','IMF/WB'], sections: ['Executive Summary','Macro Environment','Key Indicators Dashboard','Policy Outlook','SBV Watch','FX & Capital Flows','Market Implications','Disclosure'] },
  { id: 'flash',    name: 'Flash Note',               cat: 'Event-Driven', catColor: '#F59E0B', uses: 89,  avgTime: '0.8h', pages: '2–4',  agents: ['Data-CoT','Thesis-CoT'], sources: ['Bloomberg Events','FiinPro','News Wire'], sections: ['Event Summary','Immediate Impact Analysis','KAFI View','Revised Outlook','Action Recommendation','Disclosure'] },
  { id: 'strategy', name: 'Vietnam Strategy Report',  cat: 'Strategy',     catColor: '#A78BFA', uses: 31,  avgTime: '6.5h', pages: '20–30',agents: ['Data-CoT','Concept-CoT','Thesis-CoT'], sources: ['Bloomberg','GSO','SBV','IMF/WB','Primary Research'], sections: ['Investment Thesis','Market Summary','Sector Allocation','Risk Factors','Portfolio Implications','Appendix'] },
  { id: 'sector',   name: 'Sector Deep-Dive',         cat: 'Sector',       catColor: '#60A5FA', uses: 57,  avgTime: '3.4h', pages: '12–18',agents: ['Data-CoT','Concept-CoT','Thesis-CoT'], sources: ['FiinPro','Bloomberg Sector','GSO Industry Stats'], sections: ['Sector Overview','Key Players','Financial Analysis','Regulatory Landscape','Outlook','Risks','Disclosure'] },
  { id: 'initiation',name: 'Coverage Initiation',     cat: 'Initiation',   catColor: '#10B981', uses: 19,  avgTime: '8.0h', pages: '25–40',agents: ['Data-CoT','Concept-CoT','Thesis-CoT'], sources: ['Bloomberg','FiinPro','Annual Reports','Management Calls'], sections: ['Investment Summary','Business Model','Financial Model','Valuation','Risks','ESG Assessment','Disclosure'] },
  { id: 'earnings', name: 'Earnings Preview',         cat: 'Earnings',     catColor: '#38BDF8', uses: 73,  avgTime: '1.2h', pages: '4–6',  agents: ['Data-CoT','Thesis-CoT'], sources: ['Bloomberg Earnings','FiinPro Financials'], sections: ['EPS Estimate','Revenue Drivers','Key Metrics','Historical Comparison','Guidance','Market Reaction'] },
]

const CATS = ['ALL', 'Macro', 'Event-Driven', 'Strategy', 'Sector', 'Initiation', 'Earnings']

export default function TemplateGallery() {
  const [selected, setSelected] = useState('macro')
  const [filter, setFilter] = useState('ALL')
  const sel = TEMPLATES.find(t => t.id === selected)

  const filtered = filter === 'ALL' ? TEMPLATES : TEMPLATES.filter(t => t.cat === filter)

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, background: 'var(--color-bg-base)', height: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderBottom: '1px solid var(--color-border-dark)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 20, fontWeight: 700, color: 'var(--color-text-1)', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>Template Library</h1>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-3)' }}>{TEMPLATES.length} TEMPLATES</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-card)', border: '1px solid var(--color-border-dark)', borderRadius: 4, padding: '4px 10px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-text-3)' }}>search</span>
          <input placeholder="FILTER TEMPLATES" style={{ background: 'transparent', border: 'none', outline: 'none', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-1)', width: 160 }} />
        </div>
      </div>

      {/* Category pills */}
      <div style={{ display: 'flex', gap: 6, padding: '10px 24px', borderBottom: '1px solid var(--color-border-dark)', flexShrink: 0 }}>
        {CATS.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{ padding: '4px 12px', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', cursor: 'pointer', border: filter === c ? '1px solid var(--color-primary)' : '1px solid var(--color-border-dark)', background: filter === c ? 'rgba(249,115,22,0.1)' : 'transparent', color: filter === c ? 'var(--color-primary)' : 'var(--color-text-3)', transition: 'all 150ms' }}>{c}</button>
        ))}
      </div>

      {/* Content split */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Grid */}
        <div className="custom-scrollbar" style={{ flex: '0 0 58%', overflowY: 'auto', padding: 24, display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, alignContent: 'start' }}>
          {filtered.map(t => (
            <div key={t.id} onClick={() => setSelected(t.id)} style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border-dark)', borderLeft: selected === t.id ? `2px solid var(--color-primary)` : '2px solid transparent', borderRadius: 4, padding: 16, cursor: 'pointer', transition: 'all 150ms', background: selected === t.id ? 'rgba(249,115,22,0.04)' : 'var(--color-bg-card)' }}>
              <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, marginBottom: 10, background: `${t.catColor}20`, color: t.catColor, border: `1px solid ${t.catColor}40` }}>{t.cat}</span>
              <div style={{ fontFamily: 'var(--font-syne)', fontSize: 14, fontWeight: 700, color: 'var(--color-text-1)', marginBottom: 12, lineHeight: 1.3 }}>{t.name}</div>
              <div style={{ display: 'flex', gap: 12, fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)' }}>
                <span>↺ {t.uses} uses</span>
                <span>⏱ {t.avgTime}</span>
                <span>⊞ {t.pages}p</span>
              </div>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {sel && (
          <div className="custom-scrollbar" style={{ flex: '0 0 42%', borderLeft: '1px solid var(--color-border-dark)', background: 'var(--color-bg-card)', overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, marginBottom: 8, background: `${sel.catColor}20`, color: sel.catColor, border: `1px solid ${sel.catColor}40` }}>{sel.cat}</span>
                  <div style={{ fontFamily: 'var(--font-syne)', fontSize: 18, fontWeight: 700, color: 'var(--color-text-1)', lineHeight: 1.2 }}>{sel.name}</div>
                </div>
              </div>
              <button style={{ width: '100%', padding: '10px 0', background: 'var(--color-primary)', border: 'none', borderRadius: 4, color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>USE THIS TEMPLATE →</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, borderTop: '1px solid var(--color-border-dark)', paddingTop: 16 }}>
              {[['Uses', sel.uses], ['Avg Time', sel.avgTime], ['Pages', sel.pages]].map(([l, v]) => (
                <div key={l} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-syne)', fontSize: 20, fontWeight: 700, color: 'var(--color-text-1)' }}>{v}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)', textTransform: 'uppercase', marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--color-border-dark)', paddingTop: 16 }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', marginBottom: 10 }}>SECTIONS</p>
              <ol style={{ paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: 4, listStyle: 'none' }}>
                {sel.sections.map((s, i) => (
                  <li key={s} style={{ display: 'flex', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-2)' }}>
                    <span style={{ color: 'var(--color-text-4)', minWidth: 16 }}>{String(i+1).padStart(2,'0')}.</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border-dark)', paddingTop: 16 }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', marginBottom: 10 }}>AI AGENTS</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {sel.agents.map(a => <span key={a} style={{ padding: '3px 10px', border: '1px solid rgba(16,185,129,0.4)', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 10, color: '#10B981', background: 'rgba(16,185,129,0.08)' }}>{a}</span>)}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border-dark)', paddingTop: 16 }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', marginBottom: 10 }}>DATA SOURCES</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {sel.sources.map(s => <span key={s} style={{ padding: '3px 10px', border: '1px solid rgba(56,189,248,0.4)', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 10, color: '#38BDF8', background: 'rgba(56,189,248,0.08)' }}>{s}</span>)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
"""

# ── KnowledgeBase ─────────────────────────────────────────────────────────────
KNOWLEDGE = r"""import { useState } from 'react'

const REPORTS = [
  { id: 1, title: 'VN Macro Monthly Outlook — February 2026', analyst: 'Linh Nguyen', date: 'Feb 23, 2026', type: 'Macro Monthly', typeColor: '#F97316', excerpt: 'The USD/VND spot rate ended February at 25,642 — within our projected range of 25,500–25,800. Strong remittance inflows offset foreign portfolio outflows triggered by renewed Fed hawkishness. We maintain our full-year 2026 forecast of 25,400–26,000.', tags: ['USD/VND','FX','SBV','Remittances'], citations: ['Bloomberg: USD/VND spot, 23-Feb-2026','SBV: Monthly FX Operations Report Jan 2026','GSO: Macro Indicators Release Feb 2026'] },
  { id: 2, title: 'Flash Note: January CPI — Inflation Acceleration', analyst: 'Linh Nguyen', date: 'Feb 3, 2026', type: 'Flash Note', typeColor: '#F59E0B', excerpt: 'January CPI came in at +4.9% YoY, above our estimate of 4.5%. The upside surprise was driven by food prices (+7.1% YoY) reflecting Lunar New Year demand effects. Core CPI excluding food and energy remains contained at +3.2%.', tags: ['CPI','Inflation','SBV','Food Prices'], citations: ['GSO: CPI Release, 3 Feb 2026','Bloomberg: VN CPI Survey Consensus','SBV: Monetary Policy Statement Jan 2026'] },
  { id: 3, title: 'ASEAN Rate Cycle: When Does Vietnam Diverge?', analyst: 'Linh Nguyen', date: 'Jan 28, 2026', type: 'Macro Thematic', typeColor: '#A78BFA', excerpt: 'Vietnam remains an outlier in the ASEAN rate cycle. While Thailand and Indonesia move toward easing, the SBV holds at 4.50% citing inflation and FX stability concerns. We assess divergence probability at 60% for H2 2026.', tags: ['SBV','ASEAN','Rate Cycle','Divergence'], citations: ['SBV: Rate Decision Statement Jan 2026','Bloomberg: ASEAN Central Bank Tracker','IMF Article IV Vietnam 2025'] },
  { id: 4, title: 'Banking Sector: SBV Rate Cut Implications', analyst: 'Anh Pham', date: 'Jan 15, 2026', type: 'Sector', typeColor: '#60A5FA', excerpt: 'Our analysis indicates a 25bps SBV rate cut would compress NIM by 8–12bps across covered banks, with VCB and CTG best positioned to absorb the impact given their CASA advantage. Overall sector outlook remains cautiously positive.', tags: ['Banking','NIM','VCB','CTG'], citations: ['FiinPro: Banking System Stats Q4 2025','VCB Annual Report 2025','SBV Banking Supervision Report'] },
  { id: 5, title: 'USD/VND Outlook: Fed Pivot & Capital Flows', analyst: 'Minh Tran', date: 'Jan 8, 2026', type: 'Flash Note', typeColor: '#F59E0B', excerpt: 'Our revised USD/VND forecast of 25,400–26,000 for 2026 factors in three scenarios: Fed pivot (base case 55%), Fed hold (bear case 30%), and accelerated easing (bull case 15%). Portfolio flow repatriation remains the swing factor.', tags: ['USD/VND','Fed','Capital Flows','FX Strategy'], citations: ['Bloomberg: FX Forecast Survey Jan 2026','CMSC: Foreign Portfolio Data Dec 2025','SBV: FX Intervention Report'] },
]

const FILTERS = ['ALL','Macro','Flash','Strategy','Sector']

export default function KnowledgeBase() {
  const [query, setQuery] = useState('SBV')
  const [filter, setFilter] = useState('ALL')
  const [selected, setSelected] = useState(1)
  const sel = REPORTS.find(r => r.id === selected)

  const results = REPORTS.filter(r => {
    const matchType = filter === 'ALL' || r.type.toLowerCase().includes(filter.toLowerCase())
    const matchQ = !query || r.title.toLowerCase().includes(query.toLowerCase()) || r.excerpt.toLowerCase().includes(query.toLowerCase()) || r.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
    return matchType && matchQ
  })

  const highlight = (text) => {
    if (!query) return text
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return parts.map((p, i) => p.toLowerCase() === query.toLowerCase() ? <mark key={i} style={{ background: 'rgba(245,158,11,0.25)', color: '#F59E0B', borderRadius: 2, padding: '0 2px' }}>{p}</mark> : p)
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, background: 'var(--color-bg-base)', height: '100%', overflow: 'hidden' }}>
      {/* Archive stats bar */}
      <div style={{ height: 28, background: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-dark)', display: 'flex', alignItems: 'center', padding: '0 24px', flexShrink: 0 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-3)' }}>
          ARCHIVE: 847 REPORTS &nbsp;·&nbsp; 2,341 UNIQUE CITATIONS &nbsp;·&nbsp; LAST INDEXED: 08:41 TODAY
        </span>
      </div>

      {/* Search */}
      <div style={{ padding: '16px 24px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--color-bg-card)', border: '1px solid var(--color-primary)', borderRadius: 4, padding: '8px 14px', marginBottom: 10 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-primary)' }}>search</span>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="SEARCH KAFI RESEARCH ARCHIVE..." style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-text-1)' }} />
          {query && <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-3)', fontSize: 18 }}>×</button>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)', textTransform: 'uppercase' }}>TYPE:</span>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '3px 10px', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 600, textTransform: 'uppercase', cursor: 'pointer', border: filter === f ? '1px solid var(--color-primary)' : '1px solid var(--color-border-dark)', background: filter === f ? 'rgba(249,115,22,0.1)' : 'transparent', color: filter === f ? 'var(--color-primary)' : 'var(--color-text-3)', transition: 'all 150ms' }}>{f}</button>
          ))}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)', marginLeft: 8 }}>SHOWING {results.length} RESULTS{query ? ` FOR "${query.toUpperCase()}"` : ''}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Results */}
        <div className="custom-scrollbar" style={{ flex: '0 0 55%', overflowY: 'auto', padding: '0 0 16px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {results.map(r => (
            <div key={r.id} onClick={() => setSelected(r.id)} style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border-dark)', borderLeft: selected === r.id ? '2px solid var(--color-primary)' : '2px solid transparent', borderRadius: 4, padding: 14, cursor: 'pointer', transition: 'all 150ms', marginRight: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-1)', flex: 1, marginRight: 8 }}>{highlight(r.title)}</div>
                <span style={{ background: `${r.typeColor}20`, color: r.typeColor, border: `1px solid ${r.typeColor}40`, padding: '2px 6px', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 9, whiteSpace: 'nowrap' }}>{r.type}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)', marginBottom: 6 }}>{r.analyst} · {r.date}</div>
              <div style={{ fontSize: 11, color: 'var(--color-text-2)', lineHeight: 1.6, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{highlight(r.excerpt)}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
                {r.tags.map(t => <span key={t} style={{ padding: '1px 6px', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border-dark)', borderRadius: 2, fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)' }}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>

        {/* Citation panel */}
        {sel && (
          <div className="custom-scrollbar" style={{ flex: '0 0 45%', borderLeft: '1px solid var(--color-border-dark)', background: 'var(--color-bg-card)', overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-2)' }}>CITATION INTEGRITY</span>
              <span style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)', padding: '2px 8px', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700 }}>✓ VERIFIED</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {sel.citations.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 12px', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border-dark)', borderRadius: 3 }}>
                  <span style={{ color: '#10B981', flexShrink: 0, fontSize: 13 }}>✓</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-1)' }}>{c}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)', marginTop: 2 }}>PRIMARY SOURCE</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', padding: '16px 0', borderTop: '1px solid var(--color-border-dark)', borderBottom: '1px solid var(--color-border-dark)' }}>
              <div style={{ fontFamily: 'var(--font-syne)', fontSize: 40, fontWeight: 800, color: '#10B981', lineHeight: 1 }}>100%</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', color: '#10B981', marginTop: 4 }}>VERIFIED</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)', marginTop: 8, fontStyle: 'italic' }}>All claims AI-verified against primary sources</div>
            </div>

            <button style={{ width: '100%', padding: '10px 0', background: 'transparent', border: '1px solid var(--color-primary)', borderRadius: 4, color: 'var(--color-primary)', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>VIEW FULL REPORT →</button>
          </div>
        )}
      </div>
    </div>
  )
}
"""

# ── Calendar ──────────────────────────────────────────────────────────────────
CALENDAR = r"""import { useState } from 'react'

const DAYS = ['MON','TUE','WED','THU','FRI','SAT','SUN']
const MONTH = 'FEBRUARY 2026'

// Build Feb 2026 grid (Feb 1 = Sunday in 2026, so shifted)
// Feb 2026: 1st is Sunday. We display Mon-Sun grid.
// Week 1: 26Jan(Mon)..1Feb(Sun) — but let's show just Feb days + padding

const EVENTS = {
  '2026-02-23': [{ label: 'Published: RPT-028', color: '#10B981', type: 'pub' }],
  '2026-02-24': [{ label: 'Data Sync: RPT-027', color: '#38BDF8', type: 'data' }],
  '2026-02-25': [{ label: 'AI Draft: RPT-031', color: '#F59E0B', type: 'ai' }],
  '2026-02-26': [
    { label: 'RPT-031 DUE', color: '#F97316', type: 'deadline' },
    { label: 'AI: RPT-030', color: '#F59E0B', type: 'ai' },
  ],
  '2026-02-27': [
    { label: 'COMPLIANCE: RPT-029', color: '#60A5FA', type: 'comp' },
    { label: 'RPT-030 DUE', color: '#F97316', type: 'deadline' },
  ],
  '2026-02-28': [
    { label: 'PUBLISH RPT-029', color: '#10B981', type: 'pub' },
    { label: '+1 more', color: '#3E5B72', type: 'more' },
  ],
  '2026-03-03': [
    { label: 'GSO CPI RELEASE', color: '#38BDF8', type: 'data' },
    { label: 'RPT-032 START', color: '#F97316', type: 'deadline' },
  ],
  '2026-03-05': [{ label: 'AI DRAFT: RPT-032', color: '#F59E0B', type: 'ai' }],
  '2026-03-10': [{ label: 'RPT-032 DUE', color: '#F97316', type: 'deadline' }],
  '2026-03-15': [
    { label: 'STRATEGY DAY', color: '#A78BFA', type: 'internal' },
    { label: '!! BOARD REPORT', color: '#EF4444', type: 'urgent' },
  ],
  '2026-03-19': [{ label: 'FED FOMC', color: '#38BDF8', type: 'data' }],
  '2026-03-20': [
    { label: 'SBV DECISION', color: '#38BDF8', type: 'data' },
    { label: 'RPT-033 DUE', color: '#F97316', type: 'deadline' },
  ],
}

const LEGEND = [
  { label: 'DEADLINE',   color: '#F97316' },
  { label: 'AI TASK',    color: '#F59E0B' },
  { label: 'PUBLISHED',  color: '#10B981' },
  { label: 'COMPLIANCE', color: '#60A5FA' },
  { label: 'URGENT',     color: '#EF4444' },
  { label: 'DATA RELEASE',color: '#38BDF8' },
  { label: 'INTERNAL',   color: '#A78BFA' },
]

const WORKLOAD = [
  { name: 'Hai Tran', reports: 2, pct: 80, color: '#F59E0B' },
  { name: 'M. Tran',   reports: 1, pct: 45, color: '#10B981' },
  { name: 'A. Pham',   reports: 1, pct: 15, color: '#3E5B72' },
]

function buildCalendarDays() {
  // Feb 2026: day 1 = Sunday (day index 6 in Mon-Sun grid)
  // So Mon–Sat before Feb 1 are from January
  const cells = []
  // Padding before Feb 1 (Mon=0 ... Sat=5, Feb 1 is Sun = index 6)
  for (let i = 0; i < 6; i++) {
    cells.push({ date: null, month: 'prev', day: 26 + i })  // Jan 26..31
  }
  for (let d = 1; d <= 28; d++) {
    cells.push({ date: `2026-02-${String(d).padStart(2,'0')}`, month: 'current', day: d })
  }
  // Pad to complete 6 rows (42 cells)
  for (let d = 1; cells.length < 42; d++) {
    cells.push({ date: `2026-03-${String(d).padStart(2,'0')}`, month: 'next', day: d })
  }
  return cells
}

const CELLS = buildCalendarDays()
const TODAY = '2026-02-26'

export default function Calendar() {
  const [view, setView] = useState('MONTH')
  const [selectedDay, setSelectedDay] = useState(TODAY)
  const selEvents = EVENTS[selectedDay] || []

  // Mini-agenda: next 7 days from today
  const minDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(2026, 1, 26 + i)
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
    return { key, label: DAYS[(i + 2) % 7], day: d.getDate() }
  })

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, background: 'var(--color-bg-base)', height: '100%', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderBottom: '1px solid var(--color-border-dark)', flexShrink: 0 }}>
        <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 20, fontWeight: 700, color: 'var(--color-text-1)', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>Editorial Calendar</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-primary)' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-3)', fontSize: 16 }}>‹</button>
            <span style={{ minWidth: 160, textAlign: 'center' }}>{MONTH}</span>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-3)', fontSize: 16 }}>›</button>
          </div>
          <div style={{ display: 'flex', border: '1px solid var(--color-border-dark)', borderRadius: 3, overflow: 'hidden', fontFamily: 'var(--font-mono)', fontSize: 10 }}>
            {['MONTH','WEEK','LIST'].map(v => (
              <button key={v} onClick={() => setView(v)} style={{ padding: '4px 10px', border: 'none', cursor: 'pointer', background: view === v ? 'var(--color-primary)' : 'transparent', color: view === v ? '#fff' : 'var(--color-text-3)', transition: 'all 150ms' }}>{v}</button>
            ))}
          </div>
          <button style={{ padding: '6px 12px', background: 'transparent', border: '1px solid var(--color-primary)', borderRadius: 3, color: 'var(--color-primary)', fontFamily: 'var(--font-mono)', fontSize: 10, cursor: 'pointer' }}>+ NEW REPORT</button>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 24px', borderBottom: '1px solid var(--color-border-dark)', flexShrink: 0, flexWrap: 'wrap' }}>
        {LEGEND.map(({ label, color }) => (
          <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)' }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: color, display: 'inline-block' }} />
            {label}
          </span>
        ))}
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Calendar grid */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Day headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', borderBottom: '1px solid var(--color-border-dark)', flexShrink: 0 }}>
            {DAYS.map(d => (
              <div key={d} style={{ padding: '8px 12px', fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-3)', textAlign: 'center', borderRight: '1px solid var(--color-border-dark)' }}>{d}</div>
            ))}
          </div>
          {/* Cells */}
          <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gridAutoRows: '1fr', alignItems: 'start' }}>
            {CELLS.map((cell, idx) => {
              const isToday = cell.date === TODAY
              const isSelected = cell.date === selectedDay
              const isCurrent = cell.month === 'current'
              const events = cell.date ? (EVENTS[cell.date] || []) : []
              return (
                <div key={idx} onClick={() => cell.date && setSelectedDay(cell.date)} style={{ minHeight: 90, padding: '8px 6px', borderRight: '1px solid var(--color-border-dark)', borderBottom: '1px solid var(--color-border-dark)', background: !isCurrent ? 'var(--color-bg-surface)' : isSelected ? 'rgba(249,115,22,0.05)' : 'var(--color-bg-base)', cursor: cell.date ? 'pointer' : 'default', position: 'relative', transition: 'background 150ms' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 4 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, borderRadius: '50%', background: isToday ? 'var(--color-primary)' : 'transparent', color: isToday ? '#fff' : isCurrent ? 'var(--color-text-2)' : 'var(--color-text-4)' }}>{cell.day}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {events.slice(0, 2).map((e, i) => (
                      <span key={i} style={{ display: 'block', padding: '1px 5px', borderRadius: 2, fontFamily: 'var(--font-mono)', fontSize: 8, color: e.color, background: `${e.color}18`, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.label}</span>
                    ))}
                    {events.length > 2 && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--color-text-3)' }}>+{events.length - 2} more</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Day detail panel */}
        <div style={{ width: 260, borderLeft: '1px solid var(--color-border-dark)', background: 'var(--color-bg-card)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--color-border-dark)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--font-syne)', fontSize: 13, fontWeight: 700, color: 'var(--color-text-1)' }}>
                {selectedDay ? new Date(selectedDay + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase() : '—'}
              </span>
              {selEvents.length > 0 && <span style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B', padding: '1px 6px', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700 }}>{selEvents.length} EVENTS</span>}
            </div>
          </div>
          <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
            {selEvents.length === 0 ? (
              <div style={{ padding: '24px 16px', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-4)', textAlign: 'center' }}>NO EVENTS</div>
            ) : selEvents.map((e, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 16px', borderLeft: `2px solid ${e.color}`, marginLeft: 8, marginBottom: 8, marginRight: 8, background: `${e.color}08`, borderRadius: '0 3px 3px 0' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: e.color, marginTop: 3, flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-1)', fontWeight: 500 }}>{e.label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)', marginTop: 2 }}>EOD · Hai Tran</div>
                </div>
              </div>
            ))}
          </div>

          {/* Workload */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid var(--color-border-dark)' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', marginBottom: 10 }}>ANALYST WORKLOAD</p>
            {WORKLOAD.map(({ name, reports, pct, color }) => (
              <div key={name} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-2)', marginBottom: 4 }}>
                  <span>{name}</span><span style={{ color }}>{reports} report{reports > 1 ? 's' : ''}</span>
                </div>
                <div style={{ height: 3, background: 'var(--color-border-dark)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mini-agenda strip */}
      <div style={{ height: 64, borderTop: '1px solid var(--color-border-dark)', background: 'var(--color-bg-surface)', display: 'flex', alignItems: 'stretch', flexShrink: 0 }}>
        {minDays.map(({ key, label, day }) => {
          const evts = EVENTS[key] || []
          const isToday = key === TODAY
          return (
            <div key={key} onClick={() => setSelectedDay(key)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, borderRight: '1px solid var(--color-border-dark)', cursor: 'pointer', background: isToday ? 'rgba(249,115,22,0.06)' : 'transparent', transition: 'background 150ms' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: isToday ? 'var(--color-primary)' : 'var(--color-text-3)' }}>{label}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: isToday ? 700 : 400, color: isToday ? 'var(--color-primary)' : 'var(--color-text-2)' }}>{day}</span>
              <div style={{ display: 'flex', gap: 2 }}>
                {evts.slice(0,3).map((e, i) => <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: e.color }} />)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
"""

# ── App.jsx ────────────────────────────────────────────────────────────────────
APP = r"""import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import TemplateGallery from './components/TemplateGallery'
import KnowledgeBase from './components/KnowledgeBase'
import Calendar from './components/Calendar'

export default function App() {
  const [page, setPage] = useState('dashboard')
  const views = {
    dashboard: <Dashboard />,
    templates: <TemplateGallery />,
    knowledge: <KnowledgeBase />,
    calendar:  <Calendar />,
  }
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Sidebar page={page} onNavigate={setPage} />
      {views[page] || views.dashboard}
    </div>
  )
}
"""

files = {
    os.path.join(COMP, 'Sidebar.jsx'):       SIDEBAR,
    os.path.join(COMP, 'Dashboard.jsx'):     DASHBOARD,
    os.path.join(COMP, 'TemplateGallery.jsx'): TEMPLATES,
    os.path.join(COMP, 'KnowledgeBase.jsx'): KNOWLEDGE,
    os.path.join(COMP, 'Calendar.jsx'):       CALENDAR,
    os.path.join(SRC,  'App.jsx'):            APP,
}

for path, content in files.items():
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content.lstrip('\n'))
    print(f'Written: {os.path.basename(path)} ({len(content)} chars)')

print('ALL DONE')
