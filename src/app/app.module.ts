import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutModule } from './layout/main-layout/main-layout.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { WebFooterComponent } from './layout/footer/web-footer/web-footer.component';
import { AuthComponent } from './modules/auth/auth.component';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { webInterceptor } from './core/interceptors/web.interceptor';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { SharedModule } from './shared/shared.module';
import { webAppInterceptor } from './core/interceptors/web-app.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SpinnerComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([webInterceptor, webAppInterceptor])),

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
