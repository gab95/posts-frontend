import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import Swal from 'sweetalert2';

import { Post } from '../../shared/models/posts.interface';

import { map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserData() {
    const id = atob(this.authService.userValue.token.split('.')[1]);
    return this.http
      .get(`${API_URL}/api/users/${id}`)
      .pipe(map((resp: any) => resp.user[0]));
  }
}
