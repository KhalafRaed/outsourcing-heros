import { Component } from '@angular/core'
import { Select, Store } from '@ngxs/store'
import { Logout } from '../../state/auth/auth.actions'
import { AuthState } from '../../state/auth/auth.state'
import { Observable } from 'rxjs'
import { HideIfAdminDirective } from '../../shared/directives/admin-feature.directive'

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [HideIfAdminDirective],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  constructor(private store: Store) {}

  onLogout() {
    this.store.dispatch(new Logout())
  }
}
