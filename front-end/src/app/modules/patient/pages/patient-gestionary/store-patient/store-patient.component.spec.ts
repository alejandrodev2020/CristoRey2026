import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePatientComponent } from './store-patient.component';

describe('StorePatientComponent', () => {
  let component: StorePatientComponent;
  let fixture: ComponentFixture<StorePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorePatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
