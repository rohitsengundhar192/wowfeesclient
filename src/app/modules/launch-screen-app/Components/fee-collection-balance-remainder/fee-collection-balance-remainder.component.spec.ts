import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeCollectionBalanceRemainderComponent } from './fee-collection-balance-remainder.component';

describe('FeeCollectionBalanceRemainderComponent', () => {
  let component: FeeCollectionBalanceRemainderComponent;
  let fixture: ComponentFixture<FeeCollectionBalanceRemainderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeCollectionBalanceRemainderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeCollectionBalanceRemainderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
