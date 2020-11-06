import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { Post } from '../../shared/models/posts.interface';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getAllPostsFromOtherUsers(): Observable<Post[]> {
    return this.http.get(`${API_URL}/api/posts/all`).pipe(
      map((resp: any) => resp.posts),
      catchError((err) => this.handleError(err))
    );
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
