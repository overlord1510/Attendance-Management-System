import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterCourseComponent } from './register-course/register-course.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterDepartmentComponent } from './register-department/register-department.component';
import { RegisterInstructorComponent } from './register-instructor/register-instructor.component';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { RegisterBatchComponent } from './register-batch/register-batch.component';



@NgModule({
  declarations: [
    RegisterCourseComponent,
    RegisterDepartmentComponent,
    RegisterInstructorComponent,
    RegisterStudentComponent,
    RegisterBatchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class RegisterModule { }
