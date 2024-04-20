import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleEditCategoryComponent } from './schedule-edit-category.component';

describe('ScheduleEditCategoryComponent', () => {
  let component: ScheduleEditCategoryComponent;
  let fixture: ComponentFixture<ScheduleEditCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleEditCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleEditCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
