import { UserType } from './user'

export interface AuthStateModel {
  loggedIn: boolean
  loading: boolean
  error?: string
  user?: UserType
}

export interface HeroesStateModel {
  heroes: UserType[]
  loading: boolean
  error: string | undefined
}
