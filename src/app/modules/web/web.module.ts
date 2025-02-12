import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { webComponent } from './web.component';
import { WebHeaderComponent } from '../../layout/global-header/web-header/web-header.component';
import { WebHomeComponent } from './components/web-home/web-home.component';
import { WebAboutComponent } from './components/web-about/web-about.component';
import { WebContactComponent } from './components/web-contact/web-contact.component';
import { WebFooterComponent } from '../../layout/footer/web-footer/web-footer.component';
import { WebFeaturesComponent } from './components/web-features/web-features.component';
import { WebTeamComponent } from './components/web-team/web-team.component';

const routes: Routes = [
  {
    path: '',
    component: webComponent,
  }
];


@NgModule({
  declarations: [webComponent,
    WebHeaderComponent,
    WebHomeComponent,
    WebAboutComponent,
    WebContactComponent,
    WebFooterComponent,
    WebFeaturesComponent,
    WebTeamComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class WebModule { }
