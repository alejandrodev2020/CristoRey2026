import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleCreditStoreComponent } from './sale-credit-store.component';

describe('SaleCreditStoreComponent', () => {
  let component: SaleCreditStoreComponent;
  let fixture: ComponentFixture<SaleCreditStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleCreditStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleCreditStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
