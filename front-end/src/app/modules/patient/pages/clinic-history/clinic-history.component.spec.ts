import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicHistoryComponent } from './clinic-history.component';

describe('ClinicHistoryComponent', () => {
  let component: ClinicHistoryComponent;
  let fixture: ComponentFixture<ClinicHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
