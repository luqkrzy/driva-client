import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AppErrorHandler } from '../error/app-error-handler';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private matSnackBarConfig: MatSnackBarConfig = new MatSnackBarConfig();

  constructor(private matSnackBar: MatSnackBar, private appErrorHandler: AppErrorHandler) {
    this.matSnackBarConfig.duration = 6000;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = this.appErrorHandler.setError(error);
        this.matSnackBar.open(errorMessage, 'OK', this.matSnackBarConfig);
        return throwError(error.error);
      })
    );
  }
}
