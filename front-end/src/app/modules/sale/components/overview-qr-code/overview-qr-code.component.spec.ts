import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewQrCodeComponent } from './overview-qr-code.component';

describe('OverviewQrCodeComponent', () => {
  let component: OverviewQrCodeComponent;
  let fixture: ComponentFixture<OverviewQrCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewQrCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewQrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
