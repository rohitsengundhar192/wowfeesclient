import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeDiscountCategoriesComponent } from './fee-discount-categories.component';

describe('FeeDiscountCategoriesComponent', () => {
  let component: FeeDiscountCategoriesComponent;
  let fixture: ComponentFixture<FeeDiscountCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeDiscountCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeDiscountCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
