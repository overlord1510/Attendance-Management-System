import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concat, concatMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.css']
})
export class AdminDashBoardComponent implements OnInit {


  constructor(private authService: AuthenticationService, private dataService: DataService, private router: Router) { }

  courseCount!: number;
  departmentCount!: number;
  teacherCount!: number;
  studentCount!: number;
  batchCount!: number;

  ngOnInit(): void {

    this.dataService.isLoddedIn().pipe(
      concatMap(res => {
        console.log("Authenticated :: " + res);
        if (!res) {
          this.authService.logout();
          // this.router.navigate(['/']);
        }
        return this.dataService.getCourseCount();;
      }),
      concatMap(res => {
        console.log("Received Course Count :: ", res);
        this.courseCount = res;
        return this.dataService.getDepartmentCount();
      }), concatMap(res => {
        console.log("Received Department Count :: ", res);
        this.departmentCount = res;
        return this.dataService.getTeacherCount();
      }), concatMap(res => {
        console.log("Received Teacher Count :: ", res);
        this.teacherCount = res;
        return this.dataService.getStudentCount();
      }), concatMap(res => {
        console.log("Received Student Count :: ", res);
        this.studentCount = res;
        return this.dataService.getBatchCount();
      })
    ).subscribe(res => {
      console.log("Received Batch Count :: ", res);
      this.batchCount = res;
    });
  }

  public navigateToCourseList(): void {
    this.router.navigate(['/admin/course-list']);
  }

  public navigateToDepartmentList(): void {
    this.router.navigate(['/admin/department-list']);
  }

  public navigateToInstructorList() {
    this.router.navigate(['/admin/instructor-list']);
  }

  public navigateToStudentList() {
    this.router.navigate(['/admin/student-list']);
  }

  public navigateToBatchList() {
    this.router.navigate(['/admin/batch-list']);
  }

  

}
