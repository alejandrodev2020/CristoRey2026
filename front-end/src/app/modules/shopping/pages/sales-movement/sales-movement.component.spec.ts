import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesMovementComponent } from './sales-movement.component';

describe('SalesMovementComponent', () => {
  let component: SalesMovementComponent;
  let fixture: ComponentFixture<SalesMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesMovementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
