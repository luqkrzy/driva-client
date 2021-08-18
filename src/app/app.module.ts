import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthService } from './module/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BreadcrumbModule, BreadcrumbService } from 'xng-breadcrumb';
import { DashComponent } from './module/test/dash/dash.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { AddStudentComponent } from './module/students/add-student/add-student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { interceptorProviders } from './interceptor/interceptors';
import { AppErrorHandler } from './error/app-error-handler';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    PageNotFoundComponent,
    DashComponent,
    AddStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    FlexLayoutModule,
    HttpClientModule,
    BreadcrumbModule,
    ReactiveFormsModule,
    MatGridListModule,
    FormsModule,
    MatDatepickerModule,
  ],
  providers: [AuthService,
              BreadcrumbService,
              interceptorProviders,
              AppErrorHandler,
  ],
  bootstrap: [AppComponent],
  exports: [
    PageNotFoundComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
