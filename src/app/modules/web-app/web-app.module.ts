import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebAppComponent } from './web-app.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from '../auth/components/log-in/log-in.component';
import { HomeComponent } from './components/home/home.component';
import { AddTaskComponent } from './Dialog/add-task/add-task.component';
import { NewsComponent } from './components/news/news.component';

const routes: Routes = [
  {
    path: '',
    component: WebAppComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'news',
        component: NewsComponent
      },
      {
        path: '',
        redirectTo: '/webApp/home',
        pathMatch: 'full'
      },
    ]
  },

];

@NgModule({
  declarations: [
    WebAppComponent,
    HomeComponent,
    AddTaskComponent,
    NewsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class WebAppModule { }
