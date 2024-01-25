import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { origin, destination } from '../store/actions/actions-store';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog-component/dialog-component.component';
import { FlightsService } from './shared/services/flights.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Transport } from './shared/models/transport.model';
import { Flight } from './shared/models/flight.model';
@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css'
})
export class FlightsComponent implements OnInit {

  public form: FormGroup;
  public places$: any; // Observer to handle value of store (origin and destination)
  public dialogObject: any;
  public origin: string = '';
  public destination: string = '';

  public tranports: Transport[] = [];
  public flights: Flight[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    public dialog: MatDialog,
    public flightsService: FlightsService,
    private http: HttpClient
  ) {
    this.form = this.formBuilder.group({
      origin: '',
      destination: ''
    });

  }

  async ngOnInit() {
    // Subscribe to store to get values of origin and destination
    this.places$ = this.store.pipe();
    this.places$.subscribe((data: any) => {
      console.log('OBTENIENDO VALOR DE ESTADO GLOBAL: ', data);
    });

    await this.getFlights();

  }

  setOrigin(event: any) {
    const value = event.target.value;
    this.origin = value.toUpperCase();
    this.store.dispatch(origin({ newOrigin: this.origin }));
  }

  setDestination(event: any) {
    const value = event.target.value;
    this.destination = value.toUpperCase();
    this.store.dispatch(destination({ newDestination: this.destination }));
  }

  async submit() {
    // Validate if origin and destination are not empty
    if (this.origin === '' || this.destination === '') {
      return this.openDialog('Por favor, ingresa un origen y destino para continuar', 'error');
    }

    // Validate if origin and destination are the same
    if (this.origin === this.destination) {
      return this.openDialog('El origen y destino no pueden ser iguales', 'error');
    }

    // Validate if origin and destination are not equal to 3 characters
    if (this.origin.length !== 3 || this.destination.length !== 3) {
      return this.openDialog('El origen y destino deben ser de 3 caracteres', 'error');
    }

    // Validate if origin exists
    const origin = this.flights.find((item: any) => item.origin === this.origin);

    if (!origin) {
      return this.openDialog('El origen no existe', 'error');
    }

    // Validate if destination exists
    const destination = this.flights.find((item: any) => item.destination === this.destination);

    if (!destination) {
      return this.openDialog('El destino no existe', 'error');
    }

    //

  }

  async getFlights() {
    await this.http.get(`${environment.URL}/2`).subscribe((data: any) => {

      // Iterate response to get transports and flights
      data.forEach((transport: any) => {
        // Validate if not exists
        const obj = this.tranports.find((item: any) => item.flightNumber === transport.flightNumber);
        if (!obj) {
          this.tranports.push({
            flightCarrier: transport.flightCarrier,
            flightNumber: transport.flightNumber,
          });

          // Add flight information
          this.flights.push({
            transport: {
              flightCarrier: transport.flightCarrier,
              flightNumber: transport.flightNumber,
            },
            origin: transport.departureStation,
            destination: transport.arrivalStation,
            price: transport.price
          });
        }
      });

      console.log('VUELOS: ', this.flights);
      console.log('TRANSPORTES: ', this.tranports);

    });
  }

  async openDialog(message: string, type: string, width: string = '500px', height: string = '150px') {
    // If there is a modal, close it
    if (this.dialogObject) {
      this.dialogObject.close();
    }

    const panelClass = type === 'error' ? 'error-dialog' : 'success-dialog';

    // Open modal
    this.dialogObject = await this.dialog.open(DialogComponent, {
      panelClass,
      data: {
        message,
        type
      },
      width,
      height
    });

  }

  async closeDialog() {
    if (this.dialogObject) {
      this.dialogObject.close();
    }
  }

  isFormValid() {
    if (this.origin === '' ||
      this.destination === '' ||
      this.origin === this.destination ||
      this.origin.length > 3 ||
      this.destination.length > 3) {
      return false;
    }

    return true;
  }

}
