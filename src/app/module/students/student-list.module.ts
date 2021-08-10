import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsListComponent } from './students-list.component';
import { MaterialModule } from '../../shared/material/material.module';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { LayoutModule } from '@angular/cdk/layout';
import { StudentAccountComponent } from './student-details/student-account/student-account.component';
import { StudentProductsComponent } from './student-details/student-products/student-products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddLessonComponent } from './student-details/add-lesson/add-lesson.component';

@NgModule({
  declarations: [
    StudentsListComponent,
    StudentDetailsComponent,
    StudentAccountComponent,
    StudentProductsComponent,
    AddLessonComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MaterialModule,
    LayoutModule,
    ReactiveFormsModule,
  ]
})
export class StudentListModule {
}
