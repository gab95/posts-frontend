import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../pages/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //get the token from the request

    if (!req.url.includes('auth')) {
      const token = this.authService.userValue.token;

      //clone the token for security and avoid problems editing the token
      const authRequest = req.clone({
        //set() -> for add a new header
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(authRequest);
    }

    return next.handle(req);
  }
}
