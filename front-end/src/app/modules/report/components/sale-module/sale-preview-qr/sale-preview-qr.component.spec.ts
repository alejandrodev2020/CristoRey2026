import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalePreviewQrComponent } from './sale-preview-qr.component';

describe('SalePreviewQrComponent', () => {
  let component: SalePreviewQrComponent;
  let fixture: ComponentFixture<SalePreviewQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalePreviewQrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalePreviewQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
