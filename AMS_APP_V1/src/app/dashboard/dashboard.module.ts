import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { InstructorComponent } from './instructor/instructor.component';
import { StudentComponent } from './student/student.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { InstructorDashboardComponent } from './instructor/instructor-dashboard/instructor-dashboard.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';



@NgModule({
  declarations: [
    AdminComponent,
    InstructorComponent,
    StudentComponent,
    AdminDashboardComponent,
    InstructorDashboardComponent,
    StudentDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule
  ]
})
export class DashboardModule { }
