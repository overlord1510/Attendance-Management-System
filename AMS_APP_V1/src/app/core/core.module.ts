import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { CourseListComponent } from './course-list/course-list.component';
import { AssignBatchToInstructorComponent } from './assign-batch-to-instructor/assign-batch-to-instructor.component';
import { AssignCourseToInstructorComponent } from './assign-course-to-instructor/assign-course-to-instructor.component';
import { BatchListComponent } from './batch-list/batch-list.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { InstructorListComponent } from './instructor-list/instructor-list.component';
import { RemoveListComponent } from './remove-list/remove-list.component';
import { StudentGroupsComponent } from './student-groups/student-groups.component';
import { StudentListComponent } from './student-list/student-list.component';
import { InstructorDetailsComponent } from './instructor-details/instructor-details.component';
import { AssignAttendanceComponent } from './assign-attendance/assign-attendance.component';
import { RecoverComponent } from './recover/recover.component';
import { ValidateOtpComponent } from './validate-otp/validate-otp.component';
import { ChangePasswordComponent } from './change-password/change-password.component';



@NgModule({
  declarations: [
    LoginComponent,
    NavigationBarComponent,
    CourseListComponent,
    AssignBatchToInstructorComponent,
    AssignCourseToInstructorComponent,
    BatchListComponent,
    DepartmentListComponent,
    InstructorListComponent,
    RemoveListComponent,
    StudentGroupsComponent,
    StudentListComponent,
    InstructorDetailsComponent,
    AssignAttendanceComponent,
    RecoverComponent,
    ValidateOtpComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],exports:[
    NavigationBarComponent
  ]
})
export class CoreModule { }
