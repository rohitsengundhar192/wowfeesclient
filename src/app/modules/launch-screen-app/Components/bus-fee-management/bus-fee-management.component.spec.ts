import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusFeeManagementComponent } from './bus-fee-management.component';

describe('BusFeeManagementComponent', () => {
  let component: BusFeeManagementComponent;
  let fixture: ComponentFixture<BusFeeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusFeeManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusFeeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
