import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeCollectionDashboardComponent } from './fee-collection-dashboard.component';

describe('FeeCollectionDashboardComponent', () => {
  let component: FeeCollectionDashboardComponent;
  let fixture: ComponentFixture<FeeCollectionDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeCollectionDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeCollectionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
