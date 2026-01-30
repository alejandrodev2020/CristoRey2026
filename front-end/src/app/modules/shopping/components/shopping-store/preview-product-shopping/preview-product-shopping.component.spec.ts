import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewProductShoppingComponent } from './preview-product-shopping.component';

describe('PreviewProductShoppingComponent', () => {
  let component: PreviewProductShoppingComponent;
  let fixture: ComponentFixture<PreviewProductShoppingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewProductShoppingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewProductShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
