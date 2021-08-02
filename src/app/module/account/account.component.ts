import { Component, OnInit } from '@angular/core';
import { IUser, User } from '../../model/user';
import { AccountService } from './account.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

observable;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  isLoading: boolean = true;
  account: IUser = new User();

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

  openDialogAccount() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.data = this.account;
    let dialogRef = this.dialog.open(UpdateAccountComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((updatedAccount: IUser) => {
      if (updatedAccount) {
        this.updateAccount(updatedAccount);
      } else {
        console.log('nic noe zrobilem');
      }
    });
  }

  private updateAccount(updatedAccount: IUser) {
    this.accountService.updateAccount(updatedAccount).subscribe(result => {
      this.account = result;
      console.log(this.account);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }
}
