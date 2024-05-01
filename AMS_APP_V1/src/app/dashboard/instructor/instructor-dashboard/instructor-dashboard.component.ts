import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs';
import { BatchesOfInstructor } from 'src/app/models/batches-of-instructor';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.css']
})
export class InstructorDashboardComponent implements OnInit, AfterViewInit {
  assignedBatchList: BatchesOfInstructor[] = [];

  constructor(private dataService: DataService, private router: Router, private authService: AuthenticationService,private elementRef:ElementRef) { }
  
  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#D4E7C5';
  }

  ngOnInit(): void {
    this.dataService.isLoddedIn().pipe(
      concatMap(() => {
        return this.dataService.getAssignedBatches();
      })
    ).subscribe({
      next: (res) => this.assignedBatchList = res,
      error: (err) => {
        if (err.status == 404) {
          this.authService.logout().subscribe();
        }
      }
    });
  }

  navigateToAssignAttendance(batchId: number, courseId: number) {
    this.router.navigate(['/instructor/assign-attendance'], { queryParams: { batchId, courseId } });
  }
}
