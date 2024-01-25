import { InjectionToken, NgModule } from '@angular/core';

export const URL = new InjectionToken<string>('');

@NgModule({
  providers: [
    { provide: URL, useValue: 'https://recruiting-api.newshore.es/api/flights' }
  ]
})
export class UrlModule { }