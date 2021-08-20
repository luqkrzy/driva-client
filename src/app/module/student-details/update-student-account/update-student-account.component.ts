import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IStudent } from '../../../model/student';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Constant } from '../../../shared/constant';

@Component({
  selector: 'app-update-student-account',
  templateUrl: './update-student-account.component.html',
  styleUrls: ['./update-student-account.component.scss']
})
export class UpdateStudentAccountComponent implements OnInit {
  studentForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateStudentAccountComponent>,
    @Inject(MAT_DIALOG_DATA) private student: IStudent,
  ) {
  }

  get firstName(): AbstractControl {
    return this.studentForm.get('firstName') as AbstractControl;
  }

  get lastName(): AbstractControl {
    return this.studentForm.get('lastName') as AbstractControl;
  }

  get email(): AbstractControl {
    return this.studentForm.get('email') as AbstractControl;
  }

  get phoneNumber(): AbstractControl {
    return this.studentForm.get('phoneNumber') as AbstractControl;
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSave() {
    const updatedAccount: IStudent = this.studentForm.value;
    this.dialogRef.close(updatedAccount);
  }

  onClose() {
    this.dialogRef.close(false);
  }

  private initForm() {
    this.studentForm = this.fb.group({
      id: [this.student.id],
      firstName: [this.student.firstName,
        [Validators.minLength(2),
         Validators.required,
         Validators.pattern(Constant.NAME_REGEX)]],
      lastName: [this.student.lastName,
        [Validators.minLength(3),
         Validators.required,
         Validators.pattern(Constant.NAME_REGEX)]],
      email: [this.student.email,
        [Validators.pattern(Constant.EMAIL_REGEX),
         Validators.required]],
      phoneNumber: [this.student.phoneNumber,
        [Validators.pattern(Constant.PHONE_REGEX),
         Validators.required]]
    });
  }
}
