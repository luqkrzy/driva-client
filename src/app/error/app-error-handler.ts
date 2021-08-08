import { HttpErrorResponse } from '@angular/common/http';

export class AppErrorHandler {
  constructor() {
  }

  setError(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      //  client side error
      return error.error.message;
    } else {
      //  server side error
      const status = error.status;
      if (status === 0) {
        return 'Brak połączenia z bazą';
      }
      if (status == 400) {
        return 'Nieprawidłowo sformatowane dane';
      }
      if (status == 401) {
        return 'Niepoprawne dane';
      }
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
