import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Constant } from '../../../shared/constant';
import { IProduct } from '../../../model/product';
import { IProductType } from '../../../model/product-type';
import { ProductTypeService } from '../../product-type/product-type.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  productForm: FormGroup = new FormGroup({});
  product: IProduct;
  productTypes: IProductType[];

  constructor(private fb: FormBuilder, private productTypeService: ProductTypeService,
    private dialogRef: MatDialogRef<UpdateProductComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IProduct) {
  }

  get hoursLeft(): AbstractControl {
    return this.productForm.get('hoursLeft') as AbstractControl;
  }

  get price(): AbstractControl {
    return this.productForm.get('price') as AbstractControl;
  }

  get productTypeId(): AbstractControl {
    return this.productForm.get('productTypeId') as AbstractControl;
  }

  get bookOnline(): AbstractControl {
    return this.productForm.get('bookOnline') as AbstractControl;
  }

  get isPaid(): AbstractControl {
    return this.productForm.get('isPaid') as AbstractControl;
  }

  get productTypeName(): AbstractControl {
    return this.productForm.get('productTypeName') as AbstractControl;
  }

  ngOnInit(): void {
    this.product = this.data;
    this.productTypeService.getAll().subscribe(data => {
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
    return this.productForm.invalid ||
      (this.productForm.valid && this.productForm.pristine);
  }

  productName(productType: IProductType) {
    this.productTypeName.setValue(productType.name);
    this.hoursLeft.setValue(productType.lessonsHours);
    this.price.setValue(productType.basePrice);
  }

  private initProductForm() {
    this.productForm = this.fb.group({
      id: [this.product.id],
      studentId: [this.product.studentId],
      productTypeId: [this.product.productTypeId, Validators.required],
      productTypeName: [null],
      hoursLeft: [this.product.hoursLeft, [
        Validators.required,
        Validators.min(1),
        Validators.max(300),
        Validators.pattern(Constant.NUMBER_ONLY_REGEX)]],
      bookOnline: [this.product.bookOnline, Validators.required],
      isPaid: [this.product.isPaid, Validators.required],
      price: [this.product.price, [Validators.min(0), Validators.max(20000)]],
    });
  }
}
