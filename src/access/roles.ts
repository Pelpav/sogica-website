import type { Access, FieldAccess, Where } from 'payload'

export type UserRole = 'super-admin' | 'admin' | 'editor' | 'owner' | 'portfolio-manager'

const STAFF_ROLES: UserRole[] = ['super-admin', 'admin', 'editor', 'portfolio-manager']
const CONTENT_ROLES: UserRole[] = ['super-admin', 'admin', 'editor', 'owner', 'portfolio-manager']
const OWNER_OR_ADMIN_ROLES: UserRole[] = ['super-admin', 'admin', 'owner']

function hasRole(req: { user?: { role?: string | null } | null }, roles: UserRole[]) {
  return roles.includes(req.user?.role as UserRole)
}

export const isSuperAdmin: Access = ({ req }) => req.user?.role === 'super-admin'
export const isAdmin: Access = ({ req }) =>
  req.user?.role === 'super-admin' || req.user?.role === 'admin'
export const isOwner: Access = ({ req }) => req.user?.role === 'owner'
export const isOwnerOrAdmin: Access = ({ req }) => hasRole(req, OWNER_OR_ADMIN_ROLES)
export const isStaffOnly: Access = ({ req }) => hasRole(req, STAFF_ROLES)
export const isEditor: Access = ({ req }) => hasRole(req, ['super-admin', 'admin', 'editor'])
export const isContentEditor: Access = ({ req }) => hasRole(req, CONTENT_ROLES)
export const isPortfolioManager: Access = ({ req }) => hasRole(req, CONTENT_ROLES)
export const isAuthenticated: Access = ({ req }) => Boolean(req.user)

export const isAdminFieldLevel: FieldAccess = ({ req }) =>
  req.user?.role === 'super-admin' || req.user?.role === 'admin'

export const isSuperAdminFieldLevel: FieldAccess = ({ req }) =>
  req.user?.role === 'super-admin'

export const isStaffFieldLevel: FieldAccess = ({ req }) => hasRole(req, STAFF_ROLES)

export const isAuthenticatedFieldLevel: FieldAccess = ({ req }) => Boolean(req.user)

/** Masque les champs techniques pour le rôle propriétaire. */
export const hideFromOwnerField: FieldAccess = ({ req }) => req.user?.role !== 'owner'

export const publishedOnly: Access = ({ req }) => {
  if (req.user) return true
  const where: Where = {
    _status: { equals: 'published' },
  }
  return where
}

export const publicRead: Access = () => true

export const authenticatedCreate: Access = ({ req }) => Boolean(req.user)

export const canManageUsers: Access = isSuperAdmin
export const canManageThemeCSS: FieldAccess = isSuperAdminFieldLevel

export const ownerReadOnly: Access = ({ req }) => {
  if (req.user?.role === 'owner') return false
  return true
}

export const ownerCannotDelete: Access = ({ req }) => req.user?.role !== 'owner'
