import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiasnosticGestionaryComponent } from './diasnostic-gestionary.component';

describe('DiasnosticGestionaryComponent', () => {
  let component: DiasnosticGestionaryComponent;
  let fixture: ComponentFixture<DiasnosticGestionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiasnosticGestionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiasnosticGestionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
