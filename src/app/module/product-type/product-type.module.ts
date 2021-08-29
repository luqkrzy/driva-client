import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTypeRoutingModule } from './product-type-routing.module';
import { ProductTypeComponent } from './product-type.component';
import { AddProductTypeComponent } from './add-product-type/add-product-type.component';

@NgModule({
  declarations: [
    ProductTypeComponent,
    AddProductTypeComponent
  ],
  imports: [
    CommonModule,
    ProductTypeRoutingModule
  ]
})
export class ProductTypeModule {
}
