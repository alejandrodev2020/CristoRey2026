import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseProductReportFilterComponent } from './warehouse-product-report-filter.component';

describe('WarehouseProductReportFilterComponent', () => {
  let component: WarehouseProductReportFilterComponent;
  let fixture: ComponentFixture<WarehouseProductReportFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseProductReportFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseProductReportFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
