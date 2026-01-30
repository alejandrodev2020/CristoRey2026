import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleFilterReportComponent } from './sale-filter-report.component';

describe('SaleFilterReportComponent', () => {
  let component: SaleFilterReportComponent;
  let fixture: ComponentFixture<SaleFilterReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleFilterReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleFilterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
