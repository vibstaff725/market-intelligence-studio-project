import { useState } from 'react'

// Live status mirrors Sidebar MODULES state
const MODULES = [
  {
    id: 'data-cot',
    label: 'Data-CoT',
    color: '#00D47A',
    icon: 'database',
    status: 'online',
    statusText: 'Ingesting',
    moduleRef: 'Module A + B',
    origin: 'Adapted from FinRobot (AI4Finance Foundation) — validated 8.4/10 by IB analyst panel',
    tagline: 'Structured financial data retrieval & versioned DataSnapshot',
    desc: 'Automatically ingests raw financial data from all connected sources, cross-references time series, detects anomalies, and produces a versioned DataSnapshot that every downstream agent reads from. Every claim in the final report is traceable to a specific data point in this snapshot.',
    inputs: [
      { label: 'Bloomberg Terminal API', sub: 'Macro time series — CPI, IP, trade balance, FED/SBV rates, FX' },
      { label: 'FiinPro', sub: 'Vietnamese equity fundamentals, sector statistics, earnings releases' },
      { label: 'GSO / NSO Official Releases', sub: 'Event-triggered ingestion on scheduled release dates (e.g. last Friday of month)' },
      { label: 'SBV Reports', sub: 'Credit growth, monetary policy statements, FX intervention data' },
    ],
    outputs: [
      { label: 'DataSnapshot', desc: 'Versioned, timestamped structured data object — immutable per report run' },
      { label: 'Anomaly Flags', desc: 'Statistical outlier detection (±2σ) surfaced for analyst review' },
      { label: 'Source Manifest', desc: 'Full provenance list — every data point linked to source + retrieval timestamp' },
    ],
    metrics: [{ label: 'Avg Ingest Time', value: '3.2 min' }, { label: 'Sources / Report', value: '8–14' }, { label: 'Data Points', value: '~2,400' }],
  },
  {
    id: 'concept-cot',
    label: 'Concept-CoT',
    color: '#F5A623',
    icon: 'hub',
    status: 'active',
    statusText: 'Running',
    moduleRef: 'Module D — Outline Agent',
    origin: 'Adapted from FinRobot Concept-CoT — maps raw data to financial concepts',
    tagline: 'Nowcasting, cross-validation & conceptual framework mapping',
    desc: 'Takes the DataSnapshot and maps raw numbers to financial concepts — nowcasting current-period indicators using high-frequency proxies, cross-validating series across sources, and building the structural framework for the report sections (macro environment, policy outlook, FX dynamics). Flags discrepancies between sources for analyst review.',
    inputs: [
      { label: 'DataSnapshot (from Data-CoT)', sub: 'Versioned structured data object' },
      { label: 'Prior Report Context', sub: 'Previous editions for momentum and revision-delta analysis' },
      { label: 'Analyst Input Layer', sub: 'Assumption sets and sector views entered by Hai Tran' },
    ],
    outputs: [
      { label: 'Conceptual Framework', desc: 'Macro theme map: growth, inflation, monetary policy, external sector, market implication' },
      { label: 'Nowcast Estimates', desc: 'Current-period CPI / IP / retail sales estimates using high-freq proxies pending official GSO release' },
      { label: 'Revision Delta', desc: 'YoY / MoM changes and momentum signals vs prior edition' },
      { label: 'Chart & Table Pack', desc: 'Pre-structured visualisation layouts ready for report insertion' },
    ],
    metrics: [{ label: 'Avg Run Time', value: '1.8 min' }, { label: 'Concepts Mapped', value: '18–32' }, { label: 'Cross-Validations', value: '~140' }],
  },
  {
    id: 'thesis-cot',
    label: 'Thesis-CoT',
    color: '#505550',
    icon: 'auto_stories',
    status: 'idle',
    statusText: 'Idle',
    moduleRef: 'Module D — Drafting Agent',
    origin: 'Adapted from FinRobot Thesis-CoT — synthesis layer with citation-mandatory constraint',
    tagline: 'Narrative synthesis with inline citation enforcement',
    desc: 'Synthesises the conceptual framework into a structured investment narrative. Every sentence that references a data point must carry an inline citation to its DataSnapshot entry — no uncited claims pass. Produces a complete first draft with executive summary, macro environment analysis, policy outlook, and market implications sections. Designed to be refined by the analyst, not replace them: the insight layer remains human.',
    inputs: [
      { label: 'Concept-CoT Output', sub: 'Conceptual framework + nowcast estimates + chart pack' },
      { label: 'Analyst Thesis Input', sub: 'Forward-looking views and investment rationale from Hai Tran' },
      { label: 'KAFI House Style Template', sub: 'Section structure, tone guidelines, formatting rules' },
    ],
    outputs: [
      { label: 'Full Draft Report', desc: 'Complete first draft covering all template sections, ready for analyst refinement' },
      { label: 'Citation Map', desc: 'Every claim linked to DataSnapshot source — compliance pre-check ready' },
      { label: 'Confidence Scores', desc: 'Per-section confidence rating; low-confidence sections flagged for priority review' },
      { label: 'Diff vs Prior Edition', desc: 'Narrative delta highlighting what changed vs last month\'s outlook' },
    ],
    metrics: [{ label: 'Avg Draft Time', value: '1.8h' }, { label: 'Cited Claims', value: '100%' }, { label: 'Story Score', value: '8.4/10' }],
  },
  {
    id: 'compliance',
    label: 'Compliance',
    color: '#505550',
    icon: 'verified_user',
    status: 'idle',
    statusText: 'Idle',
    moduleRef: 'Module E — Compliance Agent',
    origin: 'KAFI-native — regulatory compliance for UBCKNN (State Securities Commission of Vietnam)',
    tagline: 'Automated UBCKNN regulatory audit & disclosure enforcement',
    desc: 'Runs a multi-layer regulatory audit on the completed draft before publication. Checks against the UBCKNN restricted-issuer list, flags prohibited language (forward-looking statements without disclaimers, undisclosed conflicts of interest), auto-attaches mandatory disclosure boilerplate, and produces a full compliance audit trail. Target: zero manual compliance review for standard Macro Monthly reports.',
    inputs: [
      { label: 'Thesis-CoT Draft', sub: 'Full report text with citation map' },
      { label: 'UBCKNN Regulation Set', sub: 'Current restricted list + disclosure requirements + prohibited language DB' },
      { label: 'KAFI Disclosure Library', sub: 'Approved boilerplate templates for each report type' },
    ],
    outputs: [
      { label: 'Compliance Status', desc: 'CLEAR or FLAGGED — with itemised flag list and suggested remediation' },
      { label: 'Auto-Attached Disclosures', desc: 'Mandatory UBCKNN disclosures inserted in correct sections automatically' },
      { label: 'Audit Trail', desc: 'Timestamped record of all checks performed — immutable for regulatory archival' },
      { label: 'Restricted List Report', desc: 'Confirms no flagged issuers mentioned without required disclosures' },
    ],
    metrics: [{ label: '1st-Pass Clear Rate', value: '94%' }, { label: 'Avg Audit Time', value: '< 2 min' }, { label: 'Rules Checked', value: '47' }],
  },
]

const ACTIVE_PIPELINE = [
  { rpt: 'RPT-031', title: 'VN Macro Monthly — March 2026', stage: 'concept-cot', progress: 40, note: 'Nowcasting Feb CPI / IP. Blocked on GSO release (Feb 27).' },
]

const PERF_STATS = [
  { label: 'Reports Processed',   value: '3',    sub: 'Jan + Feb + Mar (in-flight)', color: '#00D47A' },
  { label: 'Avg End-to-End',      value: '2.1h', sub: '↓ 74% vs manual baseline',  color: '#00D47A' },
  { label: 'Compliance 1st-Pass', value: '94%',  sub: '2/2 editions cleared',       color: '#00D47A' },
  { label: 'Citation Coverage',   value: '100%', sub: 'Zero uncited claims',        color: '#00D47A' },
]

const PIPELINE_FLOW = ['Data-CoT', 'Concept-CoT', 'Thesis-CoT', 'Compliance']

const STATUS_DOT = {
  online: { bg: '#00D47A', shadow: '0 0 6px #00D47A80' },
  active: { bg: '#F5A623', shadow: '0 0 6px #F5A62380' },
  idle:   { bg: '#303530', shadow: 'none' },
}

export default function AIModules() {
  const [expanded, setExpanded] = useState('data-cot')

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, background: 'var(--color-bg-base)', height: '100%', overflow: 'hidden' }}>

      {/* ── Header ── */}
      <div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderBottom: '1px solid var(--color-border-dark)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-syne)', fontSize: 18, fontWeight: 700, color: 'var(--color-text-1)', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>AI Engine</h1>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)', letterSpacing: '0.08em' }}>FinRobot Chain-of-Thought · KAFI Adaptation</span>
        </div>
        {/* Live pipeline status pills */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {PIPELINE_FLOW.map((label, i) => {
            const mod = MODULES.find(m => m.label === label)
            const dot = STATUS_DOT[mod.status]
            const isLast = i === PIPELINE_FLOW.length - 1
            return (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '3px 9px', background: mod.status === 'idle' ? 'transparent' : `${mod.color}10`, border: `1px solid ${mod.status === 'idle' ? 'var(--color-border-dark)' : `${mod.color}40`}`, borderRadius: 3 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: dot.bg, boxShadow: dot.shadow, display: 'inline-block', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: mod.status === 'idle' ? 'var(--color-text-3)' : mod.color, letterSpacing: '0.05em' }}>{label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--color-text-3)' }}>{mod.statusText}</span>
                </div>
                {!isLast && <span style={{ color: 'var(--color-text-4)', fontSize: 10 }}>→</span>}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>

        {/* ── Left: module cards ── */}
        <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>

          {/* Architecture origin note */}
          <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border-dark)', borderLeft: '3px solid var(--color-border-bright)', borderRadius: 4, padding: '10px 14px', marginBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-text-3)', flexShrink: 0 }}>info</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-2)', lineHeight: 1.6 }}>
                Architecture adapted from <span style={{ color: 'var(--color-text-1)' }}>FinRobot</span> (AI4Finance Foundation, open-source) — the only publicly validated multi-agent research system, scored <span style={{ color: 'var(--color-primary)' }}>8.4/10</span> by an independent IB analyst panel. KAFI extends the 3-agent CoT pipeline with a <span style={{ color: 'var(--color-text-1)' }}>Compliance Agent</span> for UBCKNN regulatory requirements.
              </span>
            </div>
          </div>

          {/* Module cards */}
          {MODULES.map((mod, modIdx) => {
            const isOpen = expanded === mod.id
            const dot = STATUS_DOT[mod.status]
            return (
              <div key={mod.id}>
                {/* Flow connector */}
                {modIdx > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', marginBottom: 10 }}>
                    <div style={{ flex: 1, height: 1, background: 'var(--color-border-dark)' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-4)' }}>↓ OUTPUT FEEDS INTO</span>
                    <div style={{ flex: 1, height: 1, background: 'var(--color-border-dark)' }} />
                  </div>
                )}

                <div
                  style={{
                    background: isOpen ? 'var(--color-bg-card)' : 'var(--color-bg-surface)',
                    border: `1px solid ${isOpen ? mod.color + '40' : 'var(--color-border-dark)'}`,
                    borderLeft: `3px solid ${mod.color}`,
                    borderRadius: 6,
                    overflow: 'hidden',
                    transition: 'all 150ms',
                  }}
                >
                  {/* Card header — always visible */}
                  <div
                    onClick={() => setExpanded(isOpen ? null : mod.id)}
                    style={{ padding: '12px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, userSelect: 'none' }}
                  >
                    {/* Icon */}
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: `${mod.color}15`, border: `1px solid ${mod.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 18, color: mod.color }}>{mod.icon}</span>
                    </div>

                    {/* Title */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                        <span style={{ fontFamily: 'var(--font-syne)', fontSize: 13, fontWeight: 700, color: 'var(--color-text-1)' }}>{mod.label}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: mod.color, background: `${mod.color}15`, border: `1px solid ${mod.color}30`, borderRadius: 2, padding: '1px 6px', letterSpacing: '0.06em' }}>{mod.moduleRef}</span>
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)' }}>{mod.tagline}</span>
                    </div>

                    {/* Status */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: dot.bg, boxShadow: dot.shadow, flexShrink: 0 }} />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: mod.status === 'idle' ? 'var(--color-text-3)' : mod.color }}>{mod.statusText}</span>
                    </div>

                    {/* Chevron */}
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--color-text-3)', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 150ms', flexShrink: 0 }}>expand_more</span>
                  </div>

                  {/* Expanded detail */}
                  {isOpen && (
                    <div style={{ borderTop: `1px solid ${mod.color}20`, padding: '16px 16px 20px' }}>

                      {/* Description */}
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--color-text-2)', lineHeight: 1.7, marginBottom: 20 }}>{mod.desc}</p>

                      {/* Origin chip */}
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(138,143,138,0.06)', border: '1px solid rgba(138,143,138,0.2)', borderRadius: 3, padding: '4px 10px', marginBottom: 20 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 11, color: 'var(--color-text-3)' }}>science</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-2)' }}>{mod.origin}</span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                        {/* Inputs */}
                        <div>
                          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', marginBottom: 10 }}>Inputs</p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {mod.inputs.map(inp => (
                              <div key={inp.label} style={{ display: 'flex', gap: 8 }}>
                                <span style={{ width: 4, height: 4, borderRadius: '50%', background: mod.color, marginTop: 5, flexShrink: 0 }} />
                                <div>
                                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-1)', fontWeight: 500 }}>{inp.label}</div>
                                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 10, color: 'var(--color-text-3)', marginTop: 1, lineHeight: 1.5 }}>{inp.sub}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Outputs */}
                        <div>
                          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', marginBottom: 10 }}>Outputs</p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {mod.outputs.map(out => (
                              <div key={out.label} style={{ display: 'flex', gap: 8, padding: '6px 8px', background: `${mod.color}08`, borderRadius: 3 }}>
                                <span className="material-symbols-outlined" style={{ fontSize: 12, color: mod.color, flexShrink: 0, marginTop: 1 }}>output</span>
                                <div>
                                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: mod.color, fontWeight: 600 }}>{out.label}</div>
                                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 10, color: 'var(--color-text-3)', marginTop: 1, lineHeight: 1.5 }}>{out.desc}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Metrics */}
                      <div style={{ display: 'flex', gap: 10 }}>
                        {mod.metrics.map(m => (
                          <div key={m.label} style={{ flex: 1, background: 'var(--color-bg-base)', border: '1px solid var(--color-border-dark)', borderRadius: 4, padding: '8px 10px' }}>
                            <div style={{ fontFamily: 'var(--font-syne)', fontSize: 18, fontWeight: 700, color: mod.color, lineHeight: 1 }}>{m.value}</div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--color-text-3)', marginTop: 4, letterSpacing: '0.06em' }}>{m.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Right panel ── */}
        <div style={{ width: 272, borderLeft: '1px solid var(--color-border-dark)', background: 'var(--color-bg-card)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>

          {/* Active pipeline */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border-dark)' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', marginBottom: 12 }}>Active Pipeline</p>
            {ACTIVE_PIPELINE.length === 0 ? (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-4)', textAlign: 'center', padding: '12px 0' }}>NO ACTIVE RUNS</div>
            ) : ACTIVE_PIPELINE.map(rpt => {
              const stageMod = MODULES.find(m => m.id === rpt.stage)
              return (
                <div key={rpt.rpt} style={{ background: 'var(--color-bg-base)', border: '1px solid var(--color-border-dark)', borderRadius: 5, padding: '10px 12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#F5A623', fontWeight: 700 }}>{rpt.rpt}</span>
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 10, color: 'var(--color-text-2)', marginTop: 2 }}>{rpt.title}</div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: stageMod.color }}>{rpt.progress}%</span>
                  </div>
                  {/* Stage pills */}
                  <div style={{ display: 'flex', gap: 3, marginBottom: 8 }}>
                    {MODULES.map(m => {
                      const stageIdx = MODULES.findIndex(x => x.id === rpt.stage)
                      const thisIdx  = MODULES.indexOf(m)
                      const isDone   = thisIdx < stageIdx
                      const isActive = m.id === rpt.stage
                      return (
                        <div key={m.id} style={{
                          flex: 1, padding: '2px 0', textAlign: 'center', borderRadius: 2,
                          background: isDone ? `${m.color}20` : isActive ? `${m.color}15` : 'var(--color-bg-surface)',
                          border: `1px solid ${isActive ? m.color : isDone ? `${m.color}40` : 'var(--color-border-dark)'}`,
                          fontFamily: 'var(--font-mono)', fontSize: 7,
                          color: isDone || isActive ? m.color : 'var(--color-text-4)',
                        }}>
                          {isDone ? '✓' : m.label.split('-')[0]}
                        </div>
                      )
                    })}
                  </div>
                  {/* Progress bar */}
                  <div style={{ height: 2, background: 'var(--color-border-dark)', borderRadius: 2, overflow: 'hidden', marginBottom: 8 }}>
                    <div style={{ width: `${rpt.progress}%`, height: '100%', background: stageMod.color, borderRadius: 2, transition: 'width 500ms' }} />
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)', lineHeight: 1.5 }}>{rpt.note}</div>
                </div>
              )
            })}
          </div>

          {/* Performance stats */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border-dark)' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', marginBottom: 10 }}>Engine Performance</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {PERF_STATS.map(s => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-2)' }}>{s.label}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--color-text-3)', marginTop: 1 }}>{s.sub}</div>
                  </div>
                  <span style={{ fontFamily: 'var(--font-syne)', fontSize: 16, fontWeight: 700, color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline sequence diagram */}
          <div style={{ padding: '12px 16px', flex: 1 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', marginBottom: 12 }}>Pipeline Sequence</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {MODULES.map((mod, i) => (
                <div key={mod.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  {/* Connector column */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20, flexShrink: 0 }}>
                    <div style={{ width: 14, height: 14, borderRadius: '50%', background: mod.status === 'idle' ? 'var(--color-bg-base)' : `${mod.color}20`, border: `2px solid ${mod.status === 'idle' ? 'var(--color-border-bright)' : mod.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 4 }}>
                      {mod.status !== 'idle' && <span style={{ width: 5, height: 5, borderRadius: '50%', background: mod.color }} />}
                    </div>
                    {i < MODULES.length - 1 && <div style={{ width: 1, height: 28, background: 'var(--color-border-dark)', marginTop: 2 }} />}
                  </div>
                  {/* Content */}
                  <div style={{ paddingBottom: i < MODULES.length - 1 ? 20 : 0 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: mod.status === 'idle' ? 'var(--color-text-3)' : mod.color, fontWeight: 600 }}>{mod.label}</div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: 9, color: 'var(--color-text-3)', marginTop: 2, lineHeight: 1.5 }}>{mod.tagline}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
