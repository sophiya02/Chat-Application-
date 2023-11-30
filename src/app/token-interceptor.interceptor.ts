import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/lib/services/auth.service';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    console.log("inside intercept")
    // Clone the request and add the token to the headers
    console.log("token: ", token)
    if(token === null || token === undefined || token === ""){
      return next.handle(request);
    }
    else{
      console.log("inside else token: ", token)
      const modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },

      });
      return next.handle(modifiedRequest);
    }

  }
}
