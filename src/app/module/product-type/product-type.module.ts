import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTypeRoutingModule } from './product-type-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ProductTypeComponent } from './product-type.component';



@NgModule({
  declarations: [
    ProductTypeComponent
  ],
  imports: [
    CommonModule,
    ProductTypeRoutingModule,
    MaterialModule
  ]
})
export class ProductTypeModule { }
