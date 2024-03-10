// auth.guard.ts
import { Injectable, NgZone } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { EMPTY, Observable, of } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { Store } from '@ngxs/store'
import { UpdateUser } from '../../state/auth/auth.actions'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private http: HttpClient,
    private ngZone: NgZone,
    private store: Store
  ) {}

  canActivate(): Observable<boolean> {
    return this.http.get('/user').pipe(
      tap((response: any) => {
        this.store.dispatch(new UpdateUser(response))
        return of(true)
      }),
      catchError((error: any) => {
        this.ngZone.run(() => {
          void this.router.createUrlTree(['auth/login'])
        })
        return EMPTY
      })
    )
  }
}
