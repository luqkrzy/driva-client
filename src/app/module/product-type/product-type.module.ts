import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTypeRoutingModule } from './product-type-routing.module';
import { ProductTypeComponent } from './product-type.component';
import { AddProductTypeComponent } from './add-product-type/add-product-type.component';
import { UpdateProductTypeComponent } from './update-product-type/update-product-type.component';
import { MaterialModule } from '../../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductTypeComponent,
    AddProductTypeComponent,
    UpdateProductTypeComponent
  ],
  imports: [
    CommonModule,
    ProductTypeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class ProductTypeModule {
}
