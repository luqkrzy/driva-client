import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './module/auth/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', loadChildren: () => import('./module/auth/login.module').then(m => m.LoginModule)},
  {
    path: 'calendar',
    loadChildren: () => import('./module/calendar/calendar.module').then(m => m.CalendarModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
