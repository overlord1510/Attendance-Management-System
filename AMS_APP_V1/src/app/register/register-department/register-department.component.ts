import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentRequest } from 'src/app/models/department-request';
import { DepartmentResponse } from 'src/app/models/department-response';
import { DataService } from 'src/app/services/data.service';
import { RegisterService } from 'src/app/services/register.service';
import { UpdateService } from 'src/app/services/update.service';

@Component({
  selector: 'app-register-department',
  templateUrl: './register-department.component.html',
  styleUrls: ['./register-department.component.css']
})
export class RegisterDepartmentComponent implements OnInit {
  private department_reg: DepartmentRequest;
  private isUpdating: boolean = false;
  private department_resp: DepartmentResponse;

  departmentForm: FormGroup = new FormGroup({
    "departmentName": new FormControl("", [Validators.required])
  });

  constructor(private dataService: DataService,
    private registerService: RegisterService,
    private route: ActivatedRoute,
    private updateService: UpdateService,
    private router: Router, private elementRef: ElementRef) {
    this.department_reg = {
      name: ''
    };

    this.department_resp = {
      id: -1,
      name: ''
    };

    dataService.isLoddedIn().subscribe((res) => {
      console.log(res);
    });

    if (this.route.snapshot.params['id']) {
      this.isUpdating = true;
    }

  }


  ngOnInit(): void {
    if (this.isUpdating && this.route.snapshot.params['id']) {
      this.dataService.getDepartmentById(this.route.snapshot.params['id']).subscribe({
        next: (res) => {
          this.department_resp.id = res.id;
          this.departmentForm.controls['departmentName'].patchValue(res.name);
        }, error: (err) => {
          console.log(err);
        }
      });
    }
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#D4E7C5';
  }

  back(): void {
    history.back();
  }

  saveDetails() {
    if (this.departmentForm.invalid) {
      this.departmentForm.markAllAsTouched();
    }
  }

  onSubmit(): void {

    this.saveDetails();
    console.log(this.departmentForm.value);
    if (this.departmentForm.valid) {
      if (!this.isUpdating) {
        this.department_reg.name = this.departmentForm.controls['departmentName'].value;
        this.registerService.saveDepartment(this.department_reg).subscribe({
          next: () => {
            this.departmentForm.reset();
            this.router.navigate(['/admin/department-list']);
          }, error: err => console.log(err)
        });
      } else {
        this.department_resp.name = this.departmentForm.controls['departmentName'].value;
        this.updateService.updateDepartment(this.department_resp).subscribe({
          next: () => {
            this.departmentForm.reset();
            this.router.navigate(['/admin/department-list']);
          }, error: (err) => {
            console.log(err);
          }
        });
      }
    }

  }
}
