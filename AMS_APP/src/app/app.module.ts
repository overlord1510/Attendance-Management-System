import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationInterceptor } from './inteceptors/authentication.interceptor';
import { CommonModule } from '@angular/common';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './core/dashboard/dashboard.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    DashboardModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthenticationInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
