import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Constant } from '../../../shared/constant';
import { MatDialogRef } from '@angular/material/dialog';
import { IStudent } from '../../../model/student';
import { IProduct } from '../../../model/product';
import { IProductType } from '../../../model/product-type';
import { ProductTypeService } from '../../product-type/product-type.service';
import { Observable, of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit, AfterViewInit {
  newStudentForm: FormGroup = new FormGroup({});
  newProductForm: FormGroup = new FormGroup({});
  switchEnabled = false;
  productTypes: IProductType[] = [];

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddStudentComponent>,
    private productTypeService: ProductTypeService,
    private studentService: StudentService) {
  }

  onClose(): void {
    this.dialogRef.close(false);
  }

  onSave(): void {
    const newStudent: IStudent = this.newStudentForm.value;
    const newProduct: IProduct = this.newProductForm.value;
    if (newProduct.productTypeId != null) {
      newStudent.products = [newProduct];
      console.log(newProduct);
    }
    this.dialogRef.close(newStudent);
  }

  validateForm(): boolean {
    return this.newStudentForm.invalid || (this.newStudentForm.valid &&
      this.switchEnabled && this.newProductForm.invalid);
  }

  switch(): void {
    this.switchEnabled = !this.switchEnabled;
    if (this.switchEnabled) {
      this.newProductForm.enable();
    } else {
      this.newProductForm.disable();
    }
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

  get price(): AbstractControl {
    return this.newProductForm.get('price') as AbstractControl;
  }

  ngOnInit(): void {
    this.initStudentForm();
    this.initProductForm();
    this.productTypeService.getAll().subscribe(data => {
        this.productTypes = data;
      }
    );
  }

  switchPrice(price: number) {
    this.price.setValue(price);
  }

  private initProductForm(): void {
    this.newProductForm = this.fb.group({
      productTypeId: [{value: null, disabled: true}, Validators.required],
      bookOnline: [{value: false, disabled: true}],
      isPaid: [{value: false, disabled: true}],
      price: [{value: 0, disabled: true}, [Validators.min(0), Validators.max(20000)]],
    });
  }

  private initStudentForm(): void {
    this.newStudentForm = this.fb.group({
      firstName: [
        'Luk',
        [Validators.minLength(3),
         Validators.required,
         Validators.pattern(Constant.NAME_REGEX)]],
      lastName: [
        'Krzy',
        [Validators.minLength(3),
         Validators.required,
         Validators.pattern(Constant.NAME_REGEX)]],
      email: [
        'luq@wp.pl',
        [Validators.pattern(Constant.EMAIL_REGEX), Validators.required], [this.emailExistsValidator()]],
      phoneNumber: [
        '123456789',
        [Validators.pattern(Constant.PHONE_REGEX), Validators.required]],
    },);
  }

  ngAfterViewInit(): void {
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
