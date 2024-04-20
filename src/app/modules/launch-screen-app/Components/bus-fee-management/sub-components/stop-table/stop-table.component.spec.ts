import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopTableComponent } from './stop-table.component';

describe('StopTableComponent', () => {
  let component: StopTableComponent;
  let fixture: ComponentFixture<StopTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
