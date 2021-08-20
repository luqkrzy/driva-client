import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorsComponent } from './instructors.component';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { lvl2 } from '../auth/roles';
import { AddInstructorComponent } from './add-instructor/add-instructor.component';

const routes: Routes = [
  {path: '', component: InstructorsComponent, canActivate: [AuthGuard, RoleGuard], data: {role: lvl2}},
  {path: 'details', component: AddInstructorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorsRoutingModule {
}
