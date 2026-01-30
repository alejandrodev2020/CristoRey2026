import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientGestionaryComponent } from './patient-gestionary.component';

describe('PatientGestionaryComponent', () => {
  let component: PatientGestionaryComponent;
  let fixture: ComponentFixture<PatientGestionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientGestionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientGestionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
