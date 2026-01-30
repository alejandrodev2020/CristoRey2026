import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewAmountCashComponent } from './preview-amount-cash.component';

describe('PreviewAmountCashComponent', () => {
  let component: PreviewAmountCashComponent;
  let fixture: ComponentFixture<PreviewAmountCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewAmountCashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewAmountCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
