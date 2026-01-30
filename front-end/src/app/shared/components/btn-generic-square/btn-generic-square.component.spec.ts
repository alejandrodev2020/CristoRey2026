import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnGenericSquareComponent } from './btn-generic-square.component';

describe('BtnGenericSquareComponent', () => {
  let component: BtnGenericSquareComponent;
  let fixture: ComponentFixture<BtnGenericSquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnGenericSquareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnGenericSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
