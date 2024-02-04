import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { RegisterModule } from './register/register.module';



@NgModule({
  declarations: [
    LoginComponent,
    NavigationBarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    NavigationBarComponent
  ]
})
export class CoreModule { }
