import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseResponse } from 'src/app/models/course-response';
import { RegisterCourseRequest } from 'src/app/models/register-course-request';
import { DataService } from 'src/app/services/data.service';
import { RegisterService } from 'src/app/services/register.service';
import { UpdateService } from 'src/app/services/update.service';

@Component({
  selector: 'app-register-course',
  templateUrl: './register-course.component.html',
  styleUrls: ['./register-course.component.css']
})
export class RegisterCourseComponent implements OnInit, AfterViewInit {
  private course_req: RegisterCourseRequest;
  private isUpdating: boolean = false;
  private course_resp: CourseResponse;

  courseForm: FormGroup = new FormGroup({
    courseName: new FormControl("", [Validators.required]),
    courseCode: new FormControl("", [Validators.required]),
    courseType: new FormControl("", [Validators.required]),
    semester: new FormControl("", [Validators.required])

  });

  constructor(private registerService: RegisterService,
    private dataService: DataService, private route: ActivatedRoute,
    private router: Router, private updateService: UpdateService, private elementRef: ElementRef) {


    this.course_req = {
      courseCode: "",
      courseName: "",
      courseType: "",
      semester: ""
    };

    this.course_resp = {
      id: -1,
      courseName: '',
      courseCode: '',
      courseType: '',
      semester: ''
    }

  }

  ngOnInit(): void {
    this.dataService.isLoddedIn().subscribe({
      next: res => console.log("Authenticated ::", res)
    });
    if (this.route.snapshot.params['id']) {

      this.isUpdating = true;
      this.course_resp.id = this.route.snapshot.params['id'];

      this.dataService.getCourseById(this.route.snapshot.params['id']).subscribe({
        next: (res) => {
          this.courseForm.controls['courseName'].patchValue(res.courseName);
          this.courseForm.controls['courseCode'].patchValue(res.courseCode);
          this.courseForm.controls['courseType'].patchValue(res.courseType);
          this.courseForm.controls['semester'].patchValue(res.semester);
        },
        error: err => {
          if (err.status === 404) {
            history.back();
          }
        }
      });
    }

  }


  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#D4E7C5';
  }

  back(): void {
    history.back();
  }

  saveDetails() {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    }
  }

  onSubmit(): void {
    this.saveDetails();

    if (this.courseForm.valid) {
      if (!this.isUpdating) {
        this.course_req.courseName = this.courseForm.controls['courseName'].value;
        this.course_req.courseCode = this.courseForm.controls['courseCode'].value;
        this.course_req.courseType = this.courseForm.controls['courseType'].value;
        this.course_req.semester = this.courseForm.controls['semester'].value;
        console.log(this.course_req);

        this.registerService.saveCourse(this.course_req).subscribe({
          next: () => {
            this.courseForm.reset();
            this.back();
          }, error: err => console.log(err)
        });
      } else {
        this.course_resp.courseName = this.courseForm.controls['courseName'].value;
        this.course_resp.courseCode = this.courseForm.controls['courseCode'].value;
        this.course_resp.courseType = this.courseForm.controls['courseType'].value;
        this.course_resp.semester = this.courseForm.controls['semester'].value;
        console.log(this.course_resp);
        this.updateService.updateCourse(this.course_resp).subscribe({
          next: () => {
            this.courseForm.reset();
            this.router.navigate(['/admin/course-list']);
          }, error: err => console.log(err)
        });
      }
    }
    
  }
}
