import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBatchComponent } from './register-batch.component';

describe('RegisterBatchComponent', () => {
  let component: RegisterBatchComponent;
  let fixture: ComponentFixture<RegisterBatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterBatchComponent]
    });
    fixture = TestBed.createComponent(RegisterBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
