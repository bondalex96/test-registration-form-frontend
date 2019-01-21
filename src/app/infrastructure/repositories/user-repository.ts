import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../../domain/entities/user';

@Injectable({
  providedIn: 'root'
})
export class UserRepository {
  private apiRoot;

  constructor(private httpClient: HttpClient) {
    this.apiRoot = 'http://localhost';
  }

  public register(user: User) {
      const url = this.apiRoot + `/register`;
      return this.httpClient.post(url, user).pipe(
          catchError((err) => {
              return throwError(err.error.errors);
          })
      );
  }

  public checkEmailIsUnique(email: string): Observable<boolean> {
    const url = this.apiRoot + `/email/${email}/check-unique`;
    return this.httpClient.get(url).pipe(
        map((response) => {
            return response['unique'];
        })
    );
  }

  public checkNickIsUnique(nick: string): Observable<boolean> {
    const url = this.apiRoot + `/nick/${nick}/check-unique`;
    return this.httpClient.get(url).pipe(
        map((response) => {
            return response['unique'];
        })
    );
  }
}
