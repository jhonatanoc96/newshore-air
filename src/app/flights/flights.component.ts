import { Component, Inject, OnInit } from '@angular/core';
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
import { Request } from './shared/interfaces/request.interface';
import { URL } from './shared/tokens/url.token';
import { Journey } from './shared/models/journey.model';
@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css'
})
export class FlightsComponent implements OnInit {

  public request: Request = {
    Origin: '',
    Destination: '',
  };

  public journey: Journey = {
    Flights: [],
    Origin: '',
    Destination: '',
    Price: 0,
  };

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
    private http: HttpClient,
    @Inject(URL) private url: string
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

    // Validate if there is a way to arrive from origin to destination
    this.request = {
      Origin: this.origin,
      Destination: this.destination
    };

    this.calculateBestWay(this.request);

  }

  calculateBestWay(request: Request) {

    this.journey = {
      Flights: [],
      Origin: '',
      Destination: '',
      Price: 0,
    };

    // Get all flights from origin
    const flightsFromOrigin = this.flights.filter((item: any) => item.origin === request.Origin);

    let flights: any = [];

    // Check if there is a direct way
    const directWay = flightsFromOrigin.find((item: any) => item.origin === request.Origin && item.destination === request.Destination);

    if (directWay) {
      flights.push(directWay);
      this.getJourney(flights, request);
      return;
    } else {
      
      // First level
      for (let element of flightsFromOrigin) {
        // Check if best way is direct
        if (element.destination !== request.Destination) {

          // Second level
          const flightsFromDestinationSecondLevel = this.flights.filter((item: any) => item.origin === element.destination);

          // Validate if exists in second level
          const existsInSecondLevel = flightsFromDestinationSecondLevel.find((item: any) => item.destination === request.Destination);


          if (existsInSecondLevel) {
            flights.push(element);
            flights.push(existsInSecondLevel);

            this.getJourney(flights, request);
            
            return;
            
          } else {

            // Third level
            for (let secondLevel of flightsFromDestinationSecondLevel) {
              const flightsFromDestinationThirdLevel = this.flights.filter((item: any) => item.origin === secondLevel.destination);

              // Validate if exists in third level
              const existsInThirdLevel = flightsFromDestinationThirdLevel.find((item: any) => item.destination === request.Destination);

              if (existsInThirdLevel) {
                flights.push(element);
                flights.push(secondLevel);
                flights.push(existsInThirdLevel);

                this.getJourney(flights, request);
                return;
              } 
            }            
          }
        }
      }
    }

  }

  getJourney(flights: any, request: Request) {

    // Get Journey
    let journey: Journey = {
      Flights: [],
      Origin: '',
      Destination: '',
      Price: 0,
    };

    this.journey = journey;

    if (flights.length > 0) {
      if (flights.length === 1) {
        // If there is only one flight
        journey.Origin = request.Origin;
        journey.Destination = request.Destination;
        journey.Price = flights[0].price;
        journey.Flights.push(flights[0]);

      } else {

        // Iterate flights to get all possibles journeys
        for (let element of flights) {

          // If element is equal to origin (first element)
          if (element.origin === request.Origin) {
            journey.Origin = request.Origin;
            journey.Destination = request.Destination;
            journey.Price = element.price;
            journey.Flights.push(element);

          } else if (element.destination === request.Destination) {
            // If element is equal to destination (last element)
            journey.Price += element.price;
            journey.Flights.push(element);

          } else {
            // If element is not origin or destination
            journey.Price += element.price;
            journey.Flights.push(element);
          }
        }
      }

      console.log('VUELOS: ', flights);
      console.log('JOURNEY: ', journey);

      if (journey.Flights.length > 0) {
        this.journey = journey;
        this.openDialog('Su consulta ha sido procesada', 'success', '500px', '300px', journey);
      }
    }

  }


  async getFlights() {
    await this.http.get(`${this.url}/2`).subscribe((data: any) => {

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

  async openDialog(message: string, type: string, width: string = '500px', height: string = '150px', journey: Journey = this.journey) {
    
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
        type,
        journey
      },
      width,
      height,
      disableClose: true
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
