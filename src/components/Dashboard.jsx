import { useState } from 'react'

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
  {
    id: 'RPT-031', title: 'VN Macro Monthly Outlook — March 2026', type: 'Macro Monthly',
    analyst: 'Hai Tran', status: 'ai-draft', priority: 'high', progress: 40, due: 'Mar 7', updated: '24 Feb',
    cotStages: [
      { key: 'data',    label: 'Data-CoT',    desc: 'Jan 2026 official NSO data ingested (Bloomberg + FiinPro).', state: 'done'    },
      { key: 'nowcast', label: 'Nowcast-CoT', desc: 'Estimating Feb 2026 CPI / IP using high-freq proxies.',      state: 'active'  },
      { key: 'thesis',  label: 'Thesis-CoT',  desc: 'Macro narrative — blocked pending GSO Feb data (Feb 27).',   state: 'pending' },
      { key: 'comp',    label: 'Compliance',   desc: 'Automated regulatory and disclosure audit.',                  state: 'pending' },
    ],
  },
  {
    id: 'RPT-029', title: 'VN Macro Monthly Outlook — February 2026', type: 'Macro Monthly',
    analyst: 'Hai Tran', status: 'published', priority: 'normal', progress: 100, due: '—', updated: 'Feb 8',
    cotStages: [
      { key: 'data',    label: 'Data-CoT',    desc: 'Jan 2026 NSO final data ingested (Bloomberg + FiinPro).',   state: 'done' },
      { key: 'nowcast', label: 'Nowcast-CoT', desc: 'Jan CPI / IP cross-validated against FiinPro series.',       state: 'done' },
      { key: 'thesis',  label: 'Thesis-CoT',  desc: 'Macro narrative drafted and reviewed by Hai Tran.',        state: 'done' },
      { key: 'comp',    label: 'Compliance',   desc: 'Regulatory audit passed — 0 flags. Cleared Feb 7.',         state: 'done' },
    ],
  },
  {
    id: 'RPT-027', title: 'VN Macro Monthly Outlook — January 2026', type: 'Macro Monthly',
    analyst: 'Hai Tran', status: 'published', priority: 'normal', progress: 100, due: '—', updated: 'Jan 9', reportUrl: '/reports/BCVM T1-2026.pdf',
    cotStages: [
      { key: 'data',    label: 'Data-CoT',    desc: 'Dec 2025 NSO final data ingested (Bloomberg + FiinPro).',   state: 'done' },
      { key: 'nowcast', label: 'Nowcast-CoT', desc: 'Dec CPI / IP cross-validated against FiinPro series.',       state: 'done' },
      { key: 'thesis',  label: 'Thesis-CoT',  desc: 'Macro narrative drafted and reviewed by Hai Tran.',        state: 'done' },
      { key: 'comp',    label: 'Compliance',   desc: 'Regulatory audit passed — 0 flags. Cleared Jan 8.',         state: 'done' },
    ],
  },
]

const STATUS = {
  'ai-draft':      { label: 'AI DRAFT',    color: '#F5A623', bg: 'rgba(245,166,35,0.15)'  },
  'data-assembly': { label: 'DATA ASSM.',  color: '#00D47A', bg: 'rgba(0,212,122,0.13)'   },
  'compliance':    { label: 'COMPLIANCE',  color: '#8A8F8A', bg: 'rgba(138,143,138,0.10)' },
  'published':     { label: 'PUBLISHED',   color: '#00D47A', bg: 'rgba(0,212,122,0.13)'   },
  'queued':        { label: 'QUEUED',      color: '#365B42', bg: 'rgba(54,91,66,0.25)'    },
}

const BAR_COLOR = { 'ai-draft': '#F5A623', 'data-assembly': '#00D47A', 'compliance': '#505550', 'published': '#00D47A', 'queued': '#303530' }

const ACTIVITY = [
  { time: '24 Feb', icon: 'smart_toy',     color: '#F5A623',  text: 'AI pre-draft started (Jan data + est.)',  id: 'RPT-031' },
  { time: '24 Feb', icon: 'database',      color: '#00D47A',  text: 'Bloomberg: Jan macro data ingested',      id: 'RPT-031' },
  { time: '24 Feb', icon: 'schedule',      color: '#00D47A',  text: 'Awaiting GSO Feb data release (Feb 27)',  id: 'RPT-031' },
  { time: 'Feb 8',  icon: 'upload',        color: '#00D47A',  text: 'Published to distribution list (38)',     id: 'RPT-029' },
  { time: 'Feb 7',  icon: 'verified_user', color: '#00D47A',  text: 'Compliance cleared — 0 flags',            id: 'RPT-029' },
  { time: 'Jan 9',  icon: 'upload',        color: '#00D47A',  text: 'Jan edition published (36 recipients)',   id: 'RPT-027' },
]

const STATS = [
  { label: 'In-Flight Reports', value: '1',    sub: 'GSO data due Feb 27',   color: '#00D47A' },
  { label: 'Avg Draft Time',    value: '1.8h', sub: '↓ 74% vs baseline',    color: '#00D47A' },
  { label: 'Compliance Rate',   value: '100%', sub: '2 editions cleared',    color: '#00D47A' },
  { label: 'Published',         value: '2',    sub: 'Jan + Feb 2026',        color: '#00D47A' },
]

export default function Dashboard() {
  const [selected, setSelected] = useState('RPT-031')
  const [hoveredRow, setHoveredRow] = useState(null)
  const sel = PIPELINE.find(r => r.id === selected)
  const urgentCount = PIPELINE.filter(r => r.priority === 'urgent').length
  const cotStages = sel?.cotStages || []
  const doneCount = cotStages.filter(s => s.state === 'done').length

  const ACTION = {
    'ai-draft':      { label: 'REVIEW AI DRAFT →',        style: { background: 'var(--color-primary)', color: 'var(--color-bg-base)', border: 'none', fontWeight: 700 } },
    'queued':        { label: 'INITIALIZE PIPELINE →',    style: { background: 'var(--color-primary)', color: 'var(--color-bg-base)', border: 'none', fontWeight: 700 } },
    'data-assembly': { label: 'VIEW DATA STATUS →',       style: { background: 'rgba(0,212,122,0.08)', color: 'var(--color-primary)', border: '1px solid rgba(0,212,122,0.3)' } },
    'compliance':    { label: 'VIEW COMPLIANCE REPORT →', style: { background: 'rgba(138,143,138,0.08)', color: '#8A8F8A', border: '1px solid rgba(138,143,138,0.25)' } },
    'published':     { label: 'VIEW PUBLISHED REPORT →',  style: { background: 'rgba(0,212,122,0.08)', color: '#00D47A', border: '1px solid rgba(0,212,122,0.3)' } },
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, background: 'var(--color-bg-base)', height: '100%', overflow: 'hidden' }}>

      {/* Ticker */}
      <div style={{ height: 32, background: '#000', borderBottom: '1px solid var(--color-border-dark)', display: 'flex', alignItems: 'center', overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ overflow: 'hidden', display: 'flex', flex: 1 }}>
          <div className="animate-marquee">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <span style={{ color: 'var(--color-text-3)' }}>{t.label}</span>
                <span style={{ color: t.up === true ? '#00C8A0' : t.up === false ? '#FF4560' : 'var(--color-text-2)', fontWeight: 600 }}>{t.value}</span>
                <span style={{ color: t.up === true ? '#00C8A0' : t.up === false ? '#FF4560' : 'var(--color-text-3)', fontSize: 9 }}>{t.change}</span>
                <span style={{ color: 'var(--color-text-4)', marginLeft: 6 }}>|</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderBottom: '1px solid var(--color-border-dark)', flexShrink: 0, background: 'var(--color-bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 18, fontWeight: 700, color: 'var(--color-text-1)', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>Research Pipeline</h1>
          <span style={{ background: 'rgba(0,212,122,0.13)', color: 'var(--color-primary)', padding: '2px 8px', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700 }}>2 ACTIVE</span>
          {urgentCount > 0 && (
              <span style={{ background: 'rgba(255,69,96,0.15)', color: '#FF4560', padding: '2px 8px', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, border: '1px solid rgba(255,69,96,0.25)' }}>
              ⚡ {urgentCount} URGENT
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-3)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00C8A0', display: 'inline-block', boxShadow: '0 0 5px #00C8A0' }} />
              LIVE
            </span>
            <span style={{ color: 'var(--color-text-4)' }}>·</span>
            <span>WED 26 FEB 2026 · 09:14 ICT</span>
          </div>
          <button style={{ padding: '6px 14px', background: 'var(--color-primary)', border: 'none', borderRadius: 3, color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', cursor: 'pointer' }}>+ NEW REPORT</button>
        </div>
      </div>

      {/* KPI Row — edge to edge, no outer padding */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderBottom: '1px solid var(--color-border-dark)', flexShrink: 0 }}>
        {STATS.map(({ label, value, sub, color }, i) => (
          <div key={label} style={{ background: 'var(--color-bg-card)', borderLeft: `3px solid ${color}`, borderRight: i < 3 ? '1px solid var(--color-border-dark)' : 'none', padding: '12px 20px' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-3)', marginBottom: 4 }}>{label}</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--font-syne)', fontSize: 22, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{value}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color }}>{sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main area — fills all remaining vertical space */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>

        {/* Left column: pipeline table + activity feed */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>

          {/* Pipeline table */}
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            {/* Toolbar */}
            <div style={{ padding: '7px 16px', borderBottom: '1px solid var(--color-border-dark)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-bg-surface)', flexShrink: 0 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-text-3)' }}>
                Macro Monthly Pipeline — {PIPELINE.length} Reports
              </span>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)' }}>SORT:</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-primary)', cursor: 'pointer' }}>PRIORITY ↓</span>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--color-text-3)', cursor: 'pointer' }}>filter_list</span>
              </div>
            </div>
            {/* Table */}
            <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
                <thead>
                  <tr style={{ background: 'var(--color-bg-surface)', position: 'sticky', top: 0, zIndex: 1 }}>
                    {['ID', 'REPORT TITLE', 'STATUS', 'ANALYST', 'PROGRESS', 'DUE', 'UPDATED'].map(h => (
                      <th key={h} style={{ padding: '8px 14px', fontWeight: 400, fontSize: 9, letterSpacing: '0.08em', color: 'var(--color-text-3)', textAlign: 'left', borderBottom: '1px solid var(--color-border-dark)', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PIPELINE.map(r => {
                    const st = STATUS[r.status]
                    const isSelected = r.id === selected
                    const isHovered = r.id === hoveredRow
                    const isUrgent = r.priority === 'urgent'
                    return (
                      <tr
                        key={r.id}
                        onClick={() => setSelected(r.id)}
                        onMouseEnter={() => setHoveredRow(r.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                        style={{ cursor: 'pointer', borderLeft: isSelected ? '2px solid var(--color-primary)' : isUrgent ? '2px solid rgba(255,69,96,0.6)' : '2px solid transparent', background: isSelected ? 'rgba(0,212,122,0.06)' : isHovered ? 'rgba(30,33,30,0.97)' : 'transparent', borderBottom: '1px solid rgba(36,38,36,0.6)', transition: 'background 100ms' }}
                      >
                        <td style={{ padding: '10px 14px', color: r.id === selected ? 'var(--color-primary)' : '#F5A623', whiteSpace: 'nowrap', fontWeight: 600 }}>{r.id}</td>
                        <td style={{ padding: '10px 14px', maxWidth: 240 }}>
                          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--color-text-1)', fontWeight: 500 }}>{r.title}</div>
                          <div style={{ fontSize: 9, color: 'var(--color-text-3)', marginTop: 2 }}>{r.type}</div>
                        </td>
                        <td style={{ padding: '10px 14px' }}>
                          <span style={{ background: st.bg, color: st.color, border: `1px solid ${st.color}40`, padding: '2px 7px', borderRadius: 3, fontSize: 9, whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            {isUrgent && <span style={{ color: '#FF4560', fontSize: 10 }}>⚡</span>}
                            {st.label}
                          </span>
                        </td>
                        <td style={{ padding: '10px 14px', color: 'var(--color-text-2)', whiteSpace: 'nowrap' }}>{r.analyst}</td>
                        <td style={{ padding: '10px 14px', minWidth: 110 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ flex: 1, height: 3, background: 'var(--color-border-dark)', borderRadius: 2, overflow: 'hidden' }}>
                              <div style={{ width: `${r.progress}%`, height: '100%', background: BAR_COLOR[r.status], borderRadius: 2, transition: 'width 0.5s ease' }} />
                            </div>
                            <span style={{ fontSize: 9, color: 'var(--color-text-3)', minWidth: 26, textAlign: 'right' }}>{r.progress}%</span>
                          </div>
                        </td>
                        <td style={{ padding: '10px 14px', color: r.due === 'Today' ? '#FF4560' : 'var(--color-text-2)', whiteSpace: 'nowrap', fontWeight: r.due === 'Today' ? 700 : 400 }}>{r.due}</td>
                        <td style={{ padding: '10px 14px', color: 'var(--color-text-3)', whiteSpace: 'nowrap', fontSize: 10 }}>{r.updated}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity feed */}
          <div style={{ borderTop: '1px solid var(--color-border-dark)', padding: '10px 0 10px 16px', background: 'var(--color-bg-surface)', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, paddingRight: 16 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>terminal</span>
                Live System Logs
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#00C8A0', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#00C8A0', display: 'inline-block' }} />
                ALL SYSTEMS NOMINAL
              </span>
            </div>
            <div className="custom-scrollbar" style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingRight: 16, paddingBottom: 2 }}>
              {ACTIVITY.map((a, i) => (
                <div key={i} style={{ flexShrink: 0, width: 220, background: 'var(--color-bg-card)', border: '1px solid var(--color-border-dark)', borderLeft: `2px solid ${a.color}`, padding: '7px 10px', display: 'flex', gap: 8, borderRadius: 3 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 15, color: a.color, flexShrink: 0, marginTop: 1 }}>{a.icon}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)' }}>{a.time} · <span style={{ color: 'var(--color-primary)' }}>{a.id}</span></div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-1)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: CoT detail panel — full height sidebar */}
        <div style={{ width: 300, borderLeft: '1px solid var(--color-border-dark)', display: 'flex', flexDirection: 'column', flexShrink: 0, background: 'var(--color-bg-card)', overflow: 'hidden' }}>
          {sel && <>
            {/* Report header */}
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--color-border-dark)', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#F5A623', fontWeight: 600 }}>{sel.id}</span>
                <span style={{ background: STATUS[sel.status].bg, color: STATUS[sel.status].color, padding: '1px 6px', borderRadius: 2, fontFamily: 'var(--font-mono)', fontSize: 9, border: `1px solid ${STATUS[sel.status].color}40` }}>{STATUS[sel.status].label}</span>
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-1)', lineHeight: 1.4, marginBottom: 8 }}>{sel.title}</div>
              <div style={{ display: 'flex', gap: 12, fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)', marginBottom: 10 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 11 }}>person</span>
                  {sel.analyst}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 3, color: sel.due === 'Today' ? '#FF4560' : 'var(--color-text-3)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 11 }}>schedule</span>
                  Due: {sel.due}
                </span>
              </div>
              {/* Progress bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)', marginBottom: 4 }}>
                  <span>OVERALL PROGRESS</span>
                  <span style={{ color: BAR_COLOR[sel.status] }}>{sel.progress}%</span>
                </div>
                <div style={{ height: 4, background: 'var(--color-border-dark)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: `${sel.progress}%`, height: '100%', background: BAR_COLOR[sel.status], borderRadius: 2, transition: 'width 0.5s ease' }} />
                </div>
              </div>
            </div>

            {/* CoT header */}
            <div style={{ padding: '9px 16px', borderBottom: '1px solid var(--color-border-dark)', flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', color: 'var(--color-primary)', textTransform: 'uppercase' }}>FinRobot Chain-of-Thought</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)' }}>{doneCount}/{cotStages.length} DONE</span>
            </div>

            {/* CoT stages */}
            <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: 23, top: 20, bottom: 20, width: 1, background: 'var(--color-border-dark)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22, paddingLeft: 24 }}>
                {cotStages.map(({ key, label, desc, state }) => {
                  const dotColor = state === 'done' ? '#00C8A0' : state === 'active' ? '#F5A623' : 'var(--color-text-4)'
                  const textColor = state === 'pending' ? 'var(--color-text-3)' : 'var(--color-text-1)'
                  const stateLabel = state === 'done' ? '✓ Complete' : state === 'active' ? '⟳ In Progress' : '○ Pending'
                  const stateColor = state === 'done' ? '#00C8A0' : state === 'active' ? '#F5A623' : 'var(--color-text-4)'
                  return (
                    <div key={key} style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: -24, top: 3, width: 14, height: 14, borderRadius: '50%', background: dotColor, border: '2px solid var(--color-bg-card)', display: 'inline-block', boxShadow: state === 'active' ? `0 0 10px ${dotColor}` : 'none' }} />
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: textColor, fontWeight: 600 }}>{label}</div>
                      <div style={{ fontSize: 10, color: 'var(--color-text-3)', marginTop: 3, lineHeight: 1.5 }}>{desc}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: stateColor, textTransform: 'uppercase', marginTop: 4, letterSpacing: '0.05em' }}>{stateLabel}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ padding: '12px 16px', borderTop: '1px solid var(--color-border-dark)', display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
              {ACTION[sel.status] && (
                <button
                  onClick={() => sel.reportUrl && window.open(sel.reportUrl, '_blank')}
                  style={{ padding: '9px 0', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', width: '100%', ...ACTION[sel.status].style }}
                >
                  {ACTION[sel.status].label}
                </button>
              )}
              <button style={{ padding: '7px 0', border: '1px solid var(--color-border-dark)', borderRadius: 3, background: 'transparent', color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', width: '100%' }}>
                VIEW FULL AUDIT LOG
              </button>
            </div>
          </>}
        </div>
      </div>
    </div>
  )
}
