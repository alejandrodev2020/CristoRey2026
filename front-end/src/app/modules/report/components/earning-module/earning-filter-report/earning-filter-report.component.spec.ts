import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningFilterReportComponent } from './earning-filter-report.component';

describe('EarningFilterReportComponent', () => {
  let component: EarningFilterReportComponent;
  let fixture: ComponentFixture<EarningFilterReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarningFilterReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarningFilterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
