import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { IUser } from '../../model/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url: string = environment.accountUrl;

  constructor(private http: HttpClient) {
  }

  getPrincipalAccount(): Observable<IUser> {
    return this.http.get<IUser>(this.url).pipe(
      shareReplay()
    );
  }
}
