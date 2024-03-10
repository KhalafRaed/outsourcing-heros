// auth.guard.ts
import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { Store, Select } from '@ngxs/store'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { AuthState } from '../../state/auth/auth.state'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  // @ts-ignore
  @Select(AuthState.isLoggedIn) isLoggedIn$: Observable<boolean>

  constructor(
    private store: Store,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.isLoggedIn$.pipe(
      tap((loggedIn) => {
        if (!loggedIn) {
          this.router.navigate(['/auth/login'])
        }
      })
    )
  }
}
