import { State, Action, StateContext, Selector } from '@ngxs/store'
import { Login, Logout } from './auth.actions'
import { Injectable } from '@angular/core'

export interface AuthStateModel {
  loggedIn: boolean
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    loggedIn: false,
  },
})
@Injectable()
export class AuthState {
  @Selector()
  static isLoggedIn(state: AuthStateModel) {
    return state.loggedIn
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ loggedIn: true })
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ loggedIn: false })
  }
}
