import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewListSaleComponent } from './overview-list-sale.component';

describe('OverviewListSaleComponent', () => {
  let component: OverviewListSaleComponent;
  let fixture: ComponentFixture<OverviewListSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewListSaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewListSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
