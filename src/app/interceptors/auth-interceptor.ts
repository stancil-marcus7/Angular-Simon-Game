import { UserHTTPService } from './../services/user-http.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userHttpService: UserHTTPService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('access_token');
    const accessTokenExpiration = localStorage.getItem(
      'access_token_expiration'
    );
    const refreshTokenExpiration = localStorage.getItem(
      'refresh_token_expiration'
    );
    let cloned = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + accessToken),
    });
    if (accessToken) {
      if (
        moment() > moment(accessTokenExpiration) &&
        moment() < moment(refreshTokenExpiration)
      ) {
        try {
          this.userHttpService.getRefreshToken().subscribe((message) => {
            localStorage.setItem('access_token', message.access_token);

            localStorage.setItem(
              'access_token_expiration',
              moment().add(message.access_token_expiration, 'second').toString()
            );
            localStorage.setItem('refresh_token', message.refresh_token);
            localStorage.setItem(
              'refresh_token_expiration',
              moment()
                .add(message.refresh_token_expiration, 'second')
                .toString()
            );
            cloned = req.clone({
              headers: req.headers.set(
                'Authorization',
                'Bearer ' + message.access_token
              ),
            });
          });
        } catch (error) {
          console.log('error', error);
        }
      }
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
