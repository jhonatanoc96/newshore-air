import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsComponent } from './flights.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GlobalErrorHandler } from './shared/services/exception.service.ts.service';

@NgModule({
  declarations: [
    FlightsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    FlightsComponent
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
})
export class FlightsModule { }