import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingGestionaryComponent } from './shopping-gestionary.component';

describe('ShoppingGestionaryComponent', () => {
  let component: ShoppingGestionaryComponent;
  let fixture: ComponentFixture<ShoppingGestionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingGestionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingGestionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
