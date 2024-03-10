import { Injectable } from '@angular/core'
import { Store } from '@ngxs/store'
import { Login, Logout } from '../../state/auth/auth.actions'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private store: Store) {}

  login(password: string, email: string) {
    console.log(password, email)
    this.store.dispatch(new Login())
  }

  register(email: string, password: string, powerName: string) {
    console.log(password, email)
    this.store.dispatch(new Login())
  }

  logout() {
    this.store.dispatch(new Logout())
  }
}
