import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTypeRoutingModule } from './product-type-routing.module';
import { ProductTypeComponent } from './product-type.component';

@NgModule({
  declarations: [
    ProductTypeComponent
  ],
  imports: [
    CommonModule,
    ProductTypeRoutingModule
  ]
})
export class ProductTypeModule {
}
