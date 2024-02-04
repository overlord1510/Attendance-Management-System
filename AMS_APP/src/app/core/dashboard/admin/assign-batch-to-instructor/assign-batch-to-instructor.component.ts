import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { DepartmentResponse } from 'src/app/models/department-response';
import { InstructorResponse } from 'src/app/models/instructor-response';

@Component({
  selector: 'app-assign-batch-to-instructor',
  templateUrl: './assign-batch-to-instructor.component.html',
  styleUrls: ['./assign-batch-to-instructor.component.css']
})
export class AssignBatchToInstructorComponent {

  deptList: DepartmentResponse[] = [];
  instructor_resp: InstructorResponse;
  batchForm: FormGroup;
  filteredBatchList: any;

  constructor() {

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
      courses: []
    }
  }

  get batchFormArray(): FormArray {
    return this.batchForm.get('batches') as FormArray;
  }

  onSelectEvent($event: Event, selectedVal: string) {
    throw new Error('Method not implemented.');
  }
  onBatchSelect(_t95: number) {
    throw new Error('Method not implemented.');
  }

  onSubmit() {
    throw new Error('Method not implemented.');
  }

}
