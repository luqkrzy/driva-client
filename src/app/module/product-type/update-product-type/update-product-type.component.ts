import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProductType } from '../../../model/product-type';
import { Constant } from '../../../shared/constant';

@Component({
  selector: 'app-update-product-type',
  templateUrl: './update-product-type.component.html',
  styleUrls: ['./update-product-type.component.scss']
})
export class UpdateProductTypeComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  readonly category = ['A', 'B', 'C'];

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateProductTypeComponent>,
    @Inject(MAT_DIALOG_DATA) private productType: IProductType,) {
  }

  get name(): AbstractControl {
    return this.form.get('name') as AbstractControl;
  }

  get productCategory(): AbstractControl {
    return this.form.get('productCategory') as AbstractControl;
  }

  get description(): AbstractControl {
    return this.form.get('description') as AbstractControl;
  }

  get basePrice(): AbstractControl {
    return this.form.get('basePrice') as AbstractControl;
  }

  get lessonsHours(): AbstractControl {
    return this.form.get('lessonsHours') as AbstractControl;
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSave() {
    const updatedAccount: IProductType = this.form.value;
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
      id: [this.productType.id],
      name: [
        this.productType.name,
        [Validators.minLength(3),
         Validators.maxLength(20),
         Validators.required,
         Validators.pattern(Constant.LETTERS_NUMBERS)]],
      productCategory: [
        this.productType.productCategory,
        [Validators.required]],
      description: [
        this.productType.description,
        [Validators.minLength(3),
         Validators.maxLength(30),
         Validators.required,
         Validators.pattern(Constant.LETTERS_NUMBERS)]],
      basePrice: [
        this.productType.basePrice,
        [Validators.required,
         Validators.min(1),
         Validators.max(99999)]],
      lessonsHours: [
        this.productType.lessonsHours,
        [Validators.required,
         Validators.min(1),
         Validators.max(999)]],
    },);
  }
}
