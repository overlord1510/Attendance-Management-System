import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateOtpComponent } from './validate-otp.component';

describe('ValidateOtpComponent', () => {
  let component: ValidateOtpComponent;
  let fixture: ComponentFixture<ValidateOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidateOtpComponent]
    });
    fixture = TestBed.createComponent(ValidateOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
