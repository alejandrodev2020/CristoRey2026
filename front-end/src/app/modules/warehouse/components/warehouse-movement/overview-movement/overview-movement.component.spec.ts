import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewMovementComponent } from './overview-movement.component';

describe('OverviewMovementComponent', () => {
  let component: OverviewMovementComponent;
  let fixture: ComponentFixture<OverviewMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewMovementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
