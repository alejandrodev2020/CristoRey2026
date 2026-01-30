import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewWarehouseComponent } from './overview-warehouse.component';

describe('OverviewWarehouseComponent', () => {
  let component: OverviewWarehouseComponent;
  let fixture: ComponentFixture<OverviewWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewWarehouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
