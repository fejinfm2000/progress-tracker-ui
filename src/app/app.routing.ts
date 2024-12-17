import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path:'',
    component:MainLayoutComponent,
    children:[
      {
        path:'dashboard',
        loadChildren:()=>
          import('./modules/dashboard/dashboard.module').then((m)=>m.DashboardModule)
      },
      {
        path:'**',
        redirectTo:'dashboard'
      }
    ]
  }
];
