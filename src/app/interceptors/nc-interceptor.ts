import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import { map, Observable } from 'rxjs';

type AuthResponse = {
  login: string,
  poll: {
    token: string,
    endpoint: string,
  }
}

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<AuthResponse>, next: HttpHandler):
    Observable<HttpEvent<AuthResponse>> {
      // console.warn('Intercepted HTTP Request!!!')
      // console.log(req)
      // return next.handle(req)
    return next.handle(req).pipe(map(event => {
      if (event instanceof HttpResponse) {
        // console.warn('Response Event Happened!')
        // console.log(event)
      }
      return event
    }))
  }
}