import { State, Action, StateContext, Selector } from '@ngxs/store'
import {
  Login,
  AuthFailure,
  Logout,
  Register,
  UpdateUser,
} from './auth.actions'
import { Injectable } from '@angular/core'
import { AuthService } from '../../shared/services/auth.service'
import { catchError, tap } from 'rxjs/operators'
import { throwError } from 'rxjs'
import { UserType } from '../../shared/types/user'
import { Router } from '@angular/router'
import { AuthStateModel } from '../../shared/types/state'

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    loggedIn: false,
    loading: false,
  },
})
@Injectable()
export class AuthState {
  @Selector()
  static isLoggedIn(state: AuthStateModel) {
    return state.loggedIn
  }

  @Selector()
  static user(state: AuthStateModel) {
    return state.user
  }

  @Selector()
  static isLoading(state: AuthStateModel) {
    return state.loading
  }

  @Selector()
  static isError(state: AuthStateModel) {
    return state.error
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  @Action(Register)
  register(ctx: StateContext<any>, action: Register) {
    ctx.patchState({
      loading: true,
      error: null,
    })
    return this.authService.register(action.payload).pipe(
      tap((result) => {
        ctx.patchState({ loggedIn: true, user: result })
        this.router.navigateByUrl('/home')
      }),
      catchError((error) => {
        ctx.dispatch(new AuthFailure(error.error))
        return throwError(error)
      })
    )
  }

  @Action(Login)
  login(ctx: StateContext<any>, action: Login) {
    ctx.patchState({
      loading: true,
      error: null,
    })

    return this.authService.login(action.payload).pipe(
      tap((result) => {
        ctx.patchState({ loggedIn: true, user: result })
        this.router.navigateByUrl('/')
      }),
      catchError((error) => {
        ctx.dispatch(new AuthFailure(error.error))
        return throwError(error)
      })
    )
  }

  @Action(UpdateUser)
  updateUser(ctx: StateContext<AuthStateModel>, action: UpdateUser) {
    ctx.patchState({
      user: action.user,
    })
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      loading: true,
      error: undefined,
    })

    return this.authService.logout().pipe(
      tap((result) => {
        ctx.patchState({ loggedIn: false, user: undefined })
        this.router.navigateByUrl('/auth/login')
      }),
      catchError((error) => {
        ctx.dispatch(new AuthFailure(error.error))
        return throwError(error)
      })
    )
  }

  @Action(AuthFailure)
  loginFailure(ctx: StateContext<any>, action: AuthFailure) {
    ctx.patchState({
      loading: false,
      error: action.error,
    })
  }
}
