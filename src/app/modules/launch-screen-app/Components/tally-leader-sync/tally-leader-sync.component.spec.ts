import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallyLeaderSyncComponent } from './tally-leader-sync.component';

describe('TallyLeaderSyncComponent', () => {
  let component: TallyLeaderSyncComponent;
  let fixture: ComponentFixture<TallyLeaderSyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TallyLeaderSyncComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TallyLeaderSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
