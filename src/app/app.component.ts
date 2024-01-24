import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlightsModule } from './flights/flights.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FlightsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'newshore-air';
}
