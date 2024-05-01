import { AfterContentInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorResponse } from 'src/app/models/instructor-response';
import { DataService } from 'src/app/services/data.service';
import { UpdateService } from 'src/app/services/update.service';

@Component({
  selector: 'app-instructor-details',
  templateUrl: './instructor-details.component.html',
  styleUrls: ['./instructor-details.component.css']
})
export class InstructorDetailsComponent implements OnInit, AfterContentInit {

  instructor_resp:InstructorResponse;

  constructor(private dataService:DataService,private elementRef:ElementRef,private route:ActivatedRoute,private router:Router,private updateService:UpdateService){
    this.instructor_resp={
      id:-1,
      name:'',
      department:{
        id:-1,
        name:''
      },
      dob:new Date(),
      gender:'',
      userAuth:{
        id:-1,
        email:'',
        password:'',
        role:'',
      },
      batches:[],
      courses:[]
    }
  }

  ngAfterContentInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor='#D4E7C5';
  }

  ngOnInit(): void {
    this.dataService.getInstructorById(this.route.snapshot.params['id']).subscribe({
      next:(res)=>{
        this.instructor_resp=res;
      }
    });
  }

  assignCourses(id: number) {
    this.router.navigate(['/admin/assign-course', id]);
  }
  
  toggleRole() {
    if (this.instructor_resp.userAuth.role === 'INSTRUCTOR') {
      if (confirm("Assign Role As Admin?\nInstructor ID :: " + this.instructor_resp.id + "\nInstructor Name :: " + this.instructor_resp.name)){
        this.instructor_resp.userAuth.role = 'ADMIN';
        this.updateService.updateInstructor(this.instructor_resp).subscribe(()=>{
          alert("Role Assigned as ADMIN");
          // this.getInstructorList();
        });
      }
    }else if (this.instructor_resp.userAuth.role === 'ADMIN') {
      if (confirm("Remove Role As Admin?\nInstructor ID :: " + this.instructor_resp.id + "\nInstructor Name :: " + this.instructor_resp.name)){
        this.instructor_resp.userAuth.role = 'INSTRUCTOR';
        this.updateService.updateInstructor(this.instructor_resp).subscribe(()=>{
          alert("ADMIN Role Removed");
          // this.getInstructorList();
        });
      }
    }
  }
  
  assignBatches(id: number) {
    this.router.navigate(['/admin/assign-batch', id]);
  }
}
