import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseProductReportComponent } from './warehouse-product-report.component';

describe('WarehouseProductReportComponent', () => {
  let component: WarehouseProductReportComponent;
  let fixture: ComponentFixture<WarehouseProductReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseProductReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseProductReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
