import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IStudent } from '../../../model/student';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Constant } from '../../../shared/constant';
import { Observable, of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { StudentService } from '../../students/student.service';

@Component({
  selector: 'app-update-student-account',
  templateUrl: './update-student-account.component.html',
  styleUrls: ['./update-student-account.component.scss']
})
export class UpdateStudentAccountComponent implements OnInit {
  updateAccount: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateStudentAccountComponent>,
    @Inject(MAT_DIALOG_DATA) private student: IStudent,
    private studentService: StudentService) {
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
    const updatedAccount: IStudent = this.updateAccount.value;
    this.dialogRef.close(updatedAccount);
  }

  onClose() {
    this.dialogRef.close(false);
  }

  private initForm() {
    this.updateAccount = this.fb.group({
      id: [this.student.id],
      firstName: [this.student.firstName,
        [Validators.minLength(4),
         Validators.required,
         Validators.pattern(Constant.NAME_REGEX)]],
      lastName: [this.student.lastName,
        [Validators.minLength(3),
         Validators.required,
         Validators.pattern(Constant.NAME_REGEX)]],
      email: [this.student.email,
        [Validators.pattern(Constant.EMAIL_REGEX),
         Validators.required], [this.emailExistsValidator()]],
      phoneNumber: [this.student.phoneNumber,
        [Validators.pattern(Constant.PHONE_REGEX),
         Validators.required]]
    });
  }

  private emailExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(control.value).pipe(
        delay(500),
        switchMap((email) => this.studentService.doesEmailExist(email).pipe(
          map(emailExists => emailExists ? {emailExists: true} : null)
        ))
      );
    };
  }
}
