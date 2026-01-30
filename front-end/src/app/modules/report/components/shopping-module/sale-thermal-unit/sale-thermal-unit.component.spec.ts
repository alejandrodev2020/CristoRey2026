import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleThermalUnitComponent } from './sale-thermal-unit.component';

describe('SaleThermalUnitComponent', () => {
  let component: SaleThermalUnitComponent;
  let fixture: ComponentFixture<SaleThermalUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleThermalUnitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleThermalUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
