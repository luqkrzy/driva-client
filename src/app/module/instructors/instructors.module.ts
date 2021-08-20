import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorsRoutingModule } from './instructors-routing.module';
import { InstructorsComponent } from './instructors.component';
import { MaterialModule } from '../../shared/material/material.module';
import { AddInstructorComponent } from './add-instructor/add-instructor.component';

@NgModule({
  declarations: [
    InstructorsComponent,
    AddInstructorComponent
  ],
  imports: [
    CommonModule,
    InstructorsRoutingModule,
    MaterialModule,
  ]
})
export class InstructorsModule {
}
