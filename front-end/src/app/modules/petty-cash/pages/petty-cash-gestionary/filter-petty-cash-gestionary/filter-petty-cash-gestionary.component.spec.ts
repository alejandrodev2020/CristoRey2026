import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPettyCashGestionaryComponent } from './filter-petty-cash-gestionary.component';

describe('FilterPettyCashGestionaryComponent', () => {
  let component: FilterPettyCashGestionaryComponent;
  let fixture: ComponentFixture<FilterPettyCashGestionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterPettyCashGestionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterPettyCashGestionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
