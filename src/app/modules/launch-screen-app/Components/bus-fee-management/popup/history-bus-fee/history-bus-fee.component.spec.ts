import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryBusFeeComponent } from './history-bus-fee.component';

describe('HistoryBusFeeComponent', () => {
  let component: HistoryBusFeeComponent;
  let fixture: ComponentFixture<HistoryBusFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryBusFeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryBusFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
