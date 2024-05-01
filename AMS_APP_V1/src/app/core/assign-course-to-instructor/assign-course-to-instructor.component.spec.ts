import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCourseToInstructorComponent } from './assign-course-to-instructor.component';

describe('AssignCourseToInstructorComponent', () => {
  let component: AssignCourseToInstructorComponent;
  let fixture: ComponentFixture<AssignCourseToInstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignCourseToInstructorComponent]
    });
    fixture = TestBed.createComponent(AssignCourseToInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
