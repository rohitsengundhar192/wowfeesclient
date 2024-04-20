import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAccessTableComponent } from './no-access-table.component';

describe('NoAccessTableComponent', () => {
  let component: NoAccessTableComponent;
  let fixture: ComponentFixture<NoAccessTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoAccessTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoAccessTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
