import { useMemo, useState } from 'react'

const DAYS = ['MON','TUE','WED','THU','FRI','SAT','SUN']
const MONTH_LABEL = 'FEB – MAR 2026'
const MONTH_START = new Date('2026-03-01T00:00:00')
const VIEW_MODES = [
  { id: 'compact', label: '3-WEEK' },
  { id: 'week', label: 'WEEKLY' },
  { id: 'month', label: 'MONTHLY' },
]

// ── GSO (Vietnamese NSO) & external macro data release dates
const NSO_RELEASES = {
  '2026-02-27': [
    { label: 'GSO: CPI Feb 2026',          color: '#00D47A', type: 'nso' },
    { label: 'GSO: IP Feb 2026',            color: '#00D47A', type: 'nso' },
    { label: 'GSO: Retail Sales Feb 2026',  color: '#00D47A', type: 'nso' },
  ],
  '2026-03-02': [
    { label: 'GSO: Trade Balance Feb 2026', color: '#00D47A', type: 'nso' },
    { label: 'GSO: FDI Feb 2026',           color: '#00D47A', type: 'nso' },
  ],
  '2026-03-19': [{ label: 'FED FOMC Meeting',        color: '#8A8F8A', type: 'nso' }],
  '2026-03-20': [{ label: 'SBV Rate Decision',        color: '#8A8F8A', type: 'nso' }],
  '2026-03-27': [
    { label: 'GSO: CPI Mar 2026',           color: '#00D47A', type: 'nso' },
    { label: 'GSO: IP Mar 2026',            color: '#00D47A', type: 'nso' },
    { label: 'GSO: Retail Sales Mar 2026',  color: '#00D47A', type: 'nso' },
  ],
  '2026-04-01': [
    { label: 'GSO: Trade Balance Mar 2026', color: '#00D47A', type: 'nso' },
  ],
}

// ── ONLY major report milestones (big deliverables) ──
const REPORT_EVENTS = {
  '2026-03-07': [{ label: 'VN Macro Monthly Outlook — February 2026', color: '#00D47A', type: 'deadline', rpt: 'RPT-029' }],
  '2026-03-09': [{ label: 'VN Macro Monthly Outlook — February 2026', color: '#00D47A', type: 'pub', rpt: 'RPT-029' }],
  '2026-04-07': [{ label: 'VN Macro Monthly Outlook — March 2026', color: '#00D47A', type: 'deadline', rpt: 'RPT-031' }],
  '2026-04-09': [{ label: 'VN Macro Monthly Outlook — March 2026', color: '#00D47A', type: 'pub', rpt: 'RPT-031' }],
}

function mergeEvents(date) {
  return [...(REPORT_EVENTS[date] || []), ...(NSO_RELEASES[date] || [])]
}

const LEGEND = [
  { label: 'Deadline',     color: '#FF4560' },
  { label: 'AI Task',      color: '#F5A623' },
  { label: 'Published',    color: '#00D47A' },
  { label: 'Compliance',   color: '#4DAAFF' },
  { label: 'Cycle Start',  color: '#00D47A' },
  { label: 'NSO / Data',   color: '#2BD4E8' },
  { label: 'Macro Policy', color: '#B08EF5' },
]

const EDITIONS = [
  {
    id: 'RPT-031', label: 'VN Macro Monthly', edition: 'March 2026',
    stages: [
      { key: 'data',  label: 'Data', state: 'active' },
      { key: 'ai',    label: 'AI',   state: 'active' },
      { key: 'comp',  label: 'Comp', state: 'pending' },
      { key: 'pub',   label: 'Pub',  state: 'pending' },
    ],
    due: 'Mar 7', analyst: 'Hai. Tran', progress: 40, color: '#00D47A',
  },
  {
    id: 'RPT-033', label: 'VN Macro Monthly', edition: 'April 2026',
    stages: [
      { key: 'data',  label: 'Data', state: 'pending' },
      { key: 'ai',    label: 'AI',   state: 'pending' },
      { key: 'comp',  label: 'Comp', state: 'pending' },
      { key: 'pub',   label: 'Pub',  state: 'pending' },
    ],
    due: 'Apr 7', analyst: 'Hai Tran', progress: 0, color: '#00D47A',
  },
]

const CYCLE_STAGES = ['DATA SYNC', 'AI DRAFT', 'COMPLIANCE', 'PUBLISH']

const CYCLES = [
  { id: 'RPT-031', label: 'VN Macro Monthly · Mar 2026', color: '#00D47A', activeStage: 0, daysLeft: 9 },
  { id: 'RPT-033', label: 'VN Macro Monthly · Apr 2026', color: '#505550', activeStage: -1, daysLeft: 40 },
]

// ── 3-row view: weeks starting Feb 23, Mar 2, Mar 9
function buildCompact3WeekCalendar() {
  const weeks = []
  const startDate = new Date('2026-02-23')
  for (let week = 0; week < 3; week++) {
    const weekCells = []
    for (let day = 0; day < 7; day++) {
      const d = new Date(startDate)
      d.setDate(d.getDate() + week * 7 + day)
      const dateStr = `2026-${String(d.getMonth() + 1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
      weekCells.push({ date: dateStr, day: d.getDate(), month: d.getMonth() === 1 ? 'feb' : 'mar' })
    }
    weeks.push(weekCells)
  }
  return weeks
}

const WEEKS = buildCompact3WeekCalendar()
const TODAY = '2026-02-26'

function formatDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function parseDate(dateStr) {
  return new Date(`${dateStr}T00:00:00`)
}

function addDays(date, days) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

function addMonths(date, offset) {
  return new Date(date.getFullYear(), date.getMonth() + offset, 1)
}

function getMonday(date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = (day === 0 ? -6 : 1) - day
  d.setDate(d.getDate() + diff)
  return d
}

function buildWeekFromDate(date) {
  const start = getMonday(date)
  return Array.from({ length: 7 }, (_, idx) => {
    const d = addDays(start, idx)
    return {
      date: formatDate(d),
      day: d.getDate(),
      monthIndex: d.getMonth(),
      isCurrentMonth: true,
    }
  })
}

function buildMonthCalendar(startDate) {
  const monthIndex = startDate.getMonth()
  const firstOfMonth = new Date(startDate.getFullYear(), monthIndex, 1)
  const lastOfMonth = new Date(startDate.getFullYear(), monthIndex + 1, 0)
  let cursor = getMonday(firstOfMonth)
  const weeks = []

  while (cursor <= lastOfMonth || weeks.length < 6) {
    const weekCells = []
    for (let day = 0; day < 7; day++) {
      const d = addDays(cursor, day)
      weekCells.push({
        date: formatDate(d),
        day: d.getDate(),
        monthIndex: d.getMonth(),
        isCurrentMonth: d.getMonth() === monthIndex,
      })
    }
    weeks.push(weekCells)
    cursor = addDays(cursor, 7)
    if (cursor > lastOfMonth && weeks.length >= 5) {
      break
    }
  }

  return weeks
}

function formatMonthLabel(date) {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase()
}

function formatWeekLabel(dateStr) {
  const start = getMonday(parseDate(dateStr))
  const end = addDays(start, 6)
  const startLabel = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const endLabel = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  return `${startLabel} – ${endLabel}`.toUpperCase()
}

export default function Calendar() {
  const [selectedDay, setSelectedDay] = useState(TODAY)
  const [weekOffset, setWeekOffset] = useState(0)
  const [viewMode, setViewMode] = useState('compact')
  const [monthStart, setMonthStart] = useState(MONTH_START)

  const maxWeekOffset = Math.max(0, WEEKS.length - 3)
  const safeWeekOffset = Math.max(0, Math.min(weekOffset, maxWeekOffset))

  const visibleWeeks = WEEKS.slice(safeWeekOffset, safeWeekOffset + 3).length > 0
    ? WEEKS.slice(safeWeekOffset, safeWeekOffset + 3)
    : [WEEKS[0]]

  const calendarWeeks = useMemo(() => {
    if (viewMode === 'week') {
      return [buildWeekFromDate(parseDate(selectedDay))]
    }
    if (viewMode === 'month') {
      return buildMonthCalendar(monthStart)
    }
    return visibleWeeks
  }, [monthStart, selectedDay, viewMode, visibleWeeks])

  const headerLabel = viewMode === 'week'
    ? formatWeekLabel(selectedDay)
    : viewMode === 'month'
      ? formatMonthLabel(monthStart)
      : MONTH_LABEL
  
  const selEvents    = mergeEvents(selectedDay)
  const selReports   = selEvents.filter(e => e.type !== 'nso')
  const selNSO       = selEvents.filter(e => e.type === 'nso')

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, background: 'var(--color-bg-base)', height: '100%', overflow: 'hidden' }}>

      {/* ── Header ── */}
      <div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderBottom: '1px solid var(--color-border-dark)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 18, fontWeight: 700, color: 'var(--color-text-1)', textTransform: 'uppercase', letterSpacing: '-0.5px', margin: 0 }}>Editorial Calendar</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-primary)' }}>
            <button
              onClick={() => {
                if (viewMode === 'compact') {
                  setWeekOffset(Math.max(0, safeWeekOffset - 1))
                } else if (viewMode === 'week') {
                  setSelectedDay(formatDate(addDays(parseDate(selectedDay), -7)))
                } else {
                  setMonthStart(addMonths(monthStart, -1))
                }
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-3)', fontSize: 15, padding: '0 4px' }}
            >‹</button>
            <span>{headerLabel}</span>
            <button
              onClick={() => {
                if (viewMode === 'compact') {
                  setWeekOffset(Math.min(maxWeekOffset, safeWeekOffset + 1))
                } else if (viewMode === 'week') {
                  setSelectedDay(formatDate(addDays(parseDate(selectedDay), 7)))
                } else {
                  setMonthStart(addMonths(monthStart, 1))
                }
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-3)', fontSize: 15, padding: '0 4px' }}
            >›</button>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {VIEW_MODES.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id)}
              style={{
                padding: '5px 10px',
                borderRadius: 6,
                border: '1px solid var(--color-border-dark)',
                background: viewMode === mode.id ? 'var(--color-primary)' : 'transparent',
                color: viewMode === mode.id ? 'var(--color-bg-base)' : 'var(--color-text-3)',
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.08em',
                cursor: 'pointer',
              }}
            >
              {mode.label}
            </button>
          ))}
        </div>
        {/* Legend inline — simplified */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {LEGEND.slice(0, 4).map(({ label, color }) => (
            <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)' }}>
              <span style={{ width: 7, height: 7, borderRadius: 1, background: color, display: 'inline-block', flexShrink: 0 }} />{label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Main body ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Calendar grid — 3 rows only */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Day-of-week headers — sticky */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', borderBottom: '1px solid var(--color-border-dark)', flexShrink: 0, position: 'sticky', top: 0, zIndex: 2 }}>
            {DAYS.map(d => (
              <div key={d} style={{ padding: '7px 10px', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.08em', color: 'var(--color-text-3)', textAlign: 'center', borderRight: '1px solid var(--color-border-dark)', background: 'var(--color-bg-surface)' }}>{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {calendarWeeks.map((week, weekIdx) => (
              <div
                key={weekIdx}
                style={{
                  flex: viewMode === 'week'
                    ? '1 0 auto'
                    : viewMode === 'month'
                      ? `0 0 ${100 / calendarWeeks.length}%`
                      : '0 0 33.33%',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7,1fr)',
                  borderBottom: weekIdx < calendarWeeks.length - 1 ? '1px solid var(--color-border-dark)' : 'none',
                  overflow: 'hidden',
                }}
              >
                {week.map((cell, cellIdx) => {
                  const isMonthView = viewMode === 'month'
                  const isToday    = cell.date === TODAY
                  const isSelected = cell.date === selectedDay
                  const isMuted    = viewMode === 'month' && !cell.isCurrentMonth
                  const rEvts  = REPORT_EVENTS[cell.date] || []
                  const nEvts  = NSO_RELEASES[cell.date]  || []
                  const allEvts = [...rEvts, ...nEvts]
                  const firstEvent = allEvts[0]
                  const moreCount = allEvts.length - 1
                  
                  return (
                    <div
                      key={cellIdx}
                      onClick={() => cell.date && setSelectedDay(cell.date)}
                      style={{
                        padding: isMonthView ? '10px 8px' : '8px 6px',
                        borderRight: cellIdx < 6 ? '1px solid var(--color-border-dark)' : 'none',
                        background: !isSelected
                          ? isMuted ? 'var(--color-bg-surface)' : 'var(--color-bg-base)'
                          : 'rgba(0,212,122,0.05)',
                        cursor: 'pointer',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: isMonthView ? 6 : 4,
                        transition: 'background 140ms',
                        minHeight: isMonthView ? 84 : 'auto',
                        boxShadow: isSelected && isMonthView ? 'inset 0 0 0 1px rgba(0,212,122,0.25)' : 'none',
                      }}
                    >
                      {/* date number + today ring */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: isToday ? 700 : 400,
                          width: isMonthView ? 22 : 24, height: isMonthView ? 22 : 24, borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: isToday ? 'var(--color-primary)' : 'transparent',
                          color: isToday ? '#fff' : isMuted ? 'var(--color-text-4)' : 'var(--color-text-2)',
                        }}>{cell.day}</span>
                        {/* NSO dots — compact */}
                        {nEvts.length > 0 && (
                          <div style={{ display: 'flex', gap: 1 }}>
                            {nEvts.slice(0, 2).map((n, i) => (
                              <span key={i} title={n.label} style={{ width: 4, height: 4, borderRadius: '50%', background: n.color, flexShrink: 0 }} />
                            ))}
                            {nEvts.length > 2 && <span style={{ fontSize: 7, color: 'var(--color-text-4)' }}>+</span>}
                          </div>
                        )}
                      </div>

                      {/* Event chip — show 1 only + count */}
                      {firstEvent && (
                        <div style={{
                          display: 'flex',
                          gap: 2,
                          alignItems: 'center',
                          minHeight: 0,
                          overflow: 'hidden',
                        }}>
                          <span style={{
                            display: 'block', padding: '1px 3px',
                            borderRadius: '0 2px 2px 0',
                            borderLeft: `2px solid ${firstEvent.color}`,
                            fontFamily: 'var(--font-mono)', fontSize: 7,
                            color: firstEvent.color,
                            background: `${firstEvent.color}12`,
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                            flex: 1,
                            minWidth: 0,
                          }}>{firstEvent.label}</span>
                          {moreCount > 0 && (
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--color-text-4)', flexShrink: 0 }}>+{moreCount}</span>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          {/* ── Production Cycle — moved below calendar ── */}
          <div style={{ borderTop: '1px solid var(--color-border-dark)', background: 'var(--color-bg-surface)', flexShrink: 0, padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', marginBottom: 2 }}>PRODUCTION CYCLE</span>
            {CYCLES.map(cycle => (
              <div key={cycle.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: cycle.color, minWidth: 140, flexShrink: 0 }}>{cycle.label}</span>
                <div style={{ flex: 1, display: 'flex', gap: 3 }}>
                  {CYCLE_STAGES.map((stage, i) => {
                    const isActive  = i === cycle.activeStage
                    const isDone    = i < cycle.activeStage
                    return (
                      <div key={stage} style={{
                        flex: 1, padding: '3px 0', borderRadius: 3,
                        background: isDone
                          ? `${cycle.color}30`
                          : isActive
                            ? `${cycle.color}20`
                            : 'var(--color-bg-card)',
                        border: `1px solid ${isActive ? cycle.color : isDone ? `${cycle.color}40` : 'var(--color-border-dark)'}`,
                        textAlign: 'center',
                        fontFamily: 'var(--font-mono)', fontSize: 8,
                        color: isDone ? cycle.color : isActive ? cycle.color : 'var(--color-text-3)',
                        fontWeight: isActive ? 700 : 400,
                        letterSpacing: '0.04em',
                      }}>
                        {isDone ? '✓ ' : ''}{stage}
                      </div>
                    )
                  })}
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)', minWidth: 52, textAlign: 'right', flexShrink: 0 }}>{cycle.daysLeft}d left</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right detail panel ── */}
        <div style={{ width: 240, borderLeft: '1px solid var(--color-border-dark)', background: 'var(--color-bg-card)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>

          {/* Selected day header */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border-dark)', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--font-syne)', fontSize: 12, fontWeight: 700, color: 'var(--color-text-1)' }}>
                {selectedDay ? new Date(selectedDay + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase() : '—'}
              </span>
              {selEvents.length > 0 && (
                <span style={{ background: 'rgba(245,166,35,0.15)', color: '#F5A623', padding: '1px 6px', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700 }}>
                  {selEvents.length}
                </span>
              )}
            </div>
          </div>

          {/* Day events */}
          <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto' }}>
            {selEvents.length === 0 ? (
              <div style={{ padding: '20px 16px', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-4)', textAlign: 'center' }}>NO EVENTS</div>
            ) : (
              <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {/* Report production events */}
                {selReports.length > 0 && (
                  <>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>REPORT EVENTS</p>
                    {selReports.map((e, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, padding: '7px 10px', borderLeft: `2px solid ${e.color}`, background: `${e.color}10`, borderRadius: '0 3px 3px 0' }}>
                        <div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-1)', fontWeight: 500 }}>{e.label}</div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)', marginTop: 2 }}>{e.rpt} · EOD</div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
                {/* NSO / policy releases */}
                {selNSO.length > 0 && (
                  <>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: selReports.length ? 6 : 0, marginBottom: 2 }}>DATA RELEASES</p>
                    {selNSO.map((e, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, padding: '7px 10px', borderLeft: `2px solid ${e.color}`, background: `${e.color}10`, borderRadius: '0 3px 3px 0' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-1)', fontWeight: 500 }}>{e.label}</div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}

            {/* Monthly Edition Status */}
            <div style={{ padding: '10px 12px', borderTop: '1px solid var(--color-border-dark)', marginTop: 4 }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-3)', marginBottom: 10 }}>EDITIONS</p>
              {EDITIONS.map(ed => (
                <div key={ed.id} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: ed.color, fontWeight: 700 }}>{ed.label}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--color-text-3)', marginLeft: 4 }}>{ed.edition}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--color-text-3)' }}>{ed.due}</span>
                  </div>
                  {/* Progress bar */}
                  <div style={{ height: 2, background: 'var(--color-border-dark)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${ed.progress}%`, height: '100%', background: ed.color, borderRadius: 2, transition: 'width 300ms' }} />
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
