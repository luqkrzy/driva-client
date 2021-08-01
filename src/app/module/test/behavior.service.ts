import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviorService {
  private userBs = new BehaviorSubject<string>('john');
  user$ = this.userBs.asObservable();

  constructor() {
  }

  editUser(newUser: string): void {
    this.userBs.next(newUser);
  }
}

