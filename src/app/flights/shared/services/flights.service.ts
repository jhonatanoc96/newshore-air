import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor() { }
  // constructor(private http: HttpClient) { }

  getFlights(level: string) {
    // return this.http.get(`${environment.URL}/${level}`);
  }
}
