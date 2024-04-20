import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleNewCategoryComponent } from './schedule-new-category.component';

describe('ScheduleNewCategoryComponent', () => {
  let component: ScheduleNewCategoryComponent;
  let fixture: ComponentFixture<ScheduleNewCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleNewCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleNewCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
