import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DepartmentResponse } from 'src/app/models/department-response';
import { InstructorResponse } from 'src/app/models/instructor-response';
import { RegisterInstructorRequest } from 'src/app/models/register-instructor-request';
import { DataService } from 'src/app/services/data.service';
import { RegisterService } from 'src/app/services/register.service';
import { UpdateService } from 'src/app/services/update.service';

@Component({
  selector: 'app-register-instructor',
  templateUrl: './register-instructor.component.html',
  styleUrls: ['./register-instructor.component.css']
})
export class RegisterInstructorComponent implements OnInit,AfterViewInit {
  department_resp: DepartmentResponse[] = [];
  private instructor_req: RegisterInstructorRequest;
  private isUpdating: boolean = false;
  private instructor_resp: InstructorResponse;

  instructorForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    dob: new FormControl('', [Validators.required]),
    department: new FormControl('Select Department', [Validators.required, this.departmentValidator("Select Department")]),
    gender: new FormControl('', [Validators.required]),
  });

  constructor(private dataService: DataService, private route: ActivatedRoute,
    private registerService: RegisterService, private updateService: UpdateService,private elementRef:ElementRef) {

      this.instructor_req = {
        name: '',
        department: {
          id: -1,
          name: ''
        },
        dob: '',
        email: '',
        gender: '',
        password: ''
      };
      
      this.instructor_resp = {
        id: -1,
        name: '',
        userAuth: {
          id: -1,
          email: '',
          password: '',
        role: ''
      },
      department: {
        id: -1,
        name: ''
      },
      dob: new Date(),
      gender: '',
      courses: []
    };
    
    if (route.snapshot.params['id']) {
      this.isUpdating = true;
      this.instructorForm.controls['password'].disable();
    }
    
  }
  
  departmentValidator(defaultValue: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedValue = control.value;
      
      if (selectedValue === defaultValue) {
        return { invalidDepartment: true };
      }
      
      return null;
    };
  }
  
  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor='#D4E7C5';
  }

  ngOnInit(): void {
    this.dataService.isLoddedIn().subscribe((res) => {
      console.log(res);
    });
    this.dataService.getDepartmentList().subscribe(
      {
        next: (res) => {
          this.department_resp = res;
        }, error: (err) => {
          console.log(err);
        }, complete: () => {
          if (this.isUpdating) {
            this.dataService.getInstructorById(this.route.snapshot.params['id']).subscribe((res) => {
              this.instructor_resp.id = res.id;
              this.instructor_resp.userAuth.id = res.userAuth.id;
              this.instructor_resp.userAuth.role = res.userAuth.role;
              this.instructorForm.controls['name'].patchValue(res.name);
              this.instructorForm.controls['email'].patchValue(res.userAuth.email);
              this.instructorForm.controls['password'].patchValue(res.userAuth.password);
              this.instructor_resp.courses = res.courses;
              this.instructorForm.controls['department'].patchValue(res.department.id);
              this.instructorForm.controls['dob'].patchValue(res.dob.toString().substring(0, 10));
              this.instructorForm.controls['gender'].patchValue(res.gender);
            });
          }
        }
      }
    );
  }

  back() {
    history.back();
  }

  saveDetails() {
    if (this.instructorForm.invalid) {
      this.instructorForm.markAllAsTouched();
    }
  }

  onSubmit() {

    this.saveDetails();

    if(this.instructorForm.valid){
      if (!this.isUpdating) {
        this.instructor_req.name = this.instructorForm.controls['name'].value;
        this.instructor_req.email = this.instructorForm.controls['email'].value;
        this.instructor_req.password = this.instructorForm.controls['password'].value;
        this.instructor_req.dob = this.instructorForm.controls['dob'].value;
        this.instructor_req.gender = this.instructorForm.controls['gender'].value;
        var dept = this.department_resp.find(dept => dept.id == this.instructorForm.controls['department'].value);
        if (dept) {
          this.instructor_req.department.id = dept.id;
          this.instructor_req.department.name = dept.name;
        }
        this.registerService.saveInstructor(this.instructor_req).subscribe({
          next: () => {
            this.instructorForm.reset();
            this.back();
          }, error: (err) => {
            console.log(err);
          }
        });
      } else {
        this.instructor_resp.name = this.instructorForm.controls['name'].value;
        this.instructor_resp.userAuth.email = this.instructorForm.controls['email'].value;
        this.instructor_resp.userAuth.password = this.instructorForm.controls['password'].value;
        this.instructor_resp.dob = this.instructorForm.controls['dob'].value;
        this.instructor_resp.gender = this.instructorForm.controls['gender'].value;
        var dept = this.department_resp.find(dept => dept.id == this.instructorForm.controls['department'].value);
        if (dept) {
          this.instructor_resp.department.id = dept.id;
          this.instructor_resp.department.name = dept.name;
        }
        console.log(this.instructor_resp);
        this.updateService.updateInstructor(this.instructor_resp).subscribe({
          next: () => {
            this.instructorForm.reset();
            this.back();
          }, error: (err) => {
            console.log(err);
          }
        });
      }
    }


  }
}
