import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import Swal from 'sweetalert2';

import { map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { User, Profile } from '../../shared/models/user.interface';
const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  id = JSON.parse(atob(this.authService.userValue.token.split('.')[1])).id;

  private role = JSON.parse(localStorage.getItem('user')).role;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserData() {
    return this.http
      .get(`${API_URL}/api/users/${this.id}`)
      .pipe(map((resp: any) => resp.user[0]));
  }

  updateUserData(userData: Profile) {
    userData.role = this.role;
    return this.http
      .patch(`${API_URL}/api/users/${this.id}`, userData)
      .pipe(catchError((err) => this.handleError(err)));
  }

  //never = create an Observable that emits no items and does not terminate
  private handleError(err: any): Observable<never> {
    let errorMessage = 'An error occurred, please try later';

    console.log('error ', err);

    if (err) {
      errorMessage = `Error: ${err.error.message}`;
    }

    Swal.fire('Error', `${errorMessage}`, 'error');
    return throwError(errorMessage);
  }
}
