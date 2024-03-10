import { Injectable } from '@angular/core'
import { Store } from '@ngxs/store'
import { Login, Logout } from '../../state/auth/auth.actions'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private store: Store,
    private http: HttpClient
  ) {}

  login(credentials: { password: string; email: string }) {
    return this.http.post('/login', credentials)
  }

  register(payload: { email: string; password: string; powerName: string }) {
    return this.http.post('/register', payload)
  }

  logout() {
    return this.http.post('/logout', {})
  }
}
