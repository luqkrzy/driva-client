import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private matSnackBarConfig: MatSnackBarConfig = new MatSnackBarConfig();

  constructor(private matSnackBar: MatSnackBar) {
    this.matSnackBarConfig.duration = 6000;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.matSnackBar.open('We have error', 'OK', this.matSnackBarConfig);
        return throwError(error.error);
      })
    );
  }
}
