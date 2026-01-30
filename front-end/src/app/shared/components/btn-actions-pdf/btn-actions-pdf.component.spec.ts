import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnActionsPdfComponent } from './btn-actions-pdf.component';

describe('BtnActionsPdfComponent', () => {
  let component: BtnActionsPdfComponent;
  let fixture: ComponentFixture<BtnActionsPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnActionsPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnActionsPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
