import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignBatchToInstructorComponent } from './assign-batch-to-instructor.component';

describe('AssignBatchToInstructorComponent', () => {
  let component: AssignBatchToInstructorComponent;
  let fixture: ComponentFixture<AssignBatchToInstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignBatchToInstructorComponent]
    });
    fixture = TestBed.createComponent(AssignBatchToInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
