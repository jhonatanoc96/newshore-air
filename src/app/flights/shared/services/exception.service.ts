import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExceptionServiceTsService {

  constructor() { }
}

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    // Handle the error here
    console.error('Error occurred:', error);
  }
}