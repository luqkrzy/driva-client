import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Constant } from '../../../shared/constant';
import { MatDialogRef } from '@angular/material/dialog';
import { IStudent, Student } from '../IStudent';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit, AfterViewInit {
  newStudentForm: FormGroup = new FormGroup({});
  private nameRegex: string = Constant.NAME_REGEX;
  private phoneRegex: string = Constant.PHONE_REGEX;
  private emailRegex: string = Constant.EMAIL_REGEX;
  private student: IStudent = new Student();

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddStudentComponent>,
  ) {
  }

  get firstName(): AbstractControl {
    return this.newStudentForm.get('firstName') as AbstractControl;
  }

  get lastName(): AbstractControl {
    return this.newStudentForm.get('lastName') as AbstractControl;
  }

  get email(): AbstractControl {
    return this.newStudentForm.get('email') as AbstractControl;
  }

  get phoneNumber(): AbstractControl {
    return this.newStudentForm.get('phoneNumber') as AbstractControl;
  }

  ngOnInit(): void {
    this.initForm();
  }

  onClose() {
    this.dialogRef.close(false);
  }

  onSave() {
    const newStudent: IStudent = this.newStudentForm.value;
    this.dialogRef.close(newStudent);
  }

  ngAfterViewInit(): void {
  }

  private initForm() {
    this.newStudentForm = this.fb.group({
      firstName: [
        this.student.firstName,
        [Validators.minLength(3),
         Validators.required,
         Validators.pattern(this.nameRegex)]],
      lastName: [
        this.student.lastName,
        [Validators.minLength(3),
         Validators.required,
         Validators.pattern(this.nameRegex)]],
      email: [
        this.student.email,
        [Validators.pattern(this.emailRegex), Validators.required]],
      phoneNumber: [
        this.student.phoneNumber,
        [Validators.pattern(this.phoneRegex), Validators.required]]
    }, {validators: myFormValidator});
  }
}

const myFormValidator = (control: FormGroup): ValidationErrors | null => {
  const lastName = control.get('lastName')!.value;
  const firstName = control.get('firstName')!.value;
  if (lastName && !firstName || firstName && !lastName) {
    return {'emptyField': true};
  } else {
    return null;
  }
};
