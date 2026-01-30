import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewFindSaleComponent } from './overview-find-sale.component';

describe('OverviewFindSaleComponent', () => {
  let component: OverviewFindSaleComponent;
  let fixture: ComponentFixture<OverviewFindSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewFindSaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewFindSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
