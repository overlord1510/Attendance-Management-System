import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentResponse } from 'src/app/models/student-response';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, AfterViewInit {
  studentList: StudentResponse[] = [];
  private delete: boolean = false;

  constructor(private dataService: DataService, private router: Router, private elementRef: ElementRef) { }

  getStudentList(): void {
    this.dataService.getStudentList().subscribe({
      next: (res) => {
        this.studentList = res;
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
    this.dataService.isLoddedIn().subscribe((res) => {
      console.log(res);
    });
    this.getStudentList();
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#D4E7C5';
  }

  navigateToRegisterStudent() {
    this.router.navigate(['/admin/register-student']);
  }

  editStudent(id: number) {
    this.router.navigate(['/admin/update-student', id]);
  }

  deleteStudent(id: number) {
    this.delete = confirm("Delete Student with Id :: " + id);
    if (this.delete) {
      this.dataService.deleteStudent(id).subscribe({
        next: () => {
          console.log("Element Deleted with id" + id);
          this.getStudentList();
        }, error: (err) => {
          console.log(err);
        }
      });
    }
  }
}
