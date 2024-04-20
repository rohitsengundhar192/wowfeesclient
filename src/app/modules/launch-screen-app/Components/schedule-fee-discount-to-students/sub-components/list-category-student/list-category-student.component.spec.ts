import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoryStudentComponent } from './list-category-student.component';

describe('ListCategoryStudentComponent', () => {
  let component: ListCategoryStudentComponent;
  let fixture: ComponentFixture<ListCategoryStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCategoryStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCategoryStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
