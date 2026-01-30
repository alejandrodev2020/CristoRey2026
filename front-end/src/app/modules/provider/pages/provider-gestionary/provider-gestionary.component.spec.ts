import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderGestionaryComponent } from './provider-gestionary.component';

describe('ProviderGestionaryComponent', () => {
  let component: ProviderGestionaryComponent;
  let fixture: ComponentFixture<ProviderGestionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderGestionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderGestionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
