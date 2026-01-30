import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewSaleWhatsappComponent } from './preview-sale-whatsapp.component';

describe('PreviewSaleWhatsappComponent', () => {
  let component: PreviewSaleWhatsappComponent;
  let fixture: ComponentFixture<PreviewSaleWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewSaleWhatsappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewSaleWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
