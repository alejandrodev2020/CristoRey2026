import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleLetterUnitComponent } from './sale-letter-unit.component';

describe('SaleLetterUnitComponent', () => {
  let component: SaleLetterUnitComponent;
  let fixture: ComponentFixture<SaleLetterUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleLetterUnitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleLetterUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
