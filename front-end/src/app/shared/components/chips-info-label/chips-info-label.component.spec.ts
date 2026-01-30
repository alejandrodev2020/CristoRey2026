import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsInfoLabelComponent } from './chips-info-label.component';

describe('ChipsInfoLabelComponent', () => {
  let component: ChipsInfoLabelComponent;
  let fixture: ComponentFixture<ChipsInfoLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipsInfoLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChipsInfoLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
