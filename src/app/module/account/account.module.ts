import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { MaterialModule } from '../../shared/material/material.module';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MaterialModule,
    MatGridListModule
  ]
})
export class AccountModule {
}
