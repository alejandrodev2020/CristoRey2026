import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsPersonComponent } from './chips-person.component';

describe('ChipsPersonComponent', () => {
  let component: ChipsPersonComponent;
  let fixture: ComponentFixture<ChipsPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipsPersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChipsPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
