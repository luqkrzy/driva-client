import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsListComponent } from './students-list.component';
import { MaterialModule } from '../../shared/material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StudentsListComponent,
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
