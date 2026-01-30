import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDoctorsComponent } from './store-doctors.component';

describe('StoreDoctorsComponent', () => {
  let component: StoreDoctorsComponent;
  let fixture: ComponentFixture<StoreDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreDoctorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
