// auth.guard.ts
import { Injectable, NgZone } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { Observable, of } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { Store } from '@ngxs/store'
import { updateItem } from '@ngxs/store/operators'
import { UpdateUser } from '../../state/auth/auth.actions'

@Injectable({
  providedIn: 'root',
})
export class RedirectIfLoggedInGuard implements CanActivate {
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
        this.ngZone.run(() => {
          void this.router.createUrlTree(['home'])
        })
        return of(false)
      }),
      catchError((error: any) => {
        return of(true)
      })
    )
  }
}
