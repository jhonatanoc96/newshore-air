import { InjectionToken, NgModule } from '@angular/core';
import { environment } from '../../../../environments/environment';

export const URL_EXCHANGE_RATE = new InjectionToken<string>('');

@NgModule({
  providers: [
    { provide: URL, useValue: environment.URL_EXCHANGE_RATE }
  ]
})
export class UrlExchangeRateModule { }