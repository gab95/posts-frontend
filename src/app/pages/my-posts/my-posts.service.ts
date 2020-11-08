import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import Swal from 'sweetalert2';

import { Post } from '../../shared/models/posts.interface';

import { environment } from '../../../environments/environment';

const API_URL = environment.API_URL;
@Injectable({
  providedIn: 'root',
})
export class MyPostsService {
  constructor(private http: HttpClient) {}

  getAllPostFromLoggedInUsers(): Observable<Post[]> {
    return this.http.get(`${API_URL}/api/posts`).pipe(
      map((resp: any) => resp.rows),
      catchError((err) => this.handleError(err))
    );
  }

  getPostById(id: number) {
    return this.http
      .get(`${API_URL}/api/posts/${id}`)
      .pipe(map((resp: any) => resp.posts));
  }

  private handleError(err: any): Observable<never> {
    let errorMessage = 'An error occurred, please try later';

    console.log(err);

    if (err) {
      errorMessage = `Error: ${err.error.message}`;
    }

    Swal.fire('Error', `${errorMessage.toLocaleUpperCase()}`, 'error');
    return throwError(errorMessage);
  }
}
