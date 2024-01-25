import { Component, ErrorHandler } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlightsModule } from './flights/flights.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './flights/shared/services/interceptor.service';
import { GlobalErrorHandler } from './flights/shared/services/exception.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterOutlet,
    FlightsModule,
  ],
  providers: [
    HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'newshore-air';
}
