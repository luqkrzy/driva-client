import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', component: HomeComponent, data: {breadcrumb: {alias: 'Home'}}},
  {path: 'home', redirectTo: ''},
  {path: 'login', loadChildren: () => import('./module/auth/login.module').then(m => m.LoginModule)},
  {path: 'calendar', loadChildren: () => import('./module/calendar/calendar.module').then(m => m.CalendarModule)},
  {path: 'products', loadChildren: () => import('./module/products/products.module').then(m => m.ProductsModule)},
  {path: 'students', loadChildren: () => import('./module/students/student-list.module').then(m => m.StudentListModule)},
  {path: 'account', loadChildren: () => import('./module/account/account.module').then(m => m.AccountModule)},
  {path: 'test', loadChildren: () => import('./module/test/test.module').then(m => m.TestModule)},
  {path: 'product-type', loadChildren: () => import('./module/product-type/product-type.module').then(m => m.ProductTypeModule)},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
