import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnExportWhatsappComponent } from './btn-export-whatsapp.component';

describe('BtnExportWhatsappComponent', () => {
  let component: BtnExportWhatsappComponent;
  let fixture: ComponentFixture<BtnExportWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnExportWhatsappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnExportWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
