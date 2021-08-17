import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentDetailsRoutingModule } from './student-details-routing.module';
import { StudentDetailsComponent } from './student-details.component';
import { StudentInfoComponent } from './student-info/student-info.component';
import { StudentProductsComponent } from './student-products/student-products.component';
import { StudentLessonsComponent } from './student-lessons/student-lessons.component';
import { MaterialModule } from '../../shared/material/material.module';

@NgModule({
  declarations: [
    StudentDetailsComponent,
    StudentInfoComponent,
    StudentProductsComponent,
    StudentLessonsComponent,
  ],
  imports: [
    CommonModule,
    StudentDetailsRoutingModule,
    MaterialModule,
  ]
})
export class StudentDetailsModule {
}
