import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsListComponent } from './students-list.component';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { lvl2 } from '../auth/roles';

const routes: Routes = [
  {path: '', component: StudentsListComponent, canActivate: [AuthGuard, RoleGuard], data: {role: lvl2}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule {
}
