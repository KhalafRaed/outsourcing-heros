import { Component } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'
import { Register } from '../../state/auth/auth.actions'
import { Select, Store } from '@ngxs/store'
import { AuthState } from '../../state/auth/auth.state'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  errorMessage: string = ''
  loading: boolean = false

  // @ts-ignore
  registerForm: FormGroup
  // @ts-ignore
  @Select(AuthState.isLoading) loading$: Observable<boolean>
  // @ts-ignore
  @Select(AuthState.isError) error$: Observable<string>

  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      powerName: ['', [Validators.required]],
    })
    this.error$.subscribe((error) => {
      this.errorMessage = error
    })
    this.loading$.subscribe((loading) => {
      this.loading = loading
    })
  }

  onSubmit() {
    if (this.registerForm?.valid) {
      const { email, password, powerName } = this.registerForm.value
      this.store.dispatch(new Register({ email, password, powerName }))
    }
  }
}
