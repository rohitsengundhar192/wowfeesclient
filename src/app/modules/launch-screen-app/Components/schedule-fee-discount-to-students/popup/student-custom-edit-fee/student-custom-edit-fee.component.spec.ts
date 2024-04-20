import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCustomEditFeeComponent } from './student-custom-edit-fee.component';

describe('StudentCustomEditFeeComponent', () => {
  let component: StudentCustomEditFeeComponent;
  let fixture: ComponentFixture<StudentCustomEditFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCustomEditFeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCustomEditFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
