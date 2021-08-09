import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsListComponent } from './students-list.component';
import { MaterialModule } from '../../shared/material/material.module';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatRippleModule } from '@angular/material/core';
import { StudentAccountComponent } from './student-details/student-account/student-account.component';
import { StudentProductsComponent } from './student-details/student-products/student-products.component';

@NgModule({
  declarations: [
    StudentsListComponent,
    StudentDetailsComponent,
    StudentAccountComponent,
    StudentProductsComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MaterialModule,
    LayoutModule,
    MatRippleModule,
  ]
})
export class StudentListModule {
}
