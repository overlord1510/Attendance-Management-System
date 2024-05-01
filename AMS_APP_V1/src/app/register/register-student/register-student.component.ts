import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { concatMap } from 'rxjs';
import { BatchResponse } from 'src/app/models/batch-response';
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
export class RegisterStudentComponent implements OnInit,AfterViewInit {
  department_resp: DepartmentResponse[] = [];
  private student_req: RegisterStudentRequest;
  private isUpdating: boolean = false;
  private student_resp: StudentResponse;
  batchList: BatchResponse[] = [];
  theoryBatch: BatchResponse[] = [];
  laboratoryBatch: BatchResponse[] = [];
  filterOption = {
    dept: '',
    sem: ''
  }

  studentForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    department: new FormControl('Select Department', [Validators.required, this.departmentValidator("Select Department")]),
    gender: new FormControl('', [Validators.required]),
    semester: new FormControl('', [Validators.required]),
    registrationNumber: new FormControl('', [Validators.required]),
    universityRoll: new FormControl('', [Validators.required]),
    theoryBatch: new FormControl('Select Theory Batch', [Validators.required, this.batchValidator('Select Theory Batch')]),
    laboratoryBatch: new FormControl('Select Laboratory Batch', [Validators.required, this.batchValidator('Select Laboratory Batch')])
  });

  constructor(private dataService: DataService, private route: ActivatedRoute,
    private registerService: RegisterService, private updateService: UpdateService,private elementRef:ElementRef) {

    this.student_req = {
      name: '',
      department: {
        id: -1,
        name: ''
      },
      email: '',
      password: '',
      dob: '',
      gender: '',
      semester: '',
      registrationNumber: '',
      universityRoll: '',
      batches: []
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
      universityRoll: '',
      batches: []
    };
        
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor='#D4E7C5';
  }

  ngOnInit(): void {

    if (this.route.snapshot.params['id']) {
      this.isUpdating = true;
      this.studentForm.controls['password'].disable();
    }

    if(this.isUpdating){
      this.dataService.isLoddedIn().subscribe(()=>{
        console.log("Authenticated");
      });
    }
    this.dataService.getDepartmentList().pipe(
      concatMap((res) => {
        this.department_resp = res;
        return this.dataService.getBatchList();
      })
    ).subscribe({
      next: (res) => {
        this.batchList = res;
      }, error: (err) => {
        console.log(err);
      }, complete: () => {
        if (this.isUpdating) {
          this.dataService.getStudentById(this.route.snapshot.params['id']).subscribe((res) => {
            this.student_resp=res;
            this.populateFormWithData();
            this.filterBatchList();
          });
        }
      }
    });
  }
  

  onSelectEvent($event: Event, selectedVal: string) {
    if (selectedVal === 'dept') {
      this.filterOption.dept = ($event.target as HTMLSelectElement).value;
    }
    if (selectedVal === 'sem') {
      this.filterOption.sem = ($event.target as HTMLSelectElement).value;
    }
    if (this.filterOption.dept && this.filterOption.sem)
      this.filterBatchList();
  }

  private filterBatchList(): void {
    this.theoryBatch = [...this.batchList]
    this.theoryBatch = this.theoryBatch.filter((batch) => (batch.semester === this.filterOption.sem) && (batch.department.id === Number(this.filterOption.dept) && (batch.batchType === 'THEORY')));
    this.laboratoryBatch = [...this.batchList]
    this.laboratoryBatch = this.laboratoryBatch.filter((batch) => (batch.semester === this.filterOption.sem) && (batch.department.id === Number(this.filterOption.dept) && (batch.batchType === 'LABORATORY')));
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

  batchValidator(defaultValue: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedValue = control.value;

      if (selectedValue === defaultValue) {
        return { invalidBatch: true };
      }

      return null;
    };
  }



  populateFormWithData():void{
    this.studentForm.controls['name'].patchValue(this.student_resp.name);
    this.studentForm.controls['email'].patchValue(this.student_resp.userAuth.email);
    this.studentForm.controls['password'].patchValue(this.student_resp.userAuth.password);
    this.studentForm.controls['department'].patchValue(this.student_resp.department.id);
    this.studentForm.controls['dob'].patchValue(this.student_resp.dob.toString().substring(0, 10));
    this.studentForm.controls['gender'].patchValue(this.student_resp.gender);
    this.studentForm.controls['semester'].patchValue(this.student_resp.semester);
    this.studentForm.controls['universityRoll'].patchValue(this.student_resp.universityRoll);
    this.studentForm.controls['registrationNumber'].patchValue(this.student_resp.registrationNumber);
    const theory=this.student_resp.batches?.find(batch=>batch.batchType=='THEORY');
    const lab=this.student_resp.batches?.find(batch=>batch.batchType=='LABORATORY');
    if(theory){
      this.studentForm.controls['theoryBatch'].patchValue(theory.id)
    }
    if(lab){
      this.studentForm.controls['laboratoryBatch'].patchValue(lab.id)
    }
    this.filterOption.dept = this.student_resp.department.id + "";
    this.filterOption.sem = this.student_resp.semester;
  }

  back() {
    history.back();
  }

  saveDetails() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    }
  }

  onSubmit() {
    this.saveDetails();

    if(this.studentForm.valid){
      const batch = this.batchList.filter((batch) => batch.id == this.studentForm.get('theoryBatch')!.value || batch.id == this.studentForm.get('laboratoryBatch')!.value);
      
      if (!this.isUpdating) {
        if (batch) {
          this.student_req.batches = batch;
        }
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
            this.back();
          }, error: (err) => {
            console.log(err);
          }
        });
      } else {
        if (batch) {
          this.student_resp.batches = batch;
          console.log(batch);
        }
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
}
