import { useMemo, useState } from 'react'
import { RBAC_CONFIG } from '../config/rbac.config'
import { useAuth } from '../context/AuthContext'

const NAV = [
  { id: 'dashboard',  featureId: 'dashboard',  icon: 'account_tree',   label: 'Pipeline',  badge: '2' },
  { id: 'ai_modules', featureId: 'ai_modules', icon: 'smart_toy',       label: 'AI Engine', badge: null },
  { id: 'templates',  featureId: 'templates',  icon: 'description',    label: 'Templates', badge: null },
  { id: 'knowledge',  featureId: 'knowledge',  icon: 'manage_search',  label: 'Knowledge', badge: null },
  { id: 'calendar',   featureId: 'calendar',   icon: 'calendar_month', label: 'Calendar',  badge: '3' },
]

const MODULES = [
  { label: 'Data-CoT',    color: '#00D47A', status: 'online',  statusText: 'Ingesting' },
  { label: 'Concept-CoT', color: '#F5A623', status: 'active',  statusText: 'Running'  },
  { label: 'Thesis-CoT',  color: '#505550', status: 'idle',    statusText: 'Idle'     },
  { label: 'Compliance',  color: '#505550', status: 'idle',    statusText: 'Idle'     },
]

const S = {
  aside:  { width: 200, minWidth: 200, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: 0, paddingBottom: 24, background: 'var(--color-bg-base)', borderRight: '1px solid var(--color-border-dark)' },
  top:    { display: 'flex', flexDirection: 'column', gap: 20 },
  logo:   { display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 5, padding: '20px 20px 16px', borderBottom: '1px solid var(--color-border-dark)' },
  nav:    { display: 'flex', flexDirection: 'column' },
  mods:   { padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 8 },
  modHdr: { fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-4)', marginBottom: 4 },
  modRow: { display: 'flex', alignItems: 'center', gap: 8 },
  modTxt: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-3)' },
  bot:    { padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 16 },
  newBtn: { width: '100%', padding: '8px 0', background: 'var(--color-primary)', border: 'none', borderRadius: 4, color: 'var(--color-bg-base)', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer' },
  avatar: { display: 'flex', alignItems: 'center', gap: 10 },
  avCir:  { width: 28, height: 28, borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--color-bg-base)' },
}

export default function Sidebar({ page, onNavigate }) {
  const [hovered, setHovered] = useState(null)
  const { user, canAccessFeature, getRoleInfo, logout } = useAuth()
  const roleInfo = getRoleInfo()
  const roleLabel = roleInfo?.displayName || user?.role || 'Guest'
  const roleColor = roleInfo?.color || 'var(--color-text-2)'

  const navWithAccess = useMemo(() => {
    return NAV.map((item) => {
      const feature = RBAC_CONFIG.features[item.featureId]
      const hasAccess = canAccessFeature(item.featureId)
      const isFeatureLocked = feature?.locked || false
      return { ...item, hasAccess, isFeatureLocked }
    })
  }, [canAccessFeature])

  return (
    <aside style={S.aside}>
      <div style={S.top}>
        {/* Logo */}
        <div style={S.logo}>
          <svg xmlns="http://www.w3.org/2000/svg" width="89" height="30" fill="none" viewBox="0 0 89 30" style={{ height: 24, width: 'auto', color: 'var(--color-text-1)', display: 'block' }}>
            <mask id="mask0_723_7921" width="89" height="30" x="0" y="0" maskUnits="userSpaceOnUse" style={{ maskType: 'luminance' }}><path fill="#fff" d="M89 .805H0v28.391h89z" /></mask>
            <g mask="url(#mask0_723_7921)">
              <path fill="currentColor" d="M50.888 1.48h-5.671l-9.52 10.994V1.48H31.35v26.541h4.348v-11.08l9.883 11.08h5.786L39.53 14.754z" />
              <path fill="currentColor" d="M64.194 11.302a5.9 5.9 0 0 0-2.02-1.811 7.4 7.4 0 0 0-3.564-.881 9 9 0 0 0-3.397.651 8.2 8.2 0 0 0-2.82 1.91 8.9 8.9 0 0 0-1.889 3.037c-.45 1.184-.68 2.554-.68 4.073v.578c0 1.54.23 2.921.68 4.103A8.8 8.8 0 0 0 52.393 26a8 8 0 0 0 2.824 1.887 9.4 9.4 0 0 0 3.456.63 7 7 0 0 0 3.472-.927 6.1 6.1 0 0 0 2.047-1.918v2.342h3.84V9.119h-3.837zm0 7.483a7.5 7.5 0 0 1-.399 2.508A6 6 0 0 1 62.71 23.2a4.7 4.7 0 0 1-1.638 1.196 5.15 5.15 0 0 1-2.112.425c-1.537 0-2.803-.52-3.764-1.543-.974-1.048-1.469-2.534-1.469-4.419v-.577a7.4 7.4 0 0 1 .41-2.477 5.5 5.5 0 0 1 1.093-1.87 4.9 4.9 0 0 1 1.64-1.19 5 5 0 0 1 2.09-.423 4.89 4.89 0 0 1 3.729 1.667c.485.553.86 1.195 1.102 1.89.272.798.407 1.636.398 2.479z" />
              <path fill="currentColor" d="M77.73 9.123V6.689c0-.523.169-.56.45-.56h2.906V2.495h-3.911c-.959 0-1.756.321-2.365.953q-.917.945-.919 2.377v3.297h-3.93v3.631h3.93v15.268h3.84V12.754h6.335v15.268h3.84v-18.9H77.729" />
              <path fill="currentColor" d="M85.944 7.115a2.46 2.46 0 0 0 1.798-.747 2.47 2.47 0 0 0 .745-1.802 2.48 2.48 0 0 0-.745-1.804 2.46 2.46 0 0 0-1.798-.746 2.45 2.45 0 0 0-1.798.746 2.46 2.46 0 0 0-.745 1.804 2.47 2.47 0 0 0 .745 1.802 2.46 2.46 0 0 0 1.798.747" />
              <path fill="url(#paint0_linear_723_7921)" d="M23.81 28.52h-6.548a1.37 1.37 0 0 1-1.134-.603L0 3.967v-1.3A1.187 1.187 0 0 1 1.184 1.48h5.062a1.37 1.37 0 0 1 1.134.604l17.033 25.29a.731.731 0 0 1-.604 1.146" />
              <path fill="url(#paint1_linear_723_7921)" d="M6.244 1.48h-5.06C.53 1.48 0 2.012 0 2.667v24.661c0 .655.53 1.186 1.184 1.186h5.06c.654 0 1.185-.53 1.185-1.186V2.667c0-.655-.53-1.187-1.185-1.187" />
              <path fill="url(#paint2_linear_723_7921)" d="M24.413 2.618 7.373 27.911a1.37 1.37 0 0 1-1.133.603H1.184A1.184 1.184 0 0 1 0 27.328v-1.305l16.123-23.94a1.37 1.37 0 0 1 1.133-.603h6.552a.727.727 0 0 1 .605 1.138" />
            </g>
            <defs>
              <linearGradient id="paint0_linear_723_7921" x1="20.555" x2="3.444" y1="28.651" y2="2.13" gradientUnits="userSpaceOnUse"><stop offset="0.15" stopColor="#0C6070" /><stop offset="0.51" stopColor="#096B6E" /><stop offset="0.99" stopColor="#07756D" /></linearGradient>
              <linearGradient id="paint1_linear_723_7921" x1="3.715" x2="3.715" y1="1.617" y2="27.733" gradientUnits="userSpaceOnUse"><stop offset="0.14" stopColor="#07756D" /><stop offset="0.35" stopColor="#058977" /><stop offset="0.76" stopColor="#01BB8F" /><stop offset="0.85" stopColor="#00C795" /></linearGradient>
              <linearGradient id="paint2_linear_723_7921" x1="3.14" x2="20.393" y1="28.148" y2="1.912" gradientUnits="userSpaceOnUse"><stop stopColor="#00C795" /><stop offset="0.19" stopColor="#02CB94" /><stop offset="0.39" stopColor="#09D892" /><stop offset="0.59" stopColor="#13EC8F" /><stop offset="0.66" stopColor="#18F58E" /></linearGradient>
            </defs>
          </svg>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--color-text-3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Intelligence Studio</span>
        </div>

        {/* Nav */}
        <nav style={S.nav}>
          {navWithAccess.map(({ id, icon, label, badge, hasAccess, isFeatureLocked, featureId }) => {
            const active = page === id
            const isHovered = hovered === id
            const isLocked = !hasAccess || isFeatureLocked
            return (
              <button
                key={id}
                onClick={() => {
                  if (isLocked) {
                    onNavigate('access', { featureId })
                  } else {
                    onNavigate(id, { featureId })
                  }
                }}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px', fontSize: 12, fontFamily: 'var(--font-sans)', fontWeight: active ? 600 : 400, border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 120ms ease', width: '100%', borderLeft: active ? '2px solid var(--color-primary)' : '2px solid transparent', background: active ? 'rgba(0,212,122,0.09)' : isHovered && !isLocked ? 'rgba(0,212,122,0.04)' : isHovered && isLocked ? 'rgba(255,255,255,0.02)' : 'transparent', color: active ? 'var(--color-primary)' : isLocked ? 'var(--color-text-4)' : isHovered ? 'var(--color-text-1)' : 'var(--color-text-2)', position: 'relative' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18, lineHeight: 1, opacity: isLocked ? 0.35 : 1 }}>{icon}</span>
                <span style={{ flex: 1, opacity: isLocked ? 0.45 : 1 }}>{label}</span>
                {isLocked ? (
                  <span className="material-symbols-outlined" style={{ fontSize: 12, color: 'var(--color-text-4)', opacity: 0.6 }}>lock</span>
                ) : badge ? (
                  <span style={{ background: active ? 'var(--color-primary)' : 'rgba(62,91,114,0.5)', color: active ? '#fff' : 'var(--color-text-3)', borderRadius: 10, fontFamily: 'var(--font-mono)', fontSize: 9, padding: '1px 6px', lineHeight: 1.4 }}>{badge}</span>
                ) : null}
              </button>
            )
          })}
        </nav>

        {/* AI Modules */}
        <div style={S.mods}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <p style={{ ...S.modHdr, marginBottom: 0 }}>AI MODULES</p>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#00D47A', display: 'flex', alignItems: 'center', gap: 3 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#00D47A', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              LIVE
            </span>
          </div>
          {MODULES.map(({ label, color, status, statusText }) => (
            <div key={label} style={{ ...S.modRow, justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0, boxShadow: status === 'active' || status === 'online' ? `0 0 5px ${color}` : 'none' }} />
                <span style={S.modTxt}>{label}</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: status === 'idle' ? 'var(--color-text-4)' : color }}>{statusText}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div style={S.bot}>
          <div style={{ padding: '6px 0', borderTop: '1px solid var(--color-border-dark)', borderBottom: '1px solid var(--color-border-dark)', marginBottom: 4 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--color-text-4)', textAlign: 'center', letterSpacing: '0.08em' }}>v0.1.0-alpha · Feb 26 2026</div>
        </div>
        <button style={S.newBtn}
          onMouseEnter={e => e.currentTarget.style.background = '#00B86C'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--color-primary)'}
        >+ NEW REPORT</button>
        <div style={S.avatar}>
          <div style={S.avCir}>{(user?.name || 'U').slice(0, 2).toUpperCase()}</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-1)' }}>{user?.name || 'Guest User'}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: roleColor }}>{roleLabel}</span>
          </div>
          <button
            onClick={logout}
            style={{ marginLeft: 'auto', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            aria-label="Logout"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--color-text-4)' }}>logout</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
