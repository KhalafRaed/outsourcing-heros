import { Routes } from '@angular/router'
import { AuthComponent } from './auth/auth.component'
import { LoginComponent } from './auth/login/login.component'
import { RegisterComponent } from './auth/register/register.component'
import { HomeComponent } from './home/home.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { AuthGuard } from './shared/guards/auth.guard'
import { RedirectIfLoggedInGuard } from './shared/guards/redirect-if-logged-in.guard'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [RedirectIfLoggedInGuard],
      },
      {
        path: 'signup',
        component: RegisterComponent,
        canActivate: [RedirectIfLoggedInGuard],
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
]
