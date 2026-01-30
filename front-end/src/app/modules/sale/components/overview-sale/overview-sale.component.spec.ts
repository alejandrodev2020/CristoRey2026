import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSaleComponent } from './overview-sale.component';

describe('OverviewSaleComponent', () => {
  let component: OverviewSaleComponent;
  let fixture: ComponentFixture<OverviewSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewSaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
