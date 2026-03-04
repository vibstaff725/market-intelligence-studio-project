/**
 * RBAC configuration for Market Intelligence Studio.
 */

export const RBAC_CONFIG = {
  roles: {
    admin: {
      displayName: 'Administrator',
      description: 'Full system access and administration',
      color: '#FF6B6B',
      permissions: ['*'],
    },
    analyst: {
      displayName: 'Analyst',
      description: 'Core analysis workflow with export capabilities',
      color: '#4DAAFF',
      permissions: [
        'dashboard:read',
        'dashboard:manage',
        'templates:read',
        'knowledge:read',
        'knowledge:create',
        'calendar:read',
        'calendar:manage',
        'data:export',
        'data:share',
        'ai_modules:configure',
      ],
    },
    editor: {
      displayName: 'Editor',
      description: 'Content creation and maintenance',
      color: '#B08EF5',
      permissions: [
        'dashboard:read',
        'templates:read',
        'templates:edit',
        'knowledge:read',
        'knowledge:create',
        'knowledge:edit',
        'calendar:read',
      ],
    },
    viewer: {
      displayName: 'Viewer',
      description: 'Read-only access to published content',
      color: '#92B5A0',
      permissions: [
        'dashboard:read',
        'templates:read',
        'knowledge:read',
        'calendar:read',
      ],
    },
    guest: {
      displayName: 'Guest',
      description: 'Limited onboarding and demo access',
      color: '#505550',
      permissions: ['dashboard:read'],
    },
  },

  features: {
    dashboard: {
      id: 'dashboard',
      name: 'Pipeline Dashboard',
      icon: 'account_tree',
      permissions: ['dashboard:read'],
      locked: false,
    },
    ai_modules: {
      id: 'ai_modules',
      name: 'AI Engine',
      icon: 'smart_toy',
      permissions: ['ai_modules:configure'],
      locked: false,
    },
    templates: {
      id: 'templates',
      name: 'Template Gallery',
      icon: 'description',
      permissions: ['templates:read'],
      locked: true,
      phase: 'UI Design',
      eta: 'Q2 2026',
      description: 'Browse and fork report templates with drag-and-drop section builder.',
    },
    knowledge: {
      id: 'knowledge',
      name: 'Knowledge Base',
      icon: 'manage_search',
      permissions: ['knowledge:read'],
      locked: true,
      phase: 'Architecture',
      eta: 'Q2 2026',
      description: 'Semantic search across all published reports and data sources.',
    },
    calendar: {
      id: 'calendar',
      name: 'Calendar',
      icon: 'calendar_month',
      permissions: ['calendar:read'],
      locked: false,
    },
  },

  session: {
    storageKey: 'auth_session',
    tokenExpiryMs: 24 * 60 * 60 * 1000,
  },
};

export function getRoleConfig(roleId) {
  return RBAC_CONFIG.roles[roleId] || null;
}

export function getFeatureConfig(featureId) {
  return RBAC_CONFIG.features[featureId] || null;
}
