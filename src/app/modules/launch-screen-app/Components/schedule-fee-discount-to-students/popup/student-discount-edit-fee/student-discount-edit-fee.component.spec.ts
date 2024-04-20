import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDiscountEditFeeComponent } from './student-discount-edit-fee.component';

describe('StudentDiscountEditFeeComponent', () => {
  let component: StudentDiscountEditFeeComponent;
  let fixture: ComponentFixture<StudentDiscountEditFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDiscountEditFeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDiscountEditFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
