/**
 * Authentication and RBAC context.
 */

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { RBAC_CONFIG, getRoleConfig } from '../config/rbac.config';

const AuthContext = createContext(null);

function createMockUser(roleId) {
  const role = getRoleConfig(roleId) || getRoleConfig('analyst');
  return {
    id: 'user-demo',
    name: 'Hai Tran',
    email: 'hai.tran@kafi.local',
    role: roleId || 'analyst',
    permissions: role?.permissions || [],
  };
}

export function AuthProvider({ children, mockMode = true }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const initialize = useCallback(() => {
    const stored = localStorage.getItem(RBAC_CONFIG.session.storageKey);
    if (stored) {
      try {
        const session = JSON.parse(stored);
        if (session.expiresAt > Date.now()) {
          setUser(session.user);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Failed to parse auth session:', err);
      }
    }

    if (mockMode) {
      const demoUser = createMockUser('analyst');
      const session = {
        user: demoUser,
        expiresAt: Date.now() + RBAC_CONFIG.session.tokenExpiryMs,
      };
      localStorage.setItem(RBAC_CONFIG.session.storageKey, JSON.stringify(session));
      setUser(demoUser);
    }

    setLoading(false);
  }, [mockMode]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const logout = useCallback(() => {
    localStorage.removeItem(RBAC_CONFIG.session.storageKey);
    setUser(null);
  }, []);

  const hasPermission = useCallback(
    (permission) => {
      if (!user) return false;
      if (user.permissions.includes('*')) return true;

      return user.permissions.some((p) => {
        if (p === permission) return true;
        if (p.endsWith(':*')) {
          const prefix = p.slice(0, -1);
          return permission.startsWith(prefix);
        }
        return false;
      });
    },
    [user]
  );

  const hasAnyPermission = useCallback(
    (permissions) => permissions.some((permission) => hasPermission(permission)),
    [hasPermission]
  );

  const canAccessFeature = useCallback(
    (featureId) => {
      const feature = RBAC_CONFIG.features[featureId];
      if (!feature) return false;
      return hasAnyPermission(feature.permissions);
    },
    [hasAnyPermission]
  );

  const getRoleInfo = useCallback(() => {
    if (!user) return null;
    return getRoleConfig(user.role);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        hasPermission,
        canAccessFeature,
        getRoleInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
