import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardModule } from './dashboard/dashboard.module';
import { RegisterModule } from './register/register.module';
import { CoreModule } from './core/core.module';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CoreModule,
    DashboardModule,
    RegisterModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthenticationInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
