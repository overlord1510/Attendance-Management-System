import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentResponse } from 'src/app/models/student-response';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  studentList: StudentResponse[] = [];

  constructor(private dataService: DataService,private router:Router) {
    dataService.isLoddedIn().subscribe((res) => {
      console.log(res);
    });
  }
  
  getStudentList():void{
    this.dataService.getStudentList().subscribe({
      next:(res)=>{
        this.studentList=res;
      },error:(err)=>{
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
    this.getStudentList();
  }

  navigateToRegisterStudent() {
    this.router.navigate(['/admin/register-student']);
  }
  
  editStudent(id: number) {
    this.router.navigate(['/admin/update-student',id]); 
  }
  
  deleteStudent(id: number) {
    this.dataService.deleteStudent(id).subscribe({
      next:()=>{
        console.log("Element Deleted with id"+id);
        this.getStudentList();
      },error:(err)=>{
        console.log(err);
      }
    });
  }

}
