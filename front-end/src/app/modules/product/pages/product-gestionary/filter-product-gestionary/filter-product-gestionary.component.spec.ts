import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterProductGestionaryComponent } from './filter-product-gestionary.component';

describe('FilterProductGestionaryComponent', () => {
  let component: FilterProductGestionaryComponent;
  let fixture: ComponentFixture<FilterProductGestionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterProductGestionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterProductGestionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
