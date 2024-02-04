import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { concatMap } from 'rxjs/operators';
import { CourseResponse } from 'src/app/models/course-response';
import { DepartmentResponse } from 'src/app/models/department-response';
import { InstructorResponse } from 'src/app/models/instructor-response';
import { DataService } from 'src/app/services/data.service';
import { UpdateService } from 'src/app/services/update.service';

@Component({
  selector: 'app-assign-course-to-instructor',
  templateUrl: './assign-course-to-instructor.component.html',
  styleUrls: ['./assign-course-to-instructor.component.css']
})
export class AssignCourseToInstructorComponent implements OnInit {
  instructor_resp: InstructorResponse;
  deptList: DepartmentResponse[] = [];
  courseList: CourseResponse[] = [];
  selectedCourseFormList: CourseResponse[] = [];
  filteredCourseList: CourseResponse[] = [];

  private filterOptions = {
    sem: '',
    courseType: ''
  }

  courseForm: FormGroup = new FormGroup({
    courses: new FormArray([
    ])
  });

  constructor(private dataService: DataService, private route: ActivatedRoute,private updateService:UpdateService) {
    this.instructor_resp = {
      id: -1,
      name: '',
      department: {
        id: -1,
        name: ''
      },
      dob: new Date(),
      gender: '',
      userAuth: {
        id: -1,
        email: '',
        password: '',
        role: ''
      },
      courses: []
    };
  }

  ngOnInit(): void {
    this.dataService.isLoddedIn().pipe(
      concatMap(() => this.dataService.getCourseList()),
      concatMap((res) => {
        this.courseList = res;
        this.filteredCourseList = res;
        return this.dataService.getDepartmentList();
      }),
      concatMap((res) => {
        this.deptList = res;
        return this.dataService.getInstructorById(this.route.snapshot.params['id']);
      })
    ).subscribe({
      next: (res) => {
        this.instructor_resp = res;
      },
      error: (err) => {
        console.log(err);
      }, complete: () => {
        this.updateCoursesFormArray(this.courseList);
      }
    });
  }

  private updateCoursesFormArray(list: any) {
    const coursesFormArray = this.courseForm.get('courses') as FormArray;

    list.forEach((course: CourseResponse) => {
      const isSelected = this.instructor_resp.courses?.some((c) => c.id === course.id);
      coursesFormArray.push(new FormControl(isSelected));
    });
  }

  onCourseSelect(index: number) {
    const selectedCourse = this.filteredCourseList[index];

    if (selectedCourse) {
      const isInstructorCourse = this.instructor_resp.courses?.some(course => course.id === selectedCourse.id);

      if (isInstructorCourse) {
        this.instructor_resp.courses = this.instructor_resp.courses?.filter(course => course.id !== selectedCourse.id);
      } else {
        this.instructor_resp.courses?.push(selectedCourse);
      }
    }
  }


  get coursesFormArray() {
    return this.courseForm.get('courses') as FormArray;
  }

  onSelectEvent(event: any, filterOption: string) {

    if (filterOption === 'sem') {
      this.filterOptions.sem = event.target.value;
    } else if (filterOption === 'courseType') {
      this.filterOptions.courseType = event.target.value;
    }
    this.filterCourseList();
  }

  filterCourseList() {
    this.coursesFormArray.clear();

    this.filteredCourseList = [...this.courseList];

    if (this.filterOptions.sem)
      this.filteredCourseList = this.filteredCourseList.filter((course) => course.semester == this.filterOptions.sem && course.courseType);

    if (this.filterOptions.courseType)
      this.filteredCourseList = this.filteredCourseList.filter((course) => course.courseType == this.filterOptions.courseType);
    this.updateCoursesFormArray(this.filteredCourseList);
  }

  back():void{
    history.back();
  }

  onSubmit(): void {
    this.courseForm.reset();
    console.log(this.instructor_resp);
    this.updateService.updateInstructor(this.instructor_resp).subscribe(()=>{
      console.log("Instructor updated :: ",this.instructor_resp.id," ",this.instructor_resp.name);
      
    });
  }
}
