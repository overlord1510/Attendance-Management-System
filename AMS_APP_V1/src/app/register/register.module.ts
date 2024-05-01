import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterBatchComponent } from './register-batch/register-batch.component';
import { RegisterCourseComponent } from './register-course/register-course.component';
import { RegisterDepartmentComponent } from './register-department/register-department.component';
import { RegisterInstructorComponent } from './register-instructor/register-instructor.component';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RegisterBatchComponent,
    RegisterCourseComponent,
    RegisterDepartmentComponent,
    RegisterInstructorComponent,
    RegisterStudentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class RegisterModule { }
