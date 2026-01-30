import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputInvoiceDecimalComponent } from './input-invoice-decimal.component';

describe('InputInvoiceDecimalComponent', () => {
  let component: InputInvoiceDecimalComponent;
  let fixture: ComponentFixture<InputInvoiceDecimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputInvoiceDecimalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputInvoiceDecimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
