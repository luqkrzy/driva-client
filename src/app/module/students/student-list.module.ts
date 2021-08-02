import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsListComponent } from './students-list.component';
import { MaterialModule } from '../../shared/material/material.module';

@NgModule({
  declarations: [
    StudentsListComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MaterialModule,
  ]
})
export class StudentListModule {
}
