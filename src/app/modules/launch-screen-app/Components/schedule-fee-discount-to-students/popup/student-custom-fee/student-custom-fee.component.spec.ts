import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCustomFeeComponent } from './student-custom-fee.component';

describe('StudentCustomFeeComponent', () => {
  let component: StudentCustomFeeComponent;
  let fixture: ComponentFixture<StudentCustomFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCustomFeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCustomFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
