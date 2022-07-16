import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { UserSignInInterface } from 'src/interfaces/user-sign-in.interface';
import { User } from 'src/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserHTTPService {
  apiURL = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User> {
    return this.http
      .get<User>(`${this.apiURL}/users`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  createUser(newUser: UserSignInInterface): Observable<User> {
    return this.http
      .post<User>(`${this.apiURL}/users/signUp`, newUser, this.httpOptions)
      .pipe(retry(0), catchError(this.handleError));
  }

  loginUser(newUser: UserSignInInterface): Observable<User> {
    return this.http
      .post<User>(`${this.apiURL}/users/login`, newUser, this.httpOptions)
      .pipe(retry(0), catchError(this.handleError));
  }

  updateUserScores(updatedUser: User): Observable<User> {
    return this.http
      .post<User>(
        `${this.apiURL}/users/updateUserScore`,
        updatedUser,
        this.httpOptions
      )
      .pipe(retry(0), catchError(this.handleError));
  }

  handleError(error: any, caught: Observable<User>) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
