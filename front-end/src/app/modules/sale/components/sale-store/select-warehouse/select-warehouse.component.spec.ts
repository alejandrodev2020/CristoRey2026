import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectWarehouseComponent } from './select-warehouse.component';

describe('SelectWarehouseComponent', () => {
  let component: SelectWarehouseComponent;
  let fixture: ComponentFixture<SelectWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectWarehouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
