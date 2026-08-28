import type { Access, FieldAccess, Where } from 'payload'

export type UserRole = 'super-admin' | 'admin' | 'editor' | 'portfolio-manager'

export const isSuperAdmin: Access = ({ req }) => req.user?.role === 'super-admin'
export const isAdmin: Access = ({ req }) =>
  req.user?.role === 'super-admin' || req.user?.role === 'admin'
export const isEditor: Access = ({ req }) =>
  ['super-admin', 'admin', 'editor'].includes(req.user?.role as string)
export const isPortfolioManager: Access = ({ req }) =>
  ['super-admin', 'admin', 'portfolio-manager'].includes(req.user?.role as string)
export const isAuthenticated: Access = ({ req }) => Boolean(req.user)

export const isAdminFieldLevel: FieldAccess = ({ req }) =>
  req.user?.role === 'super-admin' || req.user?.role === 'admin'

export const isSuperAdminFieldLevel: FieldAccess = ({ req }) =>
  req.user?.role === 'super-admin'

export const isAuthenticatedFieldLevel: FieldAccess = ({ req }) => Boolean(req.user)

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
