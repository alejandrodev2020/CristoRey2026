import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterWarehouseGestionaryComponent } from './filter-warehouse-gestionary.component';

describe('FilterWarehouseGestionaryComponent', () => {
  let component: FilterWarehouseGestionaryComponent;
  let fixture: ComponentFixture<FilterWarehouseGestionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterWarehouseGestionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterWarehouseGestionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
