import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DueAmountRemaindersComponent } from './due-amount-remainders.component';

describe('DueAmountRemaindersComponent', () => {
  let component: DueAmountRemaindersComponent;
  let fixture: ComponentFixture<DueAmountRemaindersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DueAmountRemaindersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DueAmountRemaindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
