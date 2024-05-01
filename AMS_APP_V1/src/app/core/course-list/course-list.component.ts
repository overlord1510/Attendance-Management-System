import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs';
import { CourseResponse } from 'src/app/models/course-response';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit,AfterViewInit {
  courseList!: CourseResponse[];

  constructor(private dataService: DataService, private authService: AuthenticationService, private router: Router,private elementRef:ElementRef) { }


  ngOnInit(): void {
    this.dataService.isLoddedIn().pipe(
      concatMap((res) => {
        if (!res) {
          this.authService.logout();
        }
        return this.dataService.getCourseList();
      }),
    ).subscribe((res) => {
      this.courseList = res;
    }
    );
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor='#D4E7C5';
  }

  navigateToRegisterCourse(): void {
    this.router.navigate(['/admin/register-course'])
  }

  editCourse(id: number) {
    console.log(id);
    this.router.navigate(['/admin/update-course', id]);
  }

  private val: boolean = false;
  deleteCourse(id: number) {
    this.val = confirm("Delete Course with id " + id);
    if(this.val){
      this.dataService.deleteCourseById(id).subscribe({
        next:()=>{
          console.log("Course deleted "+id);
          this.dataService.getCourseList().subscribe((res) => {
              this.courseList = res;
            }
          );
        },error:(err)=>{
          console.log(err.status);
        }
      });
    }
  }

}
