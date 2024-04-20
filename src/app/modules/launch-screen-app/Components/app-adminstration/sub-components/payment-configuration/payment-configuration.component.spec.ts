import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentConfigurationComponent } from './payment-configuration.component';

describe('PaymentConfigurationComponent', () => {
  let component: PaymentConfigurationComponent;
  let fixture: ComponentFixture<PaymentConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
