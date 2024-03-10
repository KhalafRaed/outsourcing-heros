// auth.guard.ts
import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { Observable, of, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { AuthState } from '../../state/auth/auth.state'
import { HttpClient } from '@angular/common/http'
import { AuthFailure } from '../../state/auth/auth.actions'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  canActivate(): Observable<boolean> {
    return this.http.get('/check-auth').pipe(
      tap((response: any) => {
        return of(true)
      }),
      catchError((error: any) => {
        return this.router.navigateByUrl('/auth/login')
      })
    )
  }
}
