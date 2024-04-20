import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountAssignEditComponent } from './discount-assign-edit.component';

describe('DiscountAssignEditComponent', () => {
  let component: DiscountAssignEditComponent;
  let fixture: ComponentFixture<DiscountAssignEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountAssignEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountAssignEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
