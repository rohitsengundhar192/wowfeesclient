import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentReceiptParticularsTableComponent } from './payment-receipt-particulars-table.component';

describe('PaymentReceiptParticularsTableComponent', () => {
  let component: PaymentReceiptParticularsTableComponent;
  let fixture: ComponentFixture<PaymentReceiptParticularsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentReceiptParticularsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentReceiptParticularsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
