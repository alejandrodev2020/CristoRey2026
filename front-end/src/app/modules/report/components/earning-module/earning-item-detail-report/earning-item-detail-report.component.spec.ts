import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningItemDetailReportComponent } from './earning-item-detail-report.component';

describe('EarningItemDetailReportComponent', () => {
  let component: EarningItemDetailReportComponent;
  let fixture: ComponentFixture<EarningItemDetailReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarningItemDetailReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarningItemDetailReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
