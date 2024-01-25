import { InjectionToken, NgModule } from '@angular/core';
import { environment } from '../../../../environments/environment';

export const URL = new InjectionToken<string>('');

@NgModule({
  providers: [
    { provide: URL, useValue: environment.URL }
  ]
})
export class UrlModule { }