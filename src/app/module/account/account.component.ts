import { Component, OnInit } from '@angular/core';
import { IUser, User } from '../../model/user';
import { AccountService } from './account.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { observable } from 'rxjs';

observable;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  isLoading: boolean = true;
  account: IUser = new User();
  updated: IUser = new User();

  constructor(private accountService: AccountService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.accountService.getPrincipalAccount().subscribe(data => {
      this.isLoading = false;
      this.account = data;
    }, (error) => {
      console.log(error);
      this.isLoading = false;
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.data = this.account;
    let dialogRef = this.dialog.open(UpdateAccountComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
