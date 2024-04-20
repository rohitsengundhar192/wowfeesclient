import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleFeeDiscountToStudentsComponent } from './schedule-fee-discount-to-students.component';

describe('ScheduleFeeDiscountToStudentsComponent', () => {
  let component: ScheduleFeeDiscountToStudentsComponent;
  let fixture: ComponentFixture<ScheduleFeeDiscountToStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleFeeDiscountToStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleFeeDiscountToStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
