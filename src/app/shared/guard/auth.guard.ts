import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanLoad,
  Route,
} from '@angular/router';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../pages/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  canLoad(
    route: Route,
    segments: import('@angular/router').UrlSegment[]
  ):
    | boolean
    | UrlTree
    | import('rxjs').Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.authService.userValue === null) {
      Swal.fire(
        'Unauthorized',
        'You should fist login to use the App',
        'warning'
      );
      return this.router.navigate(['/auth/login']);
    } else {
      return true;
    }
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.userValue ? true : false;
  }
}
