import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentResponse } from 'src/app/models/department-response';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit, AfterViewInit {
  departmentList!: DepartmentResponse[];
  private val: boolean = false;

  constructor(private dataService: DataService, private router: Router, private elementRef: ElementRef) {
    dataService.isLoddedIn().subscribe((res) => {
      console.log(res);
    })
  }

  getAllDepartment(): void {
    this.dataService.getDepartmentList().subscribe({
      next: (res) => {
        this.departmentList = res;
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
    this.getAllDepartment();
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor='#D4E7C5';
  }

  navigateToRegisterDepartment() {
    this.router.navigate(['/admin/register-department']);
  }

  editDepartment(id: number) {
    this.router.navigate(['/admin/update-department', id]);
  }

  deleteDepartment(id: number) {
    this.val = confirm("Delete Department with ID :: " + id);
    if (this.val) {
      this.dataService.deleteDepartmentById(id).subscribe({
        next: () => {
          this.getAllDepartment();
        }, error: (err) => {
          console.log(err);
          if(err.status==452){
            alert("Department cannot be deleted Please remove records that contain this department");
          }
        }
      });
    }
  }
}
