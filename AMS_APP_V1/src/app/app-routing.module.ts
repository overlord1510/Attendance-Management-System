import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { AdminDashboardComponent } from './dashboard/admin/admin-dashboard/admin-dashboard.component';
import { CourseListComponent } from './core/course-list/course-list.component';
import { RegisterCourseComponent } from './register/register-course/register-course.component';
import { DepartmentListComponent } from './core/department-list/department-list.component';
import { RegisterDepartmentComponent } from './register/register-department/register-department.component';
import { InstructorListComponent } from './core/instructor-list/instructor-list.component';
import { RegisterInstructorComponent } from './register/register-instructor/register-instructor.component';
import { StudentListComponent } from './core/student-list/student-list.component';
import { RegisterStudentComponent } from './register/register-student/register-student.component';
import { BatchListComponent } from './core/batch-list/batch-list.component';
import { RegisterBatchComponent } from './register/register-batch/register-batch.component';
import { AssignCourseToInstructorComponent } from './core/assign-course-to-instructor/assign-course-to-instructor.component';
import { AssignBatchToInstructorComponent } from './core/assign-batch-to-instructor/assign-batch-to-instructor.component';
import { StudentGroupsComponent } from './core/student-groups/student-groups.component';
import { RemoveListComponent } from './core/remove-list/remove-list.component';
import { InstructorDetailsComponent } from './core/instructor-details/instructor-details.component';
import { AssignAttendanceComponent } from './core/assign-attendance/assign-attendance.component';
import { InstructorComponent } from './dashboard/instructor/instructor.component';
import { InstructorDashboardComponent } from './dashboard/instructor/instructor-dashboard/instructor-dashboard.component';
import { StudentComponent } from './dashboard/student/student.component';
import { StudentDashboardComponent } from './dashboard/student/student-dashboard/student-dashboard.component';
import { RecoverComponent } from './core/recover/recover.component';
import { ValidateOtpComponent } from './core/validate-otp/validate-otp.component';
import { ChangePasswordComponent } from './core/change-password/change-password.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: '', component: AdminDashboardComponent, pathMatch: 'full' },
      { path: 'course-list', component: CourseListComponent, pathMatch: 'full' },
      { path: 'register-course', component: RegisterCourseComponent, pathMatch: 'full' },
      { path: 'update-course/:id', component: RegisterCourseComponent, pathMatch: 'full' },
      { path: 'department-list', component: DepartmentListComponent, pathMatch: 'full' },
      { path: 'register-department', component: RegisterDepartmentComponent, pathMatch: 'full' },
      { path: 'update-department/:id', component: RegisterDepartmentComponent, pathMatch: 'full' },
      { path: 'instructor-list', component: InstructorListComponent, pathMatch: 'full' },
      { path: 'register-instructor', component: RegisterInstructorComponent, pathMatch: 'full' },
      { path: 'update-instructor/:id', component: RegisterInstructorComponent, pathMatch: 'full' },
      { path: 'instructor-details/:id', component: InstructorDetailsComponent, pathMatch: 'full' },
      { path: 'student-list', component: StudentListComponent, pathMatch: 'full' },
      { path: 'register-student', component: RegisterStudentComponent, pathMatch: 'full' },
      { path: 'update-student/:id', component: RegisterStudentComponent, pathMatch: 'full' },
      { path: 'batch-list', component: BatchListComponent, pathMatch: 'full' },
      { path: 'register-batch', component: RegisterBatchComponent, pathMatch: 'full' },
      { path: 'update-batch/:id', component: RegisterBatchComponent, pathMatch: 'full' },
      { path: 'assign-course/:id', component: AssignCourseToInstructorComponent, pathMatch: 'full' },
      { path: 'assign-batch/:id', component: AssignBatchToInstructorComponent, pathMatch: 'full' },
      { path: 'assign-attendance', component: AssignAttendanceComponent, pathMatch: 'full' },
      { path: 'remove-passouts', component: StudentGroupsComponent, pathMatch: 'full' },
      { path: 'remove-students', component: RemoveListComponent, pathMatch: 'full' },

    ]
  },
  {
    path: 'instructor', component: InstructorComponent,
    children: [
      { path: '', component: InstructorDashboardComponent, pathMatch: 'full' },
      { path: 'assign-attendance', component: AssignAttendanceComponent, pathMatch: 'full' }
    ]
  },
  {
    path: 'student', component: StudentComponent,
    children: [
      { path: '', component: StudentDashboardComponent, pathMatch: 'full' },
    ]
  },
  {
    path: 'recover', component: RecoverComponent, pathMatch: 'full'
  },
  {
    path: 'validate-otp', component: ValidateOtpComponent, pathMatch: 'full'
  },
  {
    path: 'change-password', component: ChangePasswordComponent, pathMatch: 'full'
  },
  {
    path: 'register', component: RegisterStudentComponent, pathMatch: 'full'
  },
  {
    path: '', component: LoginComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
