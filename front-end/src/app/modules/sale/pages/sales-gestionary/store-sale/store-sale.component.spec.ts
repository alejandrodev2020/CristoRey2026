import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreSaleComponent } from './store-sale.component';

describe('StoreSaleComponent', () => {
  let component: StoreSaleComponent;
  let fixture: ComponentFixture<StoreSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreSaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
