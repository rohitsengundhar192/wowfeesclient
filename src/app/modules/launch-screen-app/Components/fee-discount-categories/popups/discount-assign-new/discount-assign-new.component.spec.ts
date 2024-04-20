import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountAssignNewComponent } from './discount-assign-new.component';

describe('DiscountAssignNewComponent', () => {
  let component: DiscountAssignNewComponent;
  let fixture: ComponentFixture<DiscountAssignNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountAssignNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountAssignNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
