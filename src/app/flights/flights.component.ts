import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { origin, destination } from '../store/actions/actions-store';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog-component/dialog-component.component';
import { FlightsService } from './shared/services/flights.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
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

  ngOnInit() {
    // Subscribe to store to get values of origin and destination
    this.places$ = this.store.pipe();
    this.places$.subscribe((data: any) => {
      console.log('OBTENIENDO VALOR DE ESTADO GLOBAL: ', data);
    });
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

    await this.getFlights();

  }

  async getFlights() {
    const response = await this.http.get(`${environment.URL}/2`);






  }

  async openDialog(message: string, type: string) {
    // If there is a modal, close it
    if (this.dialogObject) {
      this.dialogObject.close();
    }

    // Open modal
    this.dialogObject = await this.dialog.open(DialogComponent, {
      panelClass: 'centered-dialog',
      data: {
        message,
        type
      },
      width: '500px',
      height: '200px'
    });

    // Wait 4 seconds and close modal
    // setTimeout(() => {
    //   this.dialogObject.close();
    // }, 5000);

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
