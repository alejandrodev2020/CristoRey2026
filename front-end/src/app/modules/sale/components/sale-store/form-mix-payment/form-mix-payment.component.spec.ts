import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMixPaymentComponent } from './form-mix-payment.component';

describe('FormMixPaymentComponent', () => {
  let component: FormMixPaymentComponent;
  let fixture: ComponentFixture<FormMixPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMixPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMixPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
