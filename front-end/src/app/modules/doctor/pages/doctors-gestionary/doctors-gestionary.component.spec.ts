import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsGestionaryComponent } from './doctors-gestionary.component';

describe('DoctorsGestionaryComponent', () => {
  let component: DoctorsGestionaryComponent;
  let fixture: ComponentFixture<DoctorsGestionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorsGestionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorsGestionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
