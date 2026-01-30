import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCollectionGestionaryComponent } from './filter-collection-gestionary.component';

describe('FilterCollectionGestionaryComponent', () => {
  let component: FilterCollectionGestionaryComponent;
  let fixture: ComponentFixture<FilterCollectionGestionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterCollectionGestionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterCollectionGestionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
