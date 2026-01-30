import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsGestionaryComponent } from './options-gestionary.component';

describe('OptionsGestionaryComponent', () => {
  let component: OptionsGestionaryComponent;
  let fixture: ComponentFixture<OptionsGestionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsGestionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsGestionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
