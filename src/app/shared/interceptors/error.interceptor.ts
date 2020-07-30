import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        switch (err.status) {
          case 401:
            this.authService.logout();
            location.reload();
            break;
          case 403:
            this._openSnackBar('Access denied!', 'Close');
            break;
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }

  private _openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
