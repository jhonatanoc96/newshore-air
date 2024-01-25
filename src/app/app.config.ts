import { ApplicationConfig, ErrorHandler, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './flights/shared/services/interceptor.service';
import { GlobalErrorHandler } from './flights/shared/services/exception.service';
import { URL } from './flights/shared/tokens/url.token';
import { URL_EXCHANGE_RATE } from './flights/shared/tokens/url-exchange-rate.token';
import { environment } from '../environments/environment';
import { TOKEN_EXCHANGE_RATE } from './flights/shared/tokens/token-exchange-rate';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: URL, useValue: environment.URL },
    { provide: URL_EXCHANGE_RATE, useValue: environment.URL_EXCHANGE_RATE },
    { provide: TOKEN_EXCHANGE_RATE, useValue: environment.TOKEN_EXCHANGE_RATE },


  ]
};
