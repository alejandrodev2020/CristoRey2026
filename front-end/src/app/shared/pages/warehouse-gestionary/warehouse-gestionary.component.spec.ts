import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseGestionaryComponent } from './warehouse-gestionary.component';

describe('WarehouseGestionaryComponent', () => {
  let component: WarehouseGestionaryComponent;
  let fixture: ComponentFixture<WarehouseGestionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseGestionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseGestionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
