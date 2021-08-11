import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonsRoutingModule } from './lessons-routing.module';
import { LessonsComponent } from './lessons.component';
import { MaterialModule } from '../../shared/material/material.module';

@NgModule({
  declarations: [
    LessonsComponent
  ],
  imports: [
    CommonModule,
    LessonsRoutingModule,
    MaterialModule
  ]
})
export class LessonsModule {
}
