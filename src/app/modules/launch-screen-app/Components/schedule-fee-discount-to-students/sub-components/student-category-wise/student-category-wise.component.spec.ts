import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCategoryWiseComponent } from './student-category-wise.component';

describe('StudentCategoryWiseComponent', () => {
  let component: StudentCategoryWiseComponent;
  let fixture: ComponentFixture<StudentCategoryWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCategoryWiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCategoryWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
