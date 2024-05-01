import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { concatMap } from 'rxjs';
import { BatchResponse } from 'src/app/models/batch-response';
import { CourseResponse } from 'src/app/models/course-response';
import { DepartmentResponse } from 'src/app/models/department-response';
import { RegisterBatchRequest } from 'src/app/models/register-batch-request';
import { DataService } from 'src/app/services/data.service';
import { RegisterService } from 'src/app/services/register.service';
import { UpdateService } from 'src/app/services/update.service';

@Component({
  selector: 'app-register-batch',
  templateUrl: './register-batch.component.html',
  styleUrls: ['./register-batch.component.css']
})
export class RegisterBatchComponent implements OnInit, AfterViewInit {
  private batch_req: RegisterBatchRequest;
  private batch_resp: BatchResponse;

  protected department_resp: DepartmentResponse[] = [];
  protected filteredCourse: CourseResponse[] = [];
  private courseList: CourseResponse[] = [];
  protected isUpdating: boolean = false;
  batchForm: FormGroup;

  protected filterOptions = {
    sem: '',
    batchType: ''
  }


  constructor(private dataService: DataService, private registerService: RegisterService, private route: ActivatedRoute, private updateService: UpdateService,private elementRef:ElementRef) {
    this.batchForm = new FormGroup({
      batchName: new FormControl('', [Validators.required]),
      batchType: new FormControl('', [Validators.required]),
      semester: new FormControl('', [Validators.required]),
      department: new FormControl('Select Department', [Validators.required, this.departmentValidator('Select Department')]),
      courses: new FormArray([], [this.atLeastOneSelectedValidator()])
    });

    this.batch_req = {
      batchName: '',
      batchType: '',
      courses: [],
      department: {
        id: -1,
        name: ''
      },
      semester: ''
    };

    this.batch_resp = {
      id: -1,
      batchName: '',
      batchType: '',
      courses: [],
      department: {
        id: -1,
        name: ''
      },
      semester: ''
    };

    if (route.snapshot.params['id']) {
      this.isUpdating = true;
    }

  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor='#D4E7C5';
  }

  ngOnInit(): void {
    if (!this.isUpdating) {
      this.dataService.isLoddedIn().pipe(
        concatMap(() => {
          return this.dataService.getDepartmentList();
        }), concatMap((res) => {
          this.department_resp = res;
          return this.dataService.getCourseList();
        })
      ).subscribe((res) => {
        this.courseList = res;
      });
    } else {
      this.dataService.isLoddedIn().pipe(
        concatMap(() => {
          return this.dataService.getBatchById(this.route.snapshot.params['id']);
        }),
        concatMap((res) => {
          this.batch_resp = res;
          console.log(this.batch_resp.courses)
          return this.dataService.getDepartmentList();
        }), concatMap((res) => {
          this.department_resp = res;
          return this.dataService.getCourseList();
        })
      ).subscribe((res) => {
        this.courseList = res;
        this.populateFormWithData();
      });
    }

    this.coursesFormArray.valueChanges.subscribe(() => {
      this.batchForm.updateValueAndValidity();
    });

  }
  departmentValidator(defaultString: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedValue = control.value;
      if (selectedValue === defaultString) {
        return { invalidDepartment: true };
      }
      return null;
    }
  }

  atLeastOneSelectedValidator(): ValidatorFn {
    console.log("validation");
    return (control: AbstractControl): ValidationErrors | null => {
      const formArray = control as FormArray;
      const selectedCourses = formArray.controls.some((control) => control.value === true);

      return selectedCourses ? null : { noCoursesSelected: true };
    };
  }

  onSelectChange($event: Event, selected: string) {
    if (selected === 'batchType')
      this.filterOptions.batchType = ($event.target as HTMLSelectElement).value;
    else if (selected === 'sem')
      this.filterOptions.sem = ($event.target as HTMLSelectElement).value;

    // if (this.filteredCourse.length == 0 && this.filterOptions.sem)
    //   this.filteredCourse = [...this.courseList];
    this.filterCourseList();
  }

  filterCourseList(): void {
    this.filteredCourse = [...this.courseList];
    this.coursesFormArray.clear();

    if (this.filterOptions.batchType) {
      this.filteredCourse = this.filteredCourse.filter((course) => course.courseType === this.filterOptions.batchType);
    }

    if (this.filterOptions.sem) {
      this.filteredCourse = this.filteredCourse.filter((course) => course.semester === this.filterOptions.sem);
      this.updateCoursesFormArray();
    }

  }

  private populateFormWithData() {
    console.log("In populate data", this.batch_resp);
    this.filterOptions.batchType = this.batch_resp.batchType;
    this.filterOptions.sem = this.batch_resp.semester;
    this.batchForm.get('batchName')!.patchValue(this.batch_resp.batchName);
    this.batchForm.get('batchType')!.patchValue(this.batch_resp.batchType);
    this.batchForm.get('department')!.patchValue(this.batch_resp.department.id);
    this.batchForm.get('semester')!.patchValue(this.batch_resp.semester);
    this.filterCourseList();
  }

  updateCoursesFormArray(): void {

    this.filteredCourse.forEach((course) => {
      const isSelected = this.batch_resp.courses?.some((c) => c.id === course.id)
      this.coursesFormArray.push(new FormControl(isSelected));
    });

  }

  get coursesFormArray() {
    return this.batchForm.get('courses') as FormArray;
  }

  onSubmit() {
    console.log(this.batchForm.get('courses')?.value);
    const batch_course: CourseResponse[] = [];
    this.coursesFormArray.controls.filter((control, index) => {
      if (control.value) {
        batch_course.push(this.filteredCourse[index])
      }
    });
    const dept = this.department_resp.find((dept) => dept.id == this.batchForm.get('department')!.value);

    if (!this.isUpdating) {
      this.batch_req.batchName = this.batchForm.get('batchName')!.value;
      this.batch_req.batchType = this.batchForm.get('batchType')!.value;
      this.batch_req.semester = this.batchForm.get('semester')!.value;
      this.batch_req.courses = batch_course;
      if (dept) {
        this.batch_req.department = dept;
      }
      console.log(this.batch_req);
      this.registerService.saveBatch(this.batch_req).subscribe((res) => {
        this.batchForm.reset();
        this.back();
      });
    } else {
      this.batch_resp.batchName = this.batchForm.get('batchName')!.value;
      this.batch_resp.batchType = this.batchForm.get('batchType')!.value;
      this.batch_resp.semester = this.batchForm.get('semester')!.value;
      this.batch_resp.courses = batch_course;
      if (dept) {
        this.batch_resp.department = dept;
      }
      console.log(this.batch_resp);
      this.updateService.updateBatch(this.batch_resp).subscribe(() => {
        console.log('Batch Updated with id', this.batch_resp.id);
        this.batchForm.reset();
        this.back();
      });
    }
  }

  back() {
    history.back();
  }
}
