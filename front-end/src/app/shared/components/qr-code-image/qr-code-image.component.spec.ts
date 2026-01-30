import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeImageComponent } from './qr-code-image.component';

describe('QrCodeImageComponent', () => {
  let component: QrCodeImageComponent;
  let fixture: ComponentFixture<QrCodeImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrCodeImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrCodeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
