import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StudentResolver } from './resolver/student.resolver';
import { InstructorResolver } from './resolver/instructor.resolver';

const routes: Routes = [
  {path: '', component: HomeComponent, data: {breadcrumb: {alias: 'Home'}}},
  {path: 'home', redirectTo: ''},
  {path: 'login', loadChildren: () => import('./module/auth/login.module').then(m => m.LoginModule)},
  {path: 'products', loadChildren: () => import('./module/products/products.module').then(m => m.ProductsModule)},
  {path: 'students', loadChildren: () => import('./module/students/student-list.module').then(m => m.StudentListModule)},
  {path: 'account', loadChildren: () => import('./module/account/account.module').then(m => m.AccountModule)},
  {path: 'test', loadChildren: () => import('./module/test/test.module').then(m => m.TestModule)},
  {path: 'product-type', loadChildren: () => import('./module/product-type/product-type.module').then(m => m.ProductTypeModule)},
  {path: 'lessons', loadChildren: () => import('./module/lessons/lessons.module').then(m => m.LessonsModule)},
  {path: 'instructors', loadChildren: () => import('./module/instructors/instructors.module').then(m => m.InstructorsModule)},
  {
    path: 'students/:id', loadChildren: () => import('./module/student-details/student-details.module').then(m => m.StudentDetailsModule),
    resolve: {student: StudentResolver}
  },
  {
    path: 'instructors/:id/calendar', loadChildren: () => import('./module/calendar/calendar.module').then(m => m.CalendarModule),
    resolve: {instructor: InstructorResolver}
  },
  {path: '**', component: PageNotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
