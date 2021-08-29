import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { InstructorService } from '../instructor.service';
import { iInstructor } from '../../../model/instructor';
import { Constant } from '../../../shared/constant';
import { Observable, of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-instructor',
  templateUrl: './add-instructor.component.html',
  styleUrls: ['./add-instructor.component.scss']
})
export class AddInstructorComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddInstructorComponent>,
    private instructorService: InstructorService) {
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

  onClose(): void {
    this.dialogRef.close(false);
  }

  onSave(): void {
    const instructor: iInstructor = this.form.value;
    this.dialogRef.close(instructor);
  }

  validateForm(): boolean {
    return this.form.invalid || (
      this.form.value && this.form.pristine
    );
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      firstName: [
        'Adam',
        [Validators.minLength(3),
         Validators.required,
         Validators.pattern(Constant.NAME_REGEX)]],
      lastName: [
        'Kowalski',
        [Validators.minLength(3),
         Validators.required,
         Validators.pattern(Constant.NAME_REGEX)]],
      email: [
        'kow@wp.pl',
        [Validators.pattern(Constant.EMAIL_REGEX), Validators.required], [this.emailExistsValidator()]],
      phoneNumber: [
        '123456789',
        [Validators.pattern(Constant.PHONE_REGEX), Validators.required]],
    },);
  }

  private emailExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(control.value).pipe(
        delay(500),
        switchMap((email) => this.instructorService.doesEmailExist(email).pipe(
          map(emailExists => emailExists ? {emailExists: true} : null)
        ))
      );
    };
  }
}

