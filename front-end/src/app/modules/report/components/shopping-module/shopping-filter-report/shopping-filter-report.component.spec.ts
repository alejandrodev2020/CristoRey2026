import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingFilterReportComponent } from './shopping-filter-report.component';

describe('ShoppingFilterReportComponent', () => {
  let component: ShoppingFilterReportComponent;
  let fixture: ComponentFixture<ShoppingFilterReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingFilterReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingFilterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
