import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsComponent } from './flights.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { placesReducer } from '../store/reducers/places.reducer';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from '../dialog-component/dialog-component.module';

@NgModule({
  declarations: [
    FlightsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    DialogModule,
    StoreModule.forRoot({ placesReducer })
  ],
  exports: [
    FlightsComponent
  ],
  providers: []
})
export class FlightsModule { }