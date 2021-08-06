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
        const errorMessage = this.setError(error);
        this.matSnackBar.open(errorMessage, 'OK', this.matSnackBarConfig);
        console.log(error.error);
        return throwError(error.error);
      })
    );
  }

  setError(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      //  client side error
      return error.error.message;
    } else {
      //  server side error
      const status = error.status;
      if (status == 404) {
        return 'Nie znaleziono zasobu';
      }
      if (status == 409) {
        return `Konflikt ${error.error.message}`;
      }
    }
    return 'Wystąpił błąd';
  }
}
