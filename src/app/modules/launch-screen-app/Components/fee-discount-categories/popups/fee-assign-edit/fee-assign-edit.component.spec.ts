import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeAssignEditComponent } from './fee-assign-edit.component';

describe('FeeAssignEditComponent', () => {
  let component: FeeAssignEditComponent;
  let fixture: ComponentFixture<FeeAssignEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeAssignEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeAssignEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
