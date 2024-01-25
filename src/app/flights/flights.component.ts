import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { origin, destination } from '../store/actions/actions-store';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css'
})
export class FlightsComponent implements OnInit {

  public form: FormGroup;
  public places$: any; // Observer to handle value of store (origin and destination)

  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    this.form = this.formBuilder.group({
      origin: '',
      destination: ''
    });

  }

  ngOnInit() {
    // Subscribe to store to get values of origin and destination
    this.places$ = this.store.pipe();
    this.places$.subscribe((data: any) => {
      console.log('OBTENIENDO VALOR DE ESTADO GLOBAL: ', data);
    });
  }

  setOrigin(event: any) {
    const newOrigin = event.target.value;
    this.store.dispatch(origin({ newOrigin }));
  }
  
  setDestination(event: any) {
    const newDestination = event.target.value;
    this.store.dispatch(destination({ newDestination }));
  }

}
