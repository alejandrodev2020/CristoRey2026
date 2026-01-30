import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAmountCashComponent } from './input-amount-cash.component';

describe('InputAmountCashComponent', () => {
  let component: InputAmountCashComponent;
  let fixture: ComponentFixture<InputAmountCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputAmountCashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputAmountCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
