import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountCategoryComponent } from './discount-category.component';

describe('DiscountCategoryComponent', () => {
  let component: DiscountCategoryComponent;
  let fixture: ComponentFixture<DiscountCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
