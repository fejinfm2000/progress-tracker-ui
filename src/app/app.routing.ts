import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'web',
        loadChildren: () =>
          import('./modules/web/web.module').then((m) => m.WebModule)
      },
      {
        path: 'webApp',
        loadChildren: () =>
          import('./modules/web-app/web-app.module').then((m) => m.WebAppModule)
      },
      {
        path: '**',
        redirectTo: 'web'
      }
    ]
  }
];
