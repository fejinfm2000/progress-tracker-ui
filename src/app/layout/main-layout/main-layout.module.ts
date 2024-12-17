import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { DashboardModule } from '../../modules/dashboard/dashboard.module';
import { AppRoutingModule } from '../../app-routing.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    DashboardModule,
    SharedModule
  ]
})
export class MainLayoutModule { }
