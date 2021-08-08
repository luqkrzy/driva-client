import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../model/user';
import { shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly apiUrl: string = environment.apiUrl;
  private readonly jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {
  }

  login(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.apiUrl}/auth/login`, user,
      {observe: 'response'}).pipe(shareReplay());
  }

  addUserToCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserFromCache(): User {
    return JSON.parse(localStorage.getItem('user') as string);
  }

  addTokenToCache(token: string): void {
    localStorage.setItem('token', JSON.stringify(token).slice(1, -1));
  }

  getTokenFromCache(): string {
    return localStorage.getItem('token') as string;
  }

  logOut(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigateByUrl("");
  }

  getTokeExpDate(): Date {
    return this.jwtHelper.getTokenExpirationDate(this.getTokenFromCache()) as Date;
  }


  isUserLoggedIn(): boolean {
    const token = this.getTokenFromCache();
    return !!(token && this.getUserFromCache() &&
      !this.jwtHelper.isTokenExpired(token) &&
      this.jwtHelper.decodeToken(token).sub);
  }

  getRole(): string[] {
    let user = this.getUserFromCache();
    return user.roles!;
  }
}


