import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreShoppingComponent } from './store-shopping.component';

describe('StoreShoppingComponent', () => {
  let component: StoreShoppingComponent;
  let fixture: ComponentFixture<StoreShoppingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreShoppingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
