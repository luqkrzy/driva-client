import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsListComponent } from './students-list.component';
import { MaterialModule } from '../../shared/material/material.module';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    StudentsListComponent,
    StudentDetailsComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MaterialModule,
    LayoutModule,
  ]
})
export class StudentListModule {
}
