/**
 * Route guards for RBAC enforcement.
 */

import { useAuth } from '../context/AuthContext';

export function FeatureGuard({ featureId, fallback = null, children }) {
  const { canAccessFeature } = useAuth();
  return canAccessFeature(featureId) ? children : fallback;
}

export function PermissionGuard({ permission, fallback = null, children }) {
  const { hasPermission } = useAuth();
  return hasPermission(permission) ? children : fallback;
}
