import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGestionaryComponent } from './user-gestionary.component';

describe('UserGestionaryComponent', () => {
  let component: UserGestionaryComponent;
  let fixture: ComponentFixture<UserGestionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGestionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGestionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
