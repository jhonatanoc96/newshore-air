import { InjectionToken, NgModule } from '@angular/core';
import { environment } from '../../../../environments/environment';

export const TOKEN_EXCHANGE_RATE = new InjectionToken<string>('');

@NgModule({
  providers: [
    { provide: TOKEN_EXCHANGE_RATE, useValue: environment.TOKEN_EXCHANGE_RATE }
  ]
})
export class TokenExchangeRateModule { }