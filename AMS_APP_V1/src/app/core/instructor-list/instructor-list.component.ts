import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstructorResponse } from 'src/app/models/instructor-response';
import { DataService } from 'src/app/services/data.service';
import { UpdateService } from 'src/app/services/update.service';

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css']
})
export class InstructorListComponent implements OnInit,AfterViewInit{
  
  instructorList: InstructorResponse[] = [];
  private delete: boolean = false;
  
  constructor(public dataService: DataService, private router: Router,private updateService:UpdateService,private elementRef:ElementRef) {
  };
  
  getInstructorList(): void {
    this.dataService.getInstructorList().subscribe({
      next: (res) => {
        this.instructorList = res;
      }
    });
  }
  
  ngOnInit(): void {
    this.dataService.isLoddedIn().subscribe((res) => {
      console.log(res);
    });
    this.getInstructorList();
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor='#D4E7C5';
  }
  
  navigateToRegisterInstructor() {
    this.router.navigate(['/admin/register-instructor']);
  }
  
  deleteInstructor(id: number) {
    this.delete = confirm("Delete Instructor with Id :: " + id);
    if (this.delete) {
      this.dataService.deleteInstructor(id).subscribe({
        next: () => {
          this.getInstructorList();
        }
      });
    }
  }
  editInstructor(id: number) {
    this.router.navigate(['/admin/update-instructor', id]);
  }
  
  assignCourses(id: number) {
    this.router.navigate(['/admin/assign-course', id]);
  }
  
  toggleRole(instructor: InstructorResponse) {
    if (instructor.userAuth.role === 'INSTRUCTOR') {
      if (confirm("Assign Role As Admin?\nInstructor ID :: " + instructor.id + "\nInstructor Name :: " + instructor.name)){
        instructor.userAuth.role = 'ADMIN';
        this.updateService.updateInstructor(instructor).subscribe(()=>{
          alert("Role Assigned as ADMIN");
          this.getInstructorList();
        });
      }
    }else if (instructor.userAuth.role === 'ADMIN') {
      if (confirm("Remove Role As Admin?\nInstructor ID :: " + instructor.id + "\nInstructor Name :: " + instructor.name)){
        instructor.userAuth.role = 'INSTRUCTOR';
        this.updateService.updateInstructor(instructor).subscribe(()=>{
          alert("ADMIN Role Removed");
          this.getInstructorList();
        });
      }
    }
  }
  
  assignBatches(id: number) {
    this.router.navigate(['/admin/assign-batch', id]);
  }
  
  viewDetails(id: number) {
    console.log(id);
  this.router.navigate(['/admin/instructor-details',id])
  }
}
