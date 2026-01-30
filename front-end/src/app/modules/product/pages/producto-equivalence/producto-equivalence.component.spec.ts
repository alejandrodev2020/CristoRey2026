import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoEquivalenceComponent } from './producto-equivalence.component';

describe('ProductoEquivalenceComponent', () => {
  let component: ProductoEquivalenceComponent;
  let fixture: ComponentFixture<ProductoEquivalenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoEquivalenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoEquivalenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
