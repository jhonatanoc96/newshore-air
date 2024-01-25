import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // You can modify the request here
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', environment.TOKEN),
    });

    // And return the modified request
    return next.handle(modifiedReq);
  }
}