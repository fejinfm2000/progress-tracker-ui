import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebAppComponent } from './web-app.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from '../auth/components/log-in/log-in.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: WebAppComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    WebAppComponent,
    HomeComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class WebAppModule { }
