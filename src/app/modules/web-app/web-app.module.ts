import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebAppComponent } from './web-app.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from '../auth/components/log-in/log-in.component';
import { HomeComponent } from './components/home/home.component';
import { AddTaskComponent } from './Dialog/add-task/add-task.component';
import { NewsComponent } from './components/news/news.component';
import { TaskManagementComponent } from './components/task-management/task-management.component';
import { CurrentTaskComponent } from './components/current-task/current-task.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { CalenderComponent } from '../../shared/components/calender/calender.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RichTextEditorComponent } from '../../shared/components/rich-text-editor/rich-text-editor.component';
import { QuillModule } from 'ngx-quill';

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
        path: 'task-management',
        component: TaskManagementComponent
      },
      {
        path: 'task/:id',
        component: CurrentTaskComponent,
        data: { prerender: false }
      },
      {
        path: 'news',
        component: NewsComponent
      },
      {
        path: 'schedule',
        component: ScheduleComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
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
    NewsComponent,
    TaskManagementComponent,
    CurrentTaskComponent,
    ScheduleComponent,
    CalenderComponent,
    ProfileComponent,
    RichTextEditorComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    QuillModule.forRoot(),

  ]
})
export class WebAppModule { }
