import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css'
})
export class FlightsComponent implements OnInit {

  public form: any;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      origin: '',
      destination: ''
    });

  }

  ngOnInit() {
    console.log('FlightsComponent.ngOnInit()');
    
  }

  onSubmit() {
    console.warn('Your order has been submitted');
  }
}
