import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core'
import { Store } from '@ngxs/store'
import { UserType } from '../types/user'
import { AuthState } from '../../state/auth/auth.state'

@Directive({
  selector: '[adminFeature]',
  standalone: true,
})
export class HideIfAdminDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store
      .select(AuthState.user)
      .subscribe((user: UserType | undefined) => {
        const isAdmin = Boolean(user && user.role === 'Admin')
        if (isAdmin) {
          this.showComponent()
        } else {
          this.removeComponent()
        }
      })
  }

  removeComponent(): void {
    this.viewContainerRef.clear()
  }

  showComponent(): void {
    this.viewContainerRef.clear()
    this.viewContainerRef.createEmbeddedView(this.templateRef).rootNodes[0]
  }
}
