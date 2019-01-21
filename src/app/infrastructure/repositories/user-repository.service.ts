import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {
  private apiRoot;

  constructor(private httpClient: HttpClient) {
    this.apiRoot = 'http://localhost';
  }

  public checkEmailIsUnique(email: string): Observable<boolean> {
    const url = this.apiRoot + `/email/${email}/check-unique`;
    return this.httpClient.get(url).pipe(
        map((response) => {
            return response.unique;
        })
    );
  }

  public checkNickIsUnique(nick: string): Observable<boolean> {
    const url = this.apiRoot + `/nick/${nick}/check-unique`;
    return this.httpClient.get(url).pipe(
        map((response) => {
            return response.unique;
        })
    );
  }
}
