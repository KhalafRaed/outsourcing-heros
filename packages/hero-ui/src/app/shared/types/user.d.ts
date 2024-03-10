export type UserRole = 'Admin' | 'Hero'

export interface UserType {
  email: string
  userRole: UserRole
  powerName?: string
}
