import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { concatMap } from 'rxjs';
import { AttendanceRequest } from 'src/app/models/attendance-request';
import { StudentResponse } from 'src/app/models/student-response';
import { DataService } from 'src/app/services/data.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-assign-attendance',
  templateUrl: './assign-attendance.component.html',
  styleUrls: ['./assign-attendance.component.css']
})
export class AssignAttendanceComponent implements OnInit, AfterViewInit {
  studentList: StudentResponse[] = [];
  studentIds: number[] = [];
  private batchId!: number;
  private courseId!: number;
  private attendance_req: AttendanceRequest;
  attendanceForm: FormGroup;
  selectMessage: string;
  role:string;

  constructor(private dataService: DataService, private route: ActivatedRoute, private registerService: RegisterService, private elementRef: ElementRef) {
    this.selectMessage = 'Select All';
    this.role='';
    this.attendanceForm = new FormGroup({
      date: new FormControl('', [Validators.required]),
      attendees: new FormArray([])
    });

    this.attendance_req = {
      batchId: -1,
      courseId: -1,
      date: new Date(),
      studentIds: []
    }

  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#D4E7C5';
  }

  ngOnInit(): void {
    this.role=localStorage.getItem('ROLE')!;
    this.dataService.isLoddedIn().pipe(
      concatMap(() => {
        return this.route.queryParams;
      }), concatMap((res) => {
        this.batchId = res['batchId'];
        this.courseId = res['courseId'];
        return this.dataService.getStudentsOfBatch(this.batchId);
      })
    ).subscribe((res) => {
      this.studentList = res;
      this.updateAttendanceFormArray(false);
    });
  }

  get attendanceFormArray(): FormArray {
    return this.attendanceForm.get('attendees') as FormArray;
  }

  updateAttendanceFormArray(val:boolean): void {
    console.log("Received value for val",val);
    this.studentList.forEach(() => {
      this.attendanceFormArray.push(new FormControl(val));
    });
  }

  back() {
    history.back();
  }

  onSubmit(): void {
    console.log(this.attendanceForm.get('attendees')?.value);
    console.log(this.attendanceForm.get('date')?.value)
    this.attendanceFormArray.controls.forEach((control, index) => {
      if (control.value) {
        this.studentIds.push(this.studentList[index].id);
      }
    });
    console.log(this.studentIds);
    this.attendance_req.batchId = this.batchId;
    this.attendance_req.courseId = this.courseId;
    const date = this.attendanceForm.get('date')!.value;
    if (date) {
      this.attendance_req.date = date;
    }
    this.attendance_req.studentIds = this.studentIds;
    console.log(this.attendance_req);
    this.registerService.assignAttendance(this.attendance_req).subscribe(() => {
      console.log("Attendance Assigned");
      this.back();
    })
  }

  onSelect() {
   if(this.selectMessage==='Select All'){
    this.selectMessage='Remove All';
    this.attendanceFormArray.patchValue(Array(this.studentList.length).fill(true));
  }else{
    this.selectMessage='Select All';
    this.attendanceFormArray.patchValue(Array(this.studentList.length).fill(false));
   }
  }
}
