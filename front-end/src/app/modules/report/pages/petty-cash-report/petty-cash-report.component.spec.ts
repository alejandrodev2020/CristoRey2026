import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PettyCashReportComponent } from './petty-cash-report.component';

describe('PettyCashReportComponent', () => {
  let component: PettyCashReportComponent;
  let fixture: ComponentFixture<PettyCashReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PettyCashReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PettyCashReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
