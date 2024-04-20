import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDiscountFeeComponent } from './student-discount-fee.component';

describe('StudentDiscountFeeComponent', () => {
  let component: StudentDiscountFeeComponent;
  let fixture: ComponentFixture<StudentDiscountFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDiscountFeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDiscountFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
