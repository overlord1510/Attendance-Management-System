import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { AdminDashBoardComponent } from './core/dashboard/admin/admin-dash-board/admin-dash-board.component';
import { AdminComponent } from './core/dashboard/admin/admin.component';
import { CourseListComponent } from './core/dashboard/admin/course-list/course-list.component';
import { RegisterCourseComponent } from './core/register/register-course/register-course.component';
import { DepartmentListComponent } from './core/dashboard/admin/department-list/department-list.component';
import { RegisterDepartmentComponent } from './core/register/register-department/register-department.component';
import { InstructorListComponent } from './core/dashboard/admin/instructor-list/instructor-list.component';
import { RegisterInstructorComponent } from './core/register/register-instructor/register-instructor.component';
import { StudentListComponent } from './core/dashboard/admin/student-list/student-list.component';
import { RegisterStudentComponent } from './core/register/register-student/register-student.component';
import { BatchListComponent } from './core/dashboard/admin/batch-list/batch-list.component';
import { RegisterBatchComponent } from './core/register/register-batch/register-batch.component';
import { AssignCourseToInstructorComponent } from './core/dashboard/admin/assign-course-to-instructor/assign-course-to-instructor.component';
import { AssignBatchToInstructorComponent } from './core/dashboard/admin/assign-batch-to-instructor/assign-batch-to-instructor.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: '', component: AdminDashBoardComponent, pathMatch: 'full' },
      { path: 'course-list', component: CourseListComponent, pathMatch: 'full' },
      { path: 'register-course', component: RegisterCourseComponent, pathMatch: 'full' },
      { path: 'update-course/:id', component: RegisterCourseComponent, pathMatch: 'full' },
      { path: 'department-list', component: DepartmentListComponent, pathMatch: 'full' },
      { path: 'register-department', component: RegisterDepartmentComponent, pathMatch: 'full' },
      { path: 'update-department/:id', component: RegisterDepartmentComponent, pathMatch: 'full' },
      { path: 'instructor-list', component: InstructorListComponent, pathMatch: 'full' },
      { path: 'register-instructor', component: RegisterInstructorComponent, pathMatch: 'full' },
      { path: 'update-instructor/:id', component: RegisterInstructorComponent, pathMatch: 'full' },
      { path: 'student-list', component: StudentListComponent, pathMatch: 'full' },
      { path: 'register-student', component: RegisterStudentComponent, pathMatch: 'full' },
      { path: 'update-student/:id', component: RegisterStudentComponent, pathMatch: 'full' },
      { path: 'batch-list', component: BatchListComponent, pathMatch: 'full' },
      { path: 'register-batch', component: RegisterBatchComponent, pathMatch: 'full' },
      { path: 'update-batch/:id', component: RegisterBatchComponent, pathMatch: 'full' },
      { path: 'assign-course/:id', component: AssignCourseToInstructorComponent, pathMatch: 'full' },
      { path: 'assign-batch/:id', component: AssignBatchToInstructorComponent, pathMatch: 'full' }
    ]
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
