import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { concatMap } from 'rxjs';
import { AssignBatchToInstructor } from 'src/app/models/assign-batch-to-instructor';
import { BatchResponse } from 'src/app/models/batch-response';
import { DepartmentResponse } from 'src/app/models/department-response';
import { InstructorResponse } from 'src/app/models/instructor-response';
import { DataService } from 'src/app/services/data.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-assign-batch-to-instructor',
  templateUrl: './assign-batch-to-instructor.component.html',
  styleUrls: ['./assign-batch-to-instructor.component.css']
})
export class AssignBatchToInstructorComponent implements OnInit,AfterViewInit {
  deptList: DepartmentResponse[] = [];
  instructor_resp: InstructorResponse;
  batchForm: FormGroup;
  batchList: BatchResponse[] = [];
  filteredBatchList: BatchResponse[] = [];
  filterOptions = {
    dept: '',
    sem: '',
    batchType: ''
  }

  private addBatch: AssignBatchToInstructor = {
    id: -1,
    batches: []
  }


  constructor(private dataService: DataService, private route: ActivatedRoute, private registerServices: RegisterService,private elementRef:ElementRef) {

    this.batchForm = new FormGroup({
      batches: new FormArray([])
    });

    this.instructor_resp = {
      id: -1,
      name: '',
      gender: '',
      dob: new Date(),
      department: {
        id: -1,
        name: ''
      },
      userAuth: {
        id: -1,
        email: '',
        password: '',
        role: ''
      },
      courses: [],
      batches: []
    }
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor='#D4E7C5';
  }

  ngOnInit(): void {

    this.dataService.isLoddedIn().pipe(
      concatMap(() => {
        return this.dataService.getDepartmentList();
      }), concatMap((res) => {
        this.deptList = res;
        return this.dataService.getInstructorById(this.route.snapshot.params['id']);
      }), concatMap((res) => {
        this.instructor_resp = res;
        return this.dataService.getBatchList();
      })
    ).subscribe((res) => {
      this.batchList = res;
      this.filterBatch();
    });

  }

  filterBatch(): void {
    this.batchFormArray.clear();
    this.filteredBatchList = [...this.batchList];

    if (this.filterOptions.dept) {
      this.filteredBatchList = this.filteredBatchList.filter((batch) => batch.department.id === Number(this.filterOptions.dept));
    }
    if (this.filterOptions.sem) {
      this.filteredBatchList = this.filteredBatchList.filter((batch) => batch.semester === this.filterOptions.sem);
    }
    if (this.filterOptions.batchType) {
      this.filteredBatchList = this.filteredBatchList.filter((batch) => batch.batchType === this.filterOptions.batchType);
    }

    this.updateBatchFormArray();
  }

  private updateBatchFormArray() {

    this.filteredBatchList.forEach((batch) => {
      const isSelected = this.instructor_resp.batches?.some((b) => b.id === batch.id);
      this.batchFormArray.push(new FormControl(isSelected));
    });

  }

  get batchFormArray(): FormArray {
    return this.batchForm.get('batches') as FormArray;
  }

  onSelectEvent($event: Event, selectedVal: string) {
    console.log(typeof ($event.target as HTMLSelectElement).value);
    console.log(selectedVal + typeof selectedVal);

    if (selectedVal === 'dept') {
      this.filterOptions.dept = ($event.target as HTMLSelectElement).value;
    }
    if (selectedVal === 'sem') {
      this.filterOptions.sem = ($event.target as HTMLSelectElement).value;
    } if (selectedVal === 'batchType') {
      this.filterOptions.batchType = ($event.target as HTMLSelectElement).value;
    }

    this.filterBatch();

  }

  onBatchSelect(index: number) {
    const selectedBatch = this.filteredBatchList[index];
    if (selectedBatch) {
      const isInstructorBatch = this.instructor_resp.batches?.some((batch) => batch.id === selectedBatch.id);
      if (isInstructorBatch) {
        this.instructor_resp.batches = this.instructor_resp.batches?.filter((batch) => batch.id !== selectedBatch.id);
      } else {
        this.instructor_resp.batches?.push(selectedBatch);
      }
    }
  }

  onSubmit() {
    console.log(this.batchList);
    this.batchForm.reset();
    console.log(this.instructor_resp);
    if (this.instructor_resp.batches)
      this.addBatch.batches = this.instructor_resp.batches;
    this.addBatch.id=this.instructor_resp.id;

    this.registerServices.assignBatchToInstructor(this.addBatch).subscribe(()=>{
      console.log("Batch Added");
      history.back();
    });
  }
}
