import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewAppointmentComponent } from './preview-appointment.component';

describe('PreviewAppointmentComponent', () => {
  let component: PreviewAppointmentComponent;
  let fixture: ComponentFixture<PreviewAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
