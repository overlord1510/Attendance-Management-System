import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DepartmentResponse } from 'src/app/models/department-response';
import { RegisterStudentRequest } from 'src/app/models/register-student-request';
import { StudentResponse } from 'src/app/models/student-response';
import { DataService } from 'src/app/services/data.service';
import { RegisterService } from 'src/app/services/register.service';
import { UpdateService } from 'src/app/services/update.service';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})
export class RegisterStudentComponent {
  department_resp: DepartmentResponse[] = [];
  private student_req: RegisterStudentRequest;
  private isUpdating: boolean = false;
  private student_resp: StudentResponse;

  studentForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    department: new FormControl('Select Department', [Validators.required, this.departmentValidator("Select Department")]),
    gender: new FormControl('', [Validators.required]),
    semester: new FormControl('', [Validators.required]),
    registrationNumber: new FormControl('', [Validators.required]),
    universityRoll: new FormControl('', [Validators.required])
  });

  constructor(private dataService: DataService, private route: ActivatedRoute,
    private registerService: RegisterService, private updateService: UpdateService) {

    dataService.isLoddedIn().subscribe((res) => {
      console.log(res);
    });
    this.student_req = {
      name: '',
      department: {
        id: -1,
        name: ''
      },
      email:'',
      password:'',
      dob: '',
      gender: '',
      semester: '',
      registrationNumber: '',
      universityRoll: ''
    };

    this.student_resp = {
      id: -1,
      name: '',
      userAuth: {
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
      semester: '',
      registrationNumber: '',
      universityRoll: ''
    };

    if (route.snapshot.params['id']) {
      this.isUpdating = true;
      this.studentForm.controls['password'].disable();
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

  ngOnInit(): void {
    this.dataService.getDepartmentList().subscribe(
      {
        next: (res) => {
          this.department_resp = res;
        }, error: (err) => {
          console.log(err);
        }, complete: () => {
          if (this.isUpdating) {
            this.dataService.getStudentById(this.route.snapshot.params['id']).subscribe((res) => {
              this.student_resp.id = res.id;
              this.student_resp.userAuth.id = res.userAuth.id;
              this.student_resp.userAuth.role = res.userAuth.role;
              this.studentForm.controls['name'].patchValue(res.name);
              this.studentForm.controls['email'].patchValue(res.userAuth.email);
              this.studentForm.controls['password'].patchValue(res.userAuth.password);
              this.studentForm.controls['department'].patchValue(res.department.id);
              this.studentForm.controls['dob'].patchValue(res.dob.toString().substring(0, 10));
              this.studentForm.controls['gender'].patchValue(res.gender);
              this.studentForm.controls['semester'].patchValue(res.semester);
              this.studentForm.controls['universityRoll'].patchValue(res.universityRoll);
              this.studentForm.controls['registrationNumber'].patchValue(res.registrationNumber);
            });
          }
        }
      }
    );
  }

  back() {
    history.back();
  }

  onSubmit() {
    if (!this.isUpdating) {
      this.student_req.name = this.studentForm.controls['name'].value;
      this.student_req.email = this.studentForm.controls['email'].value;
      this.student_req.password = this.studentForm.controls['password'].value;
      this.student_req.dob = this.studentForm.controls['dob'].value;
      this.student_req.gender = this.studentForm.controls['gender'].value;
      this.student_req.semester = this.studentForm.controls['semester'].value;
      this.student_req.universityRoll = this.studentForm.controls['universityRoll'].value;
      this.student_req.registrationNumber = this.studentForm.controls['registrationNumber'].value;
      var dept = this.department_resp.find(dept => dept.id == this.studentForm.controls['department'].value);
      if (dept) {
        this.student_req.department.id = dept.id;
        this.student_req.department.name = dept.name;
      }
      this.registerService.saveStudent(this.student_req).subscribe({
        next: () => {
          this.studentForm.reset();
        }, error: (err) => {
          console.log(err);
        }
      });
    } else {
      this.student_resp.name = this.studentForm.controls['name'].value;
      this.student_resp.userAuth.email = this.studentForm.controls['email'].value;
      this.student_resp.userAuth.password = this.studentForm.controls['password'].value;
      this.student_resp.dob = this.studentForm.controls['dob'].value;
      this.student_resp.gender = this.studentForm.controls['gender'].value;
      this.student_resp.semester = this.studentForm.controls['semester'].value;
      this.student_resp.universityRoll = this.studentForm.controls['universityRoll'].value;
      this.student_resp.registrationNumber = this.studentForm.controls['registrationNumber'].value;
      var dept = this.department_resp.find(dept => dept.id == this.studentForm.controls['department'].value);
      if (dept) {
        this.student_resp.department.id = dept.id;
        this.student_resp.department.name = dept.name;
      }
      console.log(this.student_resp);
      this.updateService.updateStudent(this.student_resp).subscribe({
        next: () => {
          this.studentForm.reset();
          this.back();
        }, error: (err) => {
          console.log(err);
        }
      });
    }

  }
}
