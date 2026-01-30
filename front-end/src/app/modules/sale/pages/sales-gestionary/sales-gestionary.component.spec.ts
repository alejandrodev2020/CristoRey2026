import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesGestionaryComponent } from './sales-gestionary.component';

describe('SalesGestionaryComponent', () => {
  let component: SalesGestionaryComponent;
  let fixture: ComponentFixture<SalesGestionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesGestionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesGestionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
