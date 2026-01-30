import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterWarehouseComponent } from './filter-warehouse.component';

describe('FilterWarehouseComponent', () => {
  let component: FilterWarehouseComponent;
  let fixture: ComponentFixture<FilterWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterWarehouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
