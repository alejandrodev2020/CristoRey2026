import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsFaamComponent } from './chips-faam.component';

describe('ChipsFaamComponent', () => {
  let component: ChipsFaamComponent;
  let fixture: ComponentFixture<ChipsFaamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipsFaamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChipsFaamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
