import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, finalize, switchMap, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  private token: string | null | undefined;
  refreshingToken: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = localStorage.getItem('AUTH_TOKEN');

    console.log("Hitting url :: " + request.url);
    if (this.token && !request.url.includes('/auth/refresh')) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.token}` },
        withCredentials: true
      });
    } else {
      request = request.clone({
        withCredentials: true
      });
    }
    return next.handle(request)
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status == 401) {
            return this.handleRefreshToken(request, next);
          } else {
            return throwError(() => error);
          }
        })
      );
  }
  private handleRefreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.refreshingToken) {
      this.refreshingToken = true;
      return this.authService.refreshToken().pipe(
        switchMap((res) => {
          console.log("Token Refreshed :: " + res.body!.token);
          localStorage.setItem('AUTH_TOKEN', res.body!.token);
          const updatedReq = request.clone({
            setHeaders: { Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}` }
          });
          return next.handle(updatedReq);
        }),
        catchError(err => {
          console.log(err);
          if (err.status === 403 || err.status === 401) {
            this.authService.logout();
            this.router.navigate(['/']);
          }
          return throwError(() => err);
        }),
        finalize(() => this.refreshingToken = false)
      );
    } else {
      return next.handle(request);
    }
  }
}
