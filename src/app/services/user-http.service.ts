import { UserService } from './behavior-subject-services/user.service';
import * as moment from 'moment';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError, Subscription } from 'rxjs';
import { UserSignInInterface } from 'src/app/interfaces/user-sign-in.interface';
import { User } from 'src/app/interfaces/user.interface';
import { Tokens } from '../interfaces/tokens';
import { SignInModalService } from './behavior-subject-services/sign-in-modal.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class UserHTTPService {
  apiURL = 'https://simon-game-backend.marcus-web-apps.com';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private backHttp: HttpBackend,
    private userService: UserService,
    private signInService: SignInModalService
  ) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.apiURL}/users`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  createUser(newUser: UserSignInInterface): void {
    this.http
      .post<User>(`${this.apiURL}/users/signUp`, newUser, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError))
      .subscribe((message) => {
        this.getToken(newUser);
      });
  }

  asyncLocalStorage = {
    setItem: async function (key: string, value: string) {
      await Promise.resolve();
      localStorage.setItem(key, value);
    },
    getItem: async function (key: string) {
      await Promise.resolve();
      return localStorage.getItem(key);
    },
  };

  getToken(user: UserSignInInterface): void {
    this.http
      .post<Tokens>(`${this.apiURL}/auth/login`, user, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError))
      .subscribe((message) => {
        localStorage.setItem('access_token', message.access_token);

        localStorage.setItem(
          'access_token_expiration',
          moment().add(message.access_token_expiration, 'second').toString()
        );
        localStorage.setItem('refresh_token', message.refresh_token);
        localStorage.setItem(
          'refresh_token_expiration',
          moment().add(message.refresh_token_expiration, 'second').toString()
        );

        this.getUser().subscribe((user) => {
          this.userService.setUser(user);
          this.signInService.openSignInModal('slideOut');
          _.delay(() => {
            this.signInService.openSignInModal('');
          }, 500);
        });
      });
  }

  getRefreshToken(): Observable<Tokens> {
    const refreshToken = localStorage.getItem('refresh_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${refreshToken}`,
    });

    const currentHttpClient = new HttpClient(this.backHttp);
    return currentHttpClient
      .post<Tokens>(`${this.apiURL}/refreshToken`, {}, { headers: headers })
      .pipe(catchError(this.handleError));
  }

  getUser(): Observable<User> {
    const newUser = this.http
      .get<User>(`${this.apiURL}/users/profile`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
    return newUser;
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

  updateRegularScore(regularScore: number) {
    const user = this.userService.returnCurrentValue();
    try {
      this.updateUserScores({
        ...user,
        regularScore,
      }).subscribe((user) => {
        this.userService.setUser(user);
      });
    } catch (error) {
      console.log(error);
    }
  }

  updateStrictScore(strictScore: number) {
    const user = this.userService.returnCurrentValue();
    try {
      this.updateUserScores({
        ...user,
        strictScore,
      }).subscribe((user) => this.userService.setUser(user));
    } catch (error) {
      console.log(error);
    }
  }

  handleError(error: any, caught: Observable<any>) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    if (errorMessage.includes('auth/login')) {
      window.alert('Login unsuccessful, please check username and password');
    }
    return throwError(() => {
      return errorMessage;
    });
  }
}
