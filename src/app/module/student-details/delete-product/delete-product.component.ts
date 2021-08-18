import { Component, Inject, OnInit } from '@angular/core';
import { ProductTypeService } from '../../product-type/product-type.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent implements OnInit {
  constructor(private productTypeService: ProductTypeService,
    private dialogRef: MatDialogRef<DeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) {
  }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close(false);
  }

  delete() {
    this.dialogRef.close(this.data);
  }
}
