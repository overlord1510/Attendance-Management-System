import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveListComponent } from './remove-list.component';

describe('RemoveListComponent', () => {
  let component: RemoveListComponent;
  let fixture: ComponentFixture<RemoveListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveListComponent]
    });
    fixture = TestBed.createComponent(RemoveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
