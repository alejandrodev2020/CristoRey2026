import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGestionaryComponent } from './product-gestionary.component';

describe('ProductGestionaryComponent', () => {
  let component: ProductGestionaryComponent;
  let fixture: ComponentFixture<ProductGestionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductGestionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductGestionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
