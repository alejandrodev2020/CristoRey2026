import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionaryCalendarComponent } from './gestionary-calendar.component';

describe('GestionaryCalendarComponent', () => {
  let component: GestionaryCalendarComponent;
  let fixture: ComponentFixture<GestionaryCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionaryCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionaryCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
