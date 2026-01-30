import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingReportComponent } from './shopping-report.component';

describe('ShoppingReportComponent', () => {
  let component: ShoppingReportComponent;
  let fixture: ComponentFixture<ShoppingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
