import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsComponent } from './flights.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GlobalErrorHandler } from './shared/services/exception.service.ts.service';
import { StoreModule } from '@ngrx/store';
import { placesReducer } from '../store/reducers/places.reducer';
@NgModule({
  declarations: [
    FlightsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ placesReducer })
  ],
  exports: [
    FlightsComponent
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
})
export class FlightsModule { }