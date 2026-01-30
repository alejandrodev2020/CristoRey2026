import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemGestionaryComponent } from './item-gestionary.component';

describe('ItemGestionaryComponent', () => {
  let component: ItemGestionaryComponent;
  let fixture: ComponentFixture<ItemGestionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemGestionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemGestionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
