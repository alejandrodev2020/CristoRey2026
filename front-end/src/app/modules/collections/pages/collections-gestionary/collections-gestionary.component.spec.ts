import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsGestionaryComponent } from './collections-gestionary.component';

describe('CollectionsGestionaryComponent', () => {
  let component: CollectionsGestionaryComponent;
  let fixture: ComponentFixture<CollectionsGestionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionsGestionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionsGestionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
