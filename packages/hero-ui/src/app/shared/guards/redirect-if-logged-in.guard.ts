// auth.guard.ts
import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { Store, Select } from '@ngxs/store'
import { map, Observable } from 'rxjs'
import { AuthState } from '../../state/auth/auth.state'

@Injectable({
  providedIn: 'root',
})
export class RedirectIfLoggedInGuard implements CanActivate {
  // @ts-ignore
  @Select(AuthState.isLoggedIn) isLoggedIn$: Observable<boolean>

  constructor(
    private store: Store,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.isLoggedIn$.pipe(
      map((loggedIn) => {
        if (loggedIn) {
          this.router.navigate(['home'])
          return false
        }
        return true
      })
    )
  }
}
