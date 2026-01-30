import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnActionsWhatsappComponent } from './btn-actions-whatsapp.component';

describe('BtnActionsWhatsappComponent', () => {
  let component: BtnActionsWhatsappComponent;
  let fixture: ComponentFixture<BtnActionsWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnActionsWhatsappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnActionsWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
