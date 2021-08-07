import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constant } from '../../../shared/constant';
import { IUser } from '../../../model/user';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.scss']
})
export class UpdateAccountComponent implements OnInit {
  updateAccount: FormGroup = new FormGroup({});
  private user: IUser;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateAccountComponent>,
    @Inject(MAT_DIALOG_DATA) data: IUser,) {
    this.user = data;
  }

  get firstName(): AbstractControl {
    return this.updateAccount.get('firstName') as AbstractControl;
  }

  get lastName(): AbstractControl {
    return this.updateAccount.get('lastName') as AbstractControl;
  }

  get email(): AbstractControl {
    return this.updateAccount.get('email') as AbstractControl;
  }

  get phoneNumber(): AbstractControl {
    return this.updateAccount.get('phoneNumber') as AbstractControl;
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSave() {
    const updatedAccount: IUser = this.updateAccount.value;
    updatedAccount.id = this.user.id;
    updatedAccount.roles = this.user.roles;
    this.dialogRef.close(updatedAccount);
  }

  onClose() {
    this.dialogRef.close(false);
  }

  private initForm() {
    this.updateAccount = this.fb.group({
      firstName: [this.user.firstName, [Validators.minLength(4),
                                        Validators.required,
                                        Validators.pattern(Constant.NAME_REGEX)]],
      lastName: [this.user.lastName, [Validators.minLength(3),
                                      Validators.required,
                                      Validators.pattern(Constant.NAME_REGEX)]],
      email: [this.user.email, [Validators.pattern(Constant.EMAIL_REGEX),
                                Validators.required]],
      phoneNumber: [this.user.phoneNumber, [Validators.pattern(Constant.PHONE_REGEX),
                                            Validators.required]]
    });
  }
}
