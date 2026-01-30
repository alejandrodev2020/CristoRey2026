import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PettyCashGestionaryComponent } from './petty-cash-gestionary.component';

describe('PettyCashGestionaryComponent', () => {
  let component: PettyCashGestionaryComponent;
  let fixture: ComponentFixture<PettyCashGestionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PettyCashGestionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PettyCashGestionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
