export type UserRole = 'Admin' | 'Hero'

export interface UserType {
  email: string
  role?: UserRole
  powerName?: string
  rating?: number
}
