import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBusFeeComponent } from './edit-bus-fee.component';

describe('EditBusFeeComponent', () => {
  let component: EditBusFeeComponent;
  let fixture: ComponentFixture<EditBusFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBusFeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBusFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
