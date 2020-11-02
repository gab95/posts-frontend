import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../pages/auth/auth.service';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (req.url.includes('admin')) {
      const authToken = this.authService.userValue.token;
      const authReq = req.clone({
        setHeaders: {
          auth: authToken,
        },
      });

      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
