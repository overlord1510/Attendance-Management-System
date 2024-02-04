import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentResponse } from 'src/app/models/department-response';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  
  departmentList!: DepartmentResponse[];
  private val:boolean=false;

  constructor(private dataService: DataService,private router:Router) {
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
  
  navigateToRegisterDepartment() {
    this.router.navigate(['/admin/register-department']);
  }

  editDepartment(id: number) {
    this.router.navigate(['/admin/update-department',id]);
  }
  
  deleteDepartment(id: number) {
    this.val=confirm("Delete Department with ID :: "+id);
    if(this.val){
      this.dataService.deleteDepartmentById(id).subscribe({
        next:()=>{
          this.getAllDepartment();
        },error:(err)=>{
          console.log(err);
        }
      });
    }
  }
  
}
