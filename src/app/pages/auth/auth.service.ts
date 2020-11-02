import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { UserResponse, User } from '../../shared/models/user.interface';

import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';

const API_URL = environment.API_URL;
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = new BehaviorSubject<UserResponse>(null);

  get user$(): Observable<UserResponse> {
    return this.user.asObservable();
  }

  get userValue(): UserResponse {
    return this.user.getValue();
  }

  constructor(private router: Router, private http: HttpClient) {
    this.readToken();
  }

  login(authData: User): Observable<UserResponse | void> {
    return this.http
      .post<UserResponse>(`${API_URL}/api/auth/login`, authData)
      .pipe(
        map((user: UserResponse) => {
          this.saveLocalStorage(user);
          this.user.next(user);
          return user;
        }),
        catchError((err) => this.handleError(err))
      );
  }

  register(authData: User): Observable<UserResponse | void> {
    return this.http
      .post<UserResponse>(`${API_URL}/api/auth/register`, authData)
      .pipe(catchError((err) => this.handleError(err)));
  }

  logout(): void {
    localStorage.removeItem('user');
    this.user.next(null);
    this.router.navigate(['/auth/login']);
  }

  private readToken(): void {}

  private checkToken(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const isExpired = helper.isTokenExpired(user.token);

      if (isExpired) {
        this.logout();
      } else {
        this.user.next(user);
      }
    }
  }

  private saveLocalStorage(user: UserResponse): void {
    const { userId, message, status, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
  }

  //never = create an Observable that emits no items and does not terminate
  private handleError(err: any): Observable<never> {
    let errorMessage = 'An error occurred, please try later';

    console.log(err);

    if (err) {
      errorMessage = `Error: ${err.error.message}`;
    }

    Swal.fire('Error', `${errorMessage}`, 'error');
    return throwError(errorMessage);
  }
}
