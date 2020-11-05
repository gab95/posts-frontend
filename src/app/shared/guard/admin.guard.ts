import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  UrlTree,
} from '@angular/router';

import { Router } from '@angular/router';

import { AuthService } from '../../pages/auth/auth.service';
import { Route } from '@angular/compiler/src/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.userValue.role === 'admin') {
      return true;
    } else {
      Swal.fire(
        'Unauthorized',
        'You do not have privileges to perform this action',
        'warning'
      );
      return this.router.navigate(['/home']);
    }
  }
}
