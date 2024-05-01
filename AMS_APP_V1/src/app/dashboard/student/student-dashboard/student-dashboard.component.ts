import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { concatMap } from 'rxjs';
import { StudentAttendanceResponse } from 'src/app/models/student-attendance-response';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit,AfterViewInit{
  attendanceList:StudentAttendanceResponse[]=[];

  constructor(private dataService: DataService,private authService:AuthenticationService,private elementRef:ElementRef) { }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#D4E7C5';
  }

  ngOnInit(): void {
    this.dataService.isLoddedIn().pipe(
      concatMap(()=>{
        return this.dataService.getStudentsAttendance();
      })
    ).subscribe({
      next:(res)=>this.attendanceList=res,
      error:(err)=>{
        if(err.status==404){
          this.authService.logout().subscribe();
        }
      }
      
    });
  }
}
