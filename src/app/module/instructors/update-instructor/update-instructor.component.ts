import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Constant } from '../../../shared/constant';
import { iInstructor } from '../../../model/instructor';

@Component({
  selector: 'app-update-instructor',
  templateUrl: './update-instructor.component.html',
  styleUrls: ['./update-instructor.component.scss']
})
export class UpdateInstructorComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateInstructorComponent>,
    @Inject(MAT_DIALOG_DATA) private instructor: iInstructor,
  ) {
  }

  get firstName(): AbstractControl {
    return this.form.get('firstName') as AbstractControl;
  }

  get lastName(): AbstractControl {
    return this.form.get('lastName') as AbstractControl;
  }

  get email(): AbstractControl {
    return this.form.get('email') as AbstractControl;
  }

  get phoneNumber(): AbstractControl {
    return this.form.get('phoneNumber') as AbstractControl;
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSave() {
    const updatedAccount: iInstructor = this.form.value;
    this.dialogRef.close(updatedAccount);
  }

  onClose() {
    this.dialogRef.close(false);
  }

  validateForm(): boolean {
    return this.form.invalid || this.form.pristine;
  }

  private initForm() {
    this.form = this.fb.group({
      id: [this.instructor.id],
      firstName: [this.instructor.firstName,
        [Validators.minLength(2),
         Validators.required,
         Validators.pattern(Constant.NAME_REGEX)]],
      lastName: [this.instructor.lastName,
        [Validators.minLength(3),
         Validators.required,
         Validators.pattern(Constant.NAME_REGEX)]],
      email: [this.instructor.email,
        [Validators.pattern(Constant.EMAIL_REGEX),
         Validators.required]],
      phoneNumber: [this.instructor.phoneNumber,
        [Validators.pattern(Constant.PHONE_REGEX),
         Validators.required]]
    });
  }
}
