import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAlertPackageComponent } from './popup-alert-package.component';

describe('PopupAlertPackageComponent', () => {
  let component: PopupAlertPackageComponent;
  let fixture: ComponentFixture<PopupAlertPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupAlertPackageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupAlertPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
