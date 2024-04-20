import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAdminstrationComponent } from './app-adminstration.component';

describe('AppAdminstrationComponent', () => {
  let component: AppAdminstrationComponent;
  let fixture: ComponentFixture<AppAdminstrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAdminstrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppAdminstrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
