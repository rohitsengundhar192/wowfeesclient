import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeePaymentReceiptComponent } from './fee-payment-receipt.component';

describe('FeePaymentReceiptComponent', () => {
  let component: FeePaymentReceiptComponent;
  let fixture: ComponentFixture<FeePaymentReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeePaymentReceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeePaymentReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
