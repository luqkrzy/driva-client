import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentDetailsRoutingModule } from './student-details-routing.module';
import { StudentDetailsComponent } from './student-details.component';
import { StudentInfoComponent } from './student-info/student-info.component';
import { StudentProductsComponent } from './student-products/student-products.component';
import { StudentLessonsComponent } from './student-lessons/student-lessons.component';
import { MaterialModule } from '../../shared/material/material.module';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StudentDetailsComponent,
    StudentInfoComponent,
    StudentProductsComponent,
    StudentLessonsComponent,
    UpdateProductComponent,
  ],
  imports: [
    CommonModule,
    StudentDetailsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class StudentDetailsModule {
}
