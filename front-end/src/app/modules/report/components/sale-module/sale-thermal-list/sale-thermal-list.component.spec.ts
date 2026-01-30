import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleThermalListComponent } from './sale-thermal-list.component';

describe('SaleThermalListComponent', () => {
  let component: SaleThermalListComponent;
  let fixture: ComponentFixture<SaleThermalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleThermalListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleThermalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
