import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMassiveComponent } from './product-massive.component';

describe('ProductMassiveComponent', () => {
  let component: ProductMassiveComponent;
  let fixture: ComponentFixture<ProductMassiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductMassiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductMassiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
