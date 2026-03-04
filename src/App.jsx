import { useCallback, useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import TemplateGallery from './components/TemplateGallery'
import KnowledgeBase from './components/KnowledgeBase'
import Calendar from './components/Calendar'
import AIModules from './components/AIModules'
import ExplanationPage from './components/ExplanationPage'
import { AuthProvider } from './context/AuthContext'
import { FeatureGuard } from './components/RouteGuard'

const LOCKED_META = {
  templates: {
    icon: 'description',
    name: 'Template Gallery',
    phase: 'UI Design',
    eta: 'Q2 2026',
    desc: 'Browse and fork report templates pre-wired to AI agent chains. Drag-and-drop section builder with live CoT preview.',
    features: ['Section drag-and-drop builder', 'Agent chain configuration', 'Live CoT step preview', 'Template versioning & sharing'],
  },
  knowledge: {
    icon: 'manage_search',
    name: 'Knowledge Base',
    phase: 'Architecture',
    eta: 'Q2 2026',
    desc: 'Semantic search across all published reports, data sources, and analyst notes. Powered by vector embeddings with citation tracing.',
    features: ['Semantic full-text search', 'Cross-report citation graph', 'Data source lineage viewer', 'Auto-tag taxonomy'],
  },
}

function LockedPage({ id }) {
  const m = LOCKED_META[id]
  const PHASE_COLOR = { 'UI Design': '#B08EF5', 'Architecture': '#4DAAFF', 'Development': '#F5A623', 'QA': '#00C8A0' }
  const pColor = PHASE_COLOR[m.phase] || '#92B5A0'

  return (
    <div style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg-base)', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle dot grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(0,212,122,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
      {/* Radial vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, var(--color-bg-base) 100%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, maxWidth: 520, padding: '0 32px' }}>

        {/* Lock glyph */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: 20, background: 'var(--color-bg-card)', border: '1px solid var(--color-border-bright)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(0,212,122,0.06)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 36, color: 'var(--color-text-3)' }}>{m.icon}</span>
          </div>
          <div style={{ position: 'absolute', bottom: -8, right: -8, width: 26, height: 26, borderRadius: 8, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border-bright)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-text-3)' }}>lock</span>
          </div>
        </div>

        {/* Title block */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: pColor, background: `${pColor}18`, border: `1px solid ${pColor}40`, borderRadius: 3, padding: '3px 8px' }}>{m.phase}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-3)' }}>ETA {m.eta}</span>
          </div>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-syne)', fontSize: 26, fontWeight: 700, color: 'var(--color-text-1)', letterSpacing: '-0.5px' }}>{m.name}</h2>
          <p style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--color-text-2)', lineHeight: 1.6, maxWidth: 400 }}>{m.desc}</p>
        </div>

        {/* Feature checklist */}
        <div style={{ width: '100%', background: 'var(--color-bg-card)', border: '1px solid var(--color-border-dark)', borderRadius: 8, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-3)' }}>Planned Features</span>
          {m.features.map(f => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-text-3)' }}>radio_button_unchecked</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--color-text-2)' }}>{f}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button style={{ padding: '8px 18px', background: 'transparent', border: '1px solid var(--color-border-bright)', borderRadius: 4, color: 'var(--color-text-2)', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', cursor: 'pointer', textTransform: 'uppercase' }}>Request Early Access</button>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-3)' }}>·</span>
          <button style={{ background: 'none', border: 'none', padding: 0, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-3)', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3 }}>View Roadmap</button>
        </div>
      </div>
    </div>
  )
}

function AppContent() {
  const [page, setPage] = useState('dashboard')
  const [accessMeta, setAccessMeta] = useState({ featureId: null })

  const handleNavigate = useCallback((nextPage, meta = {}) => {
    setPage(nextPage)
    setAccessMeta({ featureId: meta.featureId || null })
  }, [])

  const views = {
    dashboard: <Dashboard />,
    templates: (
      <FeatureGuard
        featureId="templates"
        fallback={<ExplanationPage featureId="templates" />}
      >
        <TemplateGallery />
      </FeatureGuard>
    ),
    knowledge: (
      <FeatureGuard
        featureId="knowledge"
        fallback={<ExplanationPage featureId="knowledge" />}
      >
        <KnowledgeBase />
      </FeatureGuard>
    ),
    calendar: (
      <FeatureGuard
        featureId="calendar"
        fallback={<ExplanationPage featureId="calendar" />}
      >
        <Calendar />
      </FeatureGuard>
    ),
    ai_modules: (
      <FeatureGuard
        featureId="ai_modules"
        fallback={<ExplanationPage featureId="ai_modules" />}
      >
        <AIModules />
      </FeatureGuard>
    ),
    access: <ExplanationPage featureId={accessMeta.featureId} />,
  }

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Sidebar page={page} onNavigate={handleNavigate} />
      {views[page] || views.dashboard}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider mockMode>
      <AppContent />
    </AuthProvider>
  )
}
