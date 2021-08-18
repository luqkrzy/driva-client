import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../../../model/product';
import { IProductType } from '../../../model/product-type';
import { ProductTypeService } from '../../product-type/product-type.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup = new FormGroup({});
  productTypes: IProductType[];

  constructor(private fb: FormBuilder, private productTypeService: ProductTypeService,
    private dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) private studentId: number) {
  }

  // get hoursLeft(): AbstractControl {
  //   return this.productForm.get('hoursLeft') as AbstractControl;
  // }
  get price(): AbstractControl {
    return this.productForm.get('price') as AbstractControl;
  }

  get productTypeId(): AbstractControl {
    return this.productForm.get('productTypeId') as AbstractControl;
  }

  ngOnInit(): void {
    this.productTypeService.getAllProductTypes().subscribe(data => {
      this.productTypes = data;
    });
    this.initProductForm();
  }

  onClose(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    const product: IProduct = this.productForm.value;
    this.dialogRef.close(product);
  }

  validateForm(): boolean {
    return this.productForm.invalid
      || (this.productForm.valid && (this.productTypeId.pristine || this.price.pristine));
  }

  private initProductForm() {
    this.productForm = this.fb.group({
      studentId: [this.studentId],
      productTypeId: [null, Validators.required],
      // hoursLeft: [null, [
      //   Validators.required,
      //   Validators.min(1),
      //   Validators.max(300),
      //   Validators.pattern(Constant.NUMBER_ONLY_REGEX)]],
      bookOnline: [null],
      isPaid: [null],
      price: [null, [Validators.min(0), Validators.max(20000)]],
    });
  }
}
