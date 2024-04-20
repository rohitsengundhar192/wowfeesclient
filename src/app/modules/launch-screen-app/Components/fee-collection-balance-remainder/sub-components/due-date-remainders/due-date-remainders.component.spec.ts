import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DueDateRemaindersComponent } from './due-date-remainders.component';

describe('DueDateRemaindersComponent', () => {
  let component: DueDateRemaindersComponent;
  let fixture: ComponentFixture<DueDateRemaindersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DueDateRemaindersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DueDateRemaindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
