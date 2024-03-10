// auth.guard.ts
import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { Store, Select } from '@ngxs/store'
import { map, Observable, of } from 'rxjs'
import { AuthState } from '../../state/auth/auth.state'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class RedirectIfLoggedInGuard implements CanActivate {
  // @ts-ignore
  @Select(AuthState.isLoggedIn) isLoggedIn$: Observable<boolean>

  constructor(
    private store: Store,
    private router: Router,
    private http: HttpClient
  ) {}

  canActivate(): Observable<boolean> {
    return this.http.get('/check-auth').pipe(
      tap((response: any) => {
        this.router.navigateByUrl('/home')
      }),
      catchError((error: any) => {
        return of(true)
      })
    )
  }
}
