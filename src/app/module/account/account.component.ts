import { Component, OnInit } from '@angular/core';
import { IUser, User } from '../../model/user';
import { AccountService } from './account.service';

export interface Tile {
  text: string,
  cols: number,
  rows: number,
  color: string
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  isLoading: boolean = true;
  account: IUser = new User();

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.accountService.getPrincipalAccount().subscribe(data => {
      this.isLoading = false;
      this.account = data;
      console.log(this.account);
    }, (error) => {
      console.log(error);
      this.isLoading = false;
    });
  }
}
