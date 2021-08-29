import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IProductType } from '../../../model/product-type';
import { Constant } from '../../../shared/constant';

@Component({
  selector: 'app-add-product-type',
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.scss']
})
export class AddProductTypeComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  readonly category = ['A', 'B', 'C'];

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProductTypeComponent>,
  ) {
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

  onClose(): void {
    this.dialogRef.close(false);
  }

  onSave(): void {
    const productType: IProductType = this.form.value;
    this.dialogRef.close(productType);
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
      name: [
        null,
        [Validators.minLength(3),
         Validators.maxLength(10),
         Validators.required,
         Validators.pattern(Constant.LETTERS_NUMBERS)]],
      productCategory: [
        null, [Validators.required]],
      description: [
        null,
        [Validators.minLength(3),
         Validators.maxLength(20),
         Validators.required,
         Validators.pattern(Constant.LETTERS_NUMBERS)]],
      basePrice: [
        null,
        [Validators.required,
         Validators.min(1),
         Validators.max(99999)]],
      lessonsHours: [
        null,
        [Validators.required,
         Validators.min(1),
         Validators.max(999)]],
    },);
  }
}
