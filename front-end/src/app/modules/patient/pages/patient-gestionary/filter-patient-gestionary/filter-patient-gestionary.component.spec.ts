import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPatientGestionaryComponent } from './filter-patient-gestionary.component';

describe('FilterPatientGestionaryComponent', () => {
  let component: FilterPatientGestionaryComponent;
  let fixture: ComponentFixture<FilterPatientGestionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterPatientGestionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterPatientGestionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
