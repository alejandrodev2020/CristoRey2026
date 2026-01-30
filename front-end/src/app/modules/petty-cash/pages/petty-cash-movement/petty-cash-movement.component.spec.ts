import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PettyCashMovementComponent } from './petty-cash-movement.component';

describe('PettyCashMovementComponent', () => {
  let component: PettyCashMovementComponent;
  let fixture: ComponentFixture<PettyCashMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PettyCashMovementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PettyCashMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
