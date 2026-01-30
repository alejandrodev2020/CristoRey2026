import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterProviderGestionaryComponent } from './filter-provider-gestionary.component';

describe('FilterProviderGestionaryComponent', () => {
  let component: FilterProviderGestionaryComponent;
  let fixture: ComponentFixture<FilterProviderGestionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterProviderGestionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterProviderGestionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
