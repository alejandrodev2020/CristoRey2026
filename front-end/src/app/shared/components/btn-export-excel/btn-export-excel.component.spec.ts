import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnExportExcelComponent } from './btn-export-excel.component';

describe('BtnExportExcelComponent', () => {
  let component: BtnExportExcelComponent;
  let fixture: ComponentFixture<BtnExportExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnExportExcelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnExportExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
