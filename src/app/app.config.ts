import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { authInterceptor } from './interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  	providers: [
        provideRouter(routes),
        importProvidersFrom(HttpClientModule), provideAnimationsAsync(),
        provideHttpClient(withInterceptors([
            authInterceptor
        ])), provideAnimationsAsync(), provideAnimationsAsync()
    ]
}
