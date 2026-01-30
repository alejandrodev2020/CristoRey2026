import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseAdjustmentsComponent } from './warehouse-adjustments.component';

describe('WarehouseAdjustmentsComponent', () => {
  let component: WarehouseAdjustmentsComponent;
  let fixture: ComponentFixture<WarehouseAdjustmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ WarehouseAdjustmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseAdjustmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
