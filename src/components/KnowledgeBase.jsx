import { useState } from 'react'

const REPORTS = [
  { id: 1, title: 'VN Macro Monthly Outlook — February 2026', analyst: 'Linh Nguyen', date: 'Feb 23, 2026', type: 'Macro Monthly', typeColor: '#00D47A', excerpt: 'The USD/VND spot rate ended February at 25,642 — within our projected range of 25,500–25,800. Strong remittance inflows offset foreign portfolio outflows triggered by renewed Fed hawkishness. We maintain our full-year 2026 forecast of 25,400–26,000.', tags: ['USD/VND','FX','SBV','Remittances'], citations: ['Bloomberg: USD/VND spot, 23-Feb-2026','SBV: Monthly FX Operations Report Jan 2026','GSO: Macro Indicators Release Feb 2026'] },
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
  const [hoveredId, setHoveredId] = useState(null)
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

      {/* Header */}
      <div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderBottom: '1px solid var(--color-border-dark)', flexShrink: 0, background: 'var(--color-bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 18, fontWeight: 700, color: 'var(--color-text-1)', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>Knowledge Base</h1>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-3)', background: 'var(--color-bg-card)', border: '1px solid var(--color-border-dark)', padding: '2px 8px', borderRadius: 3 }}>847 REPORTS</span>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)', display: 'flex', gap: 12 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span className="material-symbols-outlined" style={{ fontSize: 12 }}>link</span>2,341 CITATIONS</span>
          <span style={{ color: 'var(--color-text-4)' }}>·</span>
          <span>INDEXED 08:41</span>
        </div>
      </div>

      {/* Search + filter row */}
      <div style={{ padding: '12px 24px', borderBottom: '1px solid var(--color-border-dark)', background: 'var(--color-bg-surface)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--color-bg-base)', border: '1px solid var(--color-primary)', borderRadius: 4, padding: '7px 14px', marginBottom: 10 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 17, color: 'var(--color-primary)' }}>search</span>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="SEARCH KAFI RESEARCH ARCHIVE..." style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-text-1)' }} />
          {query && <button onClick={() => setQuery('')} style={{ background: 'rgba(62,91,114,0.3)', border: 'none', cursor: 'pointer', color: 'var(--color-text-3)', fontSize: 14, width: 20, height: 20, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)', textTransform: 'uppercase' }}>TYPE:</span>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '3px 10px', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 600, textTransform: 'uppercase', cursor: 'pointer', border: filter === f ? '1px solid var(--color-primary)' : '1px solid var(--color-border-dark)', background: filter === f ? 'rgba(0,212,122,0.1)' : 'transparent', color: filter === f ? 'var(--color-primary)' : 'var(--color-text-3)', transition: 'all 150ms' }}>{f}</button>
          ))}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)', marginLeft: 'auto' }}>{results.length} RESULT{results.length !== 1 ? 'S' : ''}{query ? ` FOR "${query.toUpperCase()}"` : ''}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Results list */}
        <div className="custom-scrollbar" style={{ flex: '0 0 55%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2, padding: '8px' }}>
          {results.length === 0 && (
            <div style={{ padding: '48px 24px', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-3)' }}>NO RESULTS FOR "{query.toUpperCase()}"</div>
          )}
          {results.map(r => {
            const isSelected = selected === r.id
            const isHovered = hoveredId === r.id
            return (
              <div
                key={r.id}
                onClick={() => setSelected(r.id)}
                onMouseEnter={() => setHoveredId(r.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ background: isSelected ? 'rgba(0,212,122,0.06)' : isHovered ? 'rgba(30,33,30,0.97)' : 'var(--color-bg-card)', border: '1px solid var(--color-border-dark)', borderLeft: isSelected ? '2px solid var(--color-primary)' : '2px solid transparent', borderRadius: 4, padding: '12px 14px', cursor: 'pointer', transition: 'all 100ms' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-1)', flex: 1, marginRight: 8, lineHeight: 1.4 }}>{highlight(r.title)}</div>
                  <span style={{ background: `${r.typeColor}20`, color: r.typeColor, border: `1px solid ${r.typeColor}40`, padding: '2px 7px', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 9, whiteSpace: 'nowrap', flexShrink: 0 }}>{r.type}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)', marginBottom: 6 }}>{r.analyst} · {r.date}</div>
                <div style={{ fontSize: 11, color: 'var(--color-text-2)', lineHeight: 1.6, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{highlight(r.excerpt)}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
                  {r.tags.map(t => <span key={t} style={{ padding: '1px 6px', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border-dark)', borderRadius: 2, fontFamily: 'var(--font-mono)', fontSize: 9, color: query && t.toLowerCase().includes(query.toLowerCase()) ? '#F59E0B' : 'var(--color-text-3)' }}>{t}</span>)}
                </div>
              </div>
            )
          })}
        </div>

        {/* Detail + Citation panel */}
        {sel && (
          <div className="custom-scrollbar" style={{ flex: '0 0 45%', borderLeft: '1px solid var(--color-border-dark)', background: 'var(--color-bg-card)', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

            {/* Report header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border-dark)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <span style={{ background: `${sel.typeColor}20`, color: sel.typeColor, border: `1px solid ${sel.typeColor}40`, padding: '2px 7px', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700 }}>{sel.type}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)' }}>{sel.date}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-syne)', fontSize: 15, fontWeight: 700, color: 'var(--color-text-1)', lineHeight: 1.35, marginBottom: 6 }}>{sel.title}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)', marginBottom: 12 }}>{sel.analyst}</div>
              <div style={{ fontSize: 11, color: 'var(--color-text-2)', lineHeight: 1.7 }}>{highlight(sel.excerpt)}</div>
            </div>

            {/* Tags */}
            <div style={{ padding: '10px 20px', borderBottom: '1px solid var(--color-border-dark)', display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {sel.tags.map(t => <span key={t} style={{ padding: '2px 8px', background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.25)', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 9, color: '#60A5FA' }}>{t}</span>)}
            </div>

            {/* Citation integrity */}
            <div style={{ padding: '14px 20px', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-2)' }}>Citation Integrity</span>
                <span style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)', padding: '2px 8px', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700 }}>✓ VERIFIED</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {sel.citations.map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 12px', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border-dark)', borderLeft: '2px solid rgba(16,185,129,0.5)', borderRadius: '0 3px 3px 0' }}>
                    <span style={{ color: '#10B981', flexShrink: 0, fontSize: 12, marginTop: 1 }}>✓</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-1)' }}>{c}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--color-text-3)', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Primary Source · Verified</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, textAlign: 'center', padding: '12px 0', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 4 }}>
                <div style={{ fontFamily: 'var(--font-syne)', fontSize: 36, fontWeight: 800, color: '#10B981', lineHeight: 1 }}>100%</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', color: '#10B981', marginTop: 4 }}>CLAIM VERIFICATION RATE</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)', marginTop: 6 }}>All claims verified against primary sources</div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ padding: '12px 20px', borderTop: '1px solid var(--color-border-dark)', display: 'flex', gap: 8 }}>
              <button style={{ flex: 1, padding: '8px 0', background: 'var(--color-primary)', border: 'none', borderRadius: 3, color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', cursor: 'pointer' }}>OPEN REPORT →</button>
              <button style={{ padding: '8px 12px', background: 'transparent', border: '1px solid var(--color-border-dark)', borderRadius: 3, color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)', fontSize: 10, cursor: 'pointer' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 14, verticalAlign: 'middle' }}>share</span>
              </button>
              <button style={{ padding: '8px 12px', background: 'transparent', border: '1px solid var(--color-border-dark)', borderRadius: 3, color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)', fontSize: 10, cursor: 'pointer' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 14, verticalAlign: 'middle' }}>download</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
