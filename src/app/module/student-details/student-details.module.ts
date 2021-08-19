import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentDetailsRoutingModule } from './student-details-routing.module';
import { StudentDetailsComponent } from './student-details.component';
import { StudentInfoComponent } from './student-info/student-info.component';
import { StudentProductsComponent } from './student-products/student-products.component';
import { StudentLessonsComponent } from './student-lessons/student-lessons.component';
import { MaterialModule } from '../../shared/material/material.module';
import { UpdateProductComponent } from './update-product/update-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateStudentAccountComponent } from './update-student-account/update-student-account.component';
import { AddLessonComponent } from './add-lesson/add-lesson.component';
import { UpdateLessonComponent } from './update-lesson/update-lesson.component';

@NgModule({
  declarations: [
    StudentDetailsComponent,
    StudentInfoComponent,
    StudentProductsComponent,
    StudentLessonsComponent,
    UpdateProductComponent,
    DeleteDialogComponent,
    AddProductComponent,
    UpdateStudentAccountComponent,
    AddLessonComponent,
    UpdateLessonComponent,
  ],
  imports: [
    CommonModule,
    StudentDetailsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class StudentDetailsModule {
}
