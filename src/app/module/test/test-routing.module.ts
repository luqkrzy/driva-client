import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test.component';
import { DashComponent } from './dash/dash.component';

const routes: Routes = [{path: '', component: TestComponent},
  {path: 'dash', component: DashComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule {
}
