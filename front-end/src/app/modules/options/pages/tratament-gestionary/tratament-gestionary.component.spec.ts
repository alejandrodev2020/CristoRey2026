import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamentGestionaryComponent } from './tratament-gestionary.component';

describe('TratamentGestionaryComponent', () => {
  let component: TratamentGestionaryComponent;
  let fixture: ComponentFixture<TratamentGestionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TratamentGestionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TratamentGestionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
