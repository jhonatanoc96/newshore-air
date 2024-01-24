import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css'
})
export class FlightsComponent implements OnInit{

  constructor() { }

  ngOnInit() {
    console.log("CARGÓ");
    
  }

}
