/**
 * Explaination page (access guide) for locked features.
 */

import { RBAC_CONFIG } from '../config/rbac.config';
import { useAuth } from '../context/AuthContext';

function roleHasPermission(role, permission) {
  if (!role) return false;
  if (role.permissions.includes('*')) return true;
  return role.permissions.some((p) => {
    if (p === permission) return true;
    if (p.endsWith(':*')) {
      const prefix = p.slice(0, -1);
      return permission.startsWith(prefix);
    }
    return false;
  });
}

export default function ExplanationPage({ featureId }) {
  const { user, getRoleInfo } = useAuth();
  const feature = featureId ? RBAC_CONFIG.features[featureId] : null;
  const roleInfo = getRoleInfo();
  const requiredPermissions = feature?.permissions || [];

  const rolesWithAccess = Object.entries(RBAC_CONFIG.roles)
    .filter(([, role]) => requiredPermissions.every((perm) => roleHasPermission(role, perm)))
    .map(([id, role]) => ({ id, ...role }));

  return (
    <div style={{ flex: 1, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--color-bg-base)', padding: '0 32px' }}>
      <div style={{ width: '100%', maxWidth: 640, background: 'var(--color-bg-card)', border: '1px solid var(--color-border-dark)', borderRadius: 10, padding: '28px 30px', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border-bright)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-text-3)' }}>lock</span>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Access Guide</div>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-syne)', fontSize: 22, color: 'var(--color-text-1)' }}>
              {feature ? `${feature.name} is locked for your role` : 'This area requires additional access'}
            </h2>
          </div>
        </div>

        <p style={{ margin: '0 0 18px', fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--color-text-2)', lineHeight: 1.6 }}>
          {feature
            ? feature.description
            : 'Your current role does not include permissions for this view. Contact an administrator to request access.'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
          <div style={{ border: '1px solid var(--color-border-dark)', borderRadius: 8, padding: 14 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
              Current Role
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: roleInfo?.color || 'var(--color-text-1)' }}>
              {roleInfo?.displayName || user?.role || 'Unknown'}
            </div>
            <div style={{ fontSize: 11, color: 'var(--color-text-3)', marginTop: 4 }}>
              {roleInfo?.description || 'No role description available'}
            </div>
          </div>

          <div style={{ border: '1px solid var(--color-border-dark)', borderRadius: 8, padding: 14 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
              Required Permissions
            </div>
            {requiredPermissions.length ? (
              requiredPermissions.map((perm) => (
                <div key={perm} style={{ fontSize: 11, color: 'var(--color-text-2)', marginBottom: 4 }}>
                  {perm}
                </div>
              ))
            ) : (
              <div style={{ fontSize: 11, color: 'var(--color-text-3)' }}>Not specified</div>
            )}
          </div>
        </div>

        <div style={{ border: '1px solid var(--color-border-dark)', borderRadius: 8, padding: 14, marginBottom: 18 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-text-3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
            Roles With Access
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 8 }}>
            {rolesWithAccess.length ? rolesWithAccess.map((role) => (
              <div key={role.id} style={{ border: '1px solid var(--color-border-dark)', borderRadius: 6, padding: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: role.color || 'var(--color-text-1)' }}>
                  {role.displayName}
                </div>
                <div style={{ fontSize: 10, color: 'var(--color-text-3)', marginTop: 4 }}>
                  {role.description}
                </div>
              </div>
            )) : (
              <div style={{ fontSize: 11, color: 'var(--color-text-3)' }}>No roles available</div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ padding: '8px 16px', background: 'var(--color-primary)', border: 'none', borderRadius: 6, color: 'var(--color-bg-base)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
            Request Access
          </button>
          <button style={{ padding: '8px 16px', background: 'transparent', border: '1px solid var(--color-border-bright)', borderRadius: 6, color: 'var(--color-text-2)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
            View Role Matrix
          </button>
        </div>
      </div>
    </div>
  );
}
