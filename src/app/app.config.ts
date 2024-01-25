import { ApplicationConfig, ErrorHandler, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './flights/shared/services/interceptor.service';
import { GlobalErrorHandler } from './flights/shared/services/exception.service';
import { URL } from './flights/shared/tokens/url.token';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: URL, useValue: environment.URL }

  ]
};
