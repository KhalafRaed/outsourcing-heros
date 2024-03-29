import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { NgxsModule } from '@ngxs/store'
import { AuthState } from './state/auth/auth.state'
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http'
import { AppInterceptor } from './shared/interceptors/http.interceptor'
import { HeroesState } from './state/heroes/heroes.state'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      NgxsModule.forRoot([AuthState, HeroesState]),
      HttpClientModule
    ),
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
  ],
}
