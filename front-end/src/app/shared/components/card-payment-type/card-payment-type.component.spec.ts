import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPaymentTypeComponent } from './card-payment-type.component';

describe('CardPaymentTypeComponent', () => {
  let component: CardPaymentTypeComponent;
  let fixture: ComponentFixture<CardPaymentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPaymentTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPaymentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
