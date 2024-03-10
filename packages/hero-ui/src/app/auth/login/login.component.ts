import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { AuthService } from '../../shared/services/auth.service'
import { Router, RouterModule } from '@angular/router'
import { Select, Store } from '@ngxs/store'
import { Login } from '../../state/auth/auth.actions'
import { AuthState } from '../../state/auth/auth.state'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  errorMessage: string = ''
  loading: boolean = false

  // @ts-ignore
  loginForm: FormGroup
  // @ts-ignore
  @Select(AuthState.isLoading) loading$: Observable<boolean>
  // @ts-ignore
  @Select(AuthState.isError) error$: Observable<string>

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })

    this.error$.subscribe((error) => {
      this.errorMessage = error
    })
    this.loading$.subscribe((loading) => {
      this.loading = loading
    })
  }

  onSubmit() {
    if (this.loginForm?.valid) {
      const { email, password } = this.loginForm.value
      this.store.dispatch(new Login({ email, password }))
    }
  }
}
