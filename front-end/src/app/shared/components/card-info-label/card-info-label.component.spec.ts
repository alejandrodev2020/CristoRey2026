import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInfoLabelComponent } from './card-info-label.component';

describe('CardInfoLabelComponent', () => {
  let component: CardInfoLabelComponent;
  let fixture: ComponentFixture<CardInfoLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardInfoLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardInfoLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
