import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionRaiseOrderComponent } from './distribution-raise-order.component';

describe('DistributionRaiseOrderComponent', () => {
  let component: DistributionRaiseOrderComponent;
  let fixture: ComponentFixture<DistributionRaiseOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DistributionRaiseOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributionRaiseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
