import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeParticularsTableComponent } from './fee-particulars-table.component';

describe('FeeParticularsTableComponent', () => {
  let component: FeeParticularsTableComponent;
  let fixture: ComponentFixture<FeeParticularsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeParticularsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeParticularsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
