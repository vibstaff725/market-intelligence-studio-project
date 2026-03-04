import { useState } from 'react'

const TEMPLATES = [
  { id: 'macro',    name: 'Macro Monthly Outlook',    cat: 'Macro',        catColor: '#00D47A', uses: 142, avgTime: '2.1h', pages: '8–12', agents: ['Data-CoT','Concept-CoT','Thesis-CoT'], sources: ['Bloomberg Macro','GSO Data','SBV Reports','IMF/WB'], sections: ['Executive Summary','Macro Environment','Key Indicators Dashboard','Policy Outlook','SBV Watch','FX & Capital Flows','Market Implications','Disclosure'] },
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
  const [hovered, setHovered] = useState(null)
  const sel = TEMPLATES.find(t => t.id === selected)

  const filtered = filter === 'ALL' ? TEMPLATES : TEMPLATES.filter(t => t.cat === filter)

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, background: 'var(--color-bg-base)', height: '100%', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderBottom: '1px solid var(--color-border-dark)', flexShrink: 0, background: 'var(--color-bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 18, fontWeight: 700, color: 'var(--color-text-1)', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>Template Library</h1>
          <span style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border-dark)', color: 'var(--color-text-3)', padding: '2px 8px', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 10 }}>{TEMPLATES.length} TEMPLATES</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--color-bg-base)', border: '1px solid var(--color-border-dark)', borderRadius: 4, padding: '5px 12px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-text-3)' }}>search</span>
          <input placeholder="FILTER TEMPLATES..." style={{ background: 'transparent', border: 'none', outline: 'none', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-1)', width: 160 }} />
        </div>
      </div>

      {/* Category pills */}
      <div style={{ display: 'flex', gap: 6, padding: '8px 24px', borderBottom: '1px solid var(--color-border-dark)', flexShrink: 0, background: 'var(--color-bg-surface)' }}>
        {CATS.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{ padding: '4px 12px', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', cursor: 'pointer', border: filter === c ? '1px solid var(--color-primary)' : '1px solid var(--color-border-dark)', background: filter === c ? 'rgba(0,212,122,0.1)' : 'transparent', color: filter === c ? 'var(--color-primary)' : 'var(--color-text-3)', transition: 'all 120ms' }}>{c}</button>
        ))}
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)', display: 'flex', alignItems: 'center' }}>{filtered.length} SHOWN</span>
      </div>

      {/* Content split */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Template grid */}
        <div className="custom-scrollbar" style={{ flex: '0 0 58%', overflowY: 'auto', padding: 16, display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, alignContent: 'start' }}>
          {filtered.map(t => {
            const isSelected = selected === t.id
            const isHovered = hovered === t.id
            return (
              <div
                key={t.id}
                onClick={() => setSelected(t.id)}
                onMouseEnter={() => setHovered(t.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ background: isSelected ? 'rgba(0,212,122,0.06)' : isHovered ? 'var(--color-bg-hover)' : 'var(--color-bg-card)', border: `1px solid ${isSelected ? 'rgba(0,212,122,0.3)' : isHovered ? 'var(--color-border-bright)' : 'var(--color-border-dark)'}`, borderTop: `2px solid ${isSelected ? 'var(--color-primary)' : t.catColor}`, borderRadius: 4, padding: 14, cursor: 'pointer', transition: 'all 120ms' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <span style={{ display: 'inline-block', padding: '2px 7px', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, background: `${t.catColor}18`, color: t.catColor, border: `1px solid ${t.catColor}30` }}>{t.cat}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)' }}>↺ {t.uses}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-syne)', fontSize: 13, fontWeight: 700, color: isSelected ? 'var(--color-text-1)' : 'var(--color-text-1)', marginBottom: 10, lineHeight: 1.3 }}>{t.name}</div>
                <div style={{ display: 'flex', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 11 }}>schedule</span>
                    {t.avgTime}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 11 }}>description</span>
                    {t.pages}p
                  </span>
                  <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 3, color: t.agents.length > 2 ? '#A78BFA' : '#10B981' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 11 }}>smart_toy</span>
                    {t.agents.length} agents
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Detail panel */}
        {sel && (
          <div className="custom-scrollbar" style={{ flex: '0 0 42%', borderLeft: '1px solid var(--color-border-dark)', background: 'var(--color-bg-card)', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

            {/* Detail header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border-dark)', borderTop: `3px solid ${sel.catColor}` }}>
              <span style={{ display: 'inline-block', padding: '2px 7px', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, marginBottom: 8, background: `${sel.catColor}18`, color: sel.catColor, border: `1px solid ${sel.catColor}30` }}>{sel.cat}</span>
              <div style={{ fontFamily: 'var(--font-syne)', fontSize: 17, fontWeight: 700, color: 'var(--color-text-1)', lineHeight: 1.25, marginBottom: 12 }}>{sel.name}</div>
              <button style={{ width: '100%', padding: '10px 0', background: 'var(--color-primary)', border: 'none', borderRadius: 3, color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
                USE THIS TEMPLATE →
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', padding: '14px 20px', borderBottom: '1px solid var(--color-border-dark)', gap: 8 }}>
              {[['Uses', sel.uses, '#F59E0B'], ['Avg Time', sel.avgTime, '#10B981'], ['Pages', sel.pages, '#60A5FA']].map(([l, v, c]) => (
                <div key={l} style={{ textAlign: 'center', background: 'var(--color-bg-surface)', padding: '10px 6px', borderRadius: 3, border: '1px solid var(--color-border-dark)' }}>
                  <div style={{ fontFamily: 'var(--font-syne)', fontSize: 18, fontWeight: 700, color: c, lineHeight: 1 }}>{v}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--color-text-3)', textTransform: 'uppercase', marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>

            {/* Sections */}
            <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--color-border-dark)' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', marginBottom: 10 }}>Report Sections</p>
              <ol style={{ paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: 5, listStyle: 'none' }}>
                {sel.sections.map((s, i) => (
                  <li key={s} style={{ display: 'flex', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-2)', padding: '4px 8px', background: 'var(--color-bg-surface)', borderRadius: 3 }}>
                    <span style={{ color: 'var(--color-text-4)', minWidth: 20 }}>{String(i+1).padStart(2,'0')}.</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* AI Agents */}
            <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--color-border-dark)' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', marginBottom: 10 }}>AI Agents Activated</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {sel.agents.map(a => (
                  <span key={a} style={{ padding: '4px 10px', border: '1px solid rgba(16,185,129,0.35)', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 10, color: '#10B981', background: 'rgba(16,185,129,0.07)', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 12 }}>smart_toy</span>
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Data Sources */}
            <div style={{ padding: '14px 20px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', marginBottom: 10 }}>Data Sources</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {sel.sources.map(s => (
                  <span key={s} style={{ padding: '4px 10px', border: '1px solid rgba(56,189,248,0.35)', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 10, color: '#38BDF8', background: 'rgba(56,189,248,0.07)', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 12 }}>database</span>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
