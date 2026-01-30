import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientGestionaryComponent } from './client-gestionary.component';

describe('ClientGestionaryComponent', () => {
  let component: ClientGestionaryComponent;
  let fixture: ComponentFixture<ClientGestionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientGestionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientGestionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
