import { Component, OnInit } from '@angular/core';
import { IUser, User } from '../../model/user';
import { AccountService } from './account.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  isLoading: boolean = true;
  account: IUser = new User();

  constructor(private accountService: AccountService,
    private dialog: MatDialog, private snackBar: MatSnackBar) {
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

  openDialogAccount(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.data = this.account;
    const dialogRef = this.dialog.open(UpdateAccountComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((updatedAccount: IUser) => {
      if (updatedAccount) {
        this.updateAccount(updatedAccount);
      }
    });
  }

  private updateAccount(updatedAccount: IUser): void {
    const matSnackBarConfig = new MatSnackBarConfig();
    matSnackBarConfig.duration = 5000;
    this.accountService.updateAccount(updatedAccount).subscribe(result => {
      this.account = result;
      this.snackBar.open('konto zaktualizowane', 'ok', matSnackBarConfig);
      console.log(this.account);
    }, (error: HttpErrorResponse) => {
      this.snackBar.open('aktualizacja nie powiodła się', 'ok', matSnackBarConfig);
      console.log(error);
    });
  }
}
