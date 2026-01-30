import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnExportPdfComponent } from './btn-export-pdf.component';

describe('BtnExportPdfComponent', () => {
  let component: BtnExportPdfComponent;
  let fixture: ComponentFixture<BtnExportPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnExportPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnExportPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
