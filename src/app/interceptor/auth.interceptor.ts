import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../module/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {
  }

  intercept(request: HttpRequest<HttpHandler>, next: HttpHandler): Observable<HttpEvent<HttpHandler>> {
    if (request.url.includes(`${this.authService.apiUrl}/login`)) {
      return next.handle(request);
    }
    const newReq = request.clone({
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.authService.getTokenFromCache()}`
      })
    });
    return next.handle(newReq);
  }
}

