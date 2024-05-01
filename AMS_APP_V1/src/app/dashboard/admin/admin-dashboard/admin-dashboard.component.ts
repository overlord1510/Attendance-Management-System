import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs';
import { BatchesOfInstructor } from 'src/app/models/batches-of-instructor';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {

  courseCount!: number;
  departmentCount!: number;
  teacherCount!: number;
  studentCount!: number;
  batchCount!: number;
  assignedBatchList: BatchesOfInstructor[] = [];
  role: string;

  constructor(private authService: AuthenticationService, private dataService: DataService, private router: Router, private elementRef: ElementRef) {
    this.role='';
  }

  ngOnInit(): void {

    this.dataService.isLoddedIn().pipe(
      concatMap(res => {
        console.log("Authenticated :: " + res);
        if (!res) {
          this.authService.logout();
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
      }), concatMap((res) => {
        console.log("Received Batch Count :: ", res);
        this.batchCount = res;
        return this.dataService.getAssignedBatches();
      })
    ).subscribe(res => {
      this.assignedBatchList = res;
      console.log(res);
    });
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#D4E7C5';
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

  public navigateToAssignAttendance(batchId: number, courseId: number): void {
    this.router.navigate(['/admin/assign-attendance'], { queryParams: { batchId, courseId } });
  }

  public navigateToPassout() {
    this.router.navigate(['/admin/remove-passouts']);
  }
}
