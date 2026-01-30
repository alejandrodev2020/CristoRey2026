import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterShoppingGestionaryComponent } from './filter-shopping-gestionary.component';

describe('FilterShoppingGestionaryComponent', () => {
  let component: FilterShoppingGestionaryComponent;
  let fixture: ComponentFixture<FilterShoppingGestionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterShoppingGestionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterShoppingGestionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
