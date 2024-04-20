import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeAssignNewComponent } from './fee-assign-new.component';

describe('FeeAssignNewComponent', () => {
  let component: FeeAssignNewComponent;
  let fixture: ComponentFixture<FeeAssignNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeAssignNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeAssignNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
