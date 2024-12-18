import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { webComponent } from './web.component';

const routes: Routes = [
  {
    path: '',
    component: webComponent,
  }
];


@NgModule({
  declarations: [webComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class WebModule { }
