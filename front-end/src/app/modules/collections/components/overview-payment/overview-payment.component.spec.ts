import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewPaymentComponent } from './overview-payment.component';

describe('OverviewPaymentComponent', () => {
  let component: OverviewPaymentComponent;
  let fixture: ComponentFixture<OverviewPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
