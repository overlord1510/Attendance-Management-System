import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashBoardComponent } from './admin/admin-dash-board/admin-dash-board.component';
import { AdminComponent } from './admin/admin.component';
import { CourseListComponent } from './admin/course-list/course-list.component';
import { RouterModule } from '@angular/router';
import { DepartmentListComponent } from './admin/department-list/department-list.component';
import { InstructorListComponent } from './admin/instructor-list/instructor-list.component';
import { StudentListComponent } from './admin/student-list/student-list.component';
import { BatchListComponent } from './admin/batch-list/batch-list.component';
import { AssignCourseToInstructorComponent } from './admin/assign-course-to-instructor/assign-course-to-instructor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AssignBatchToInstructorComponent } from './admin/assign-batch-to-instructor/assign-batch-to-instructor.component';



@NgModule({
  declarations: [
    AdminDashBoardComponent,
    AdminComponent,
    CourseListComponent,
    DepartmentListComponent,
    InstructorListComponent,
    StudentListComponent,
    BatchListComponent,
    AssignCourseToInstructorComponent,
    AssignBatchToInstructorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
