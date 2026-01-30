import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStatusViewComponent } from './card-status-view.component';

describe('CardStatusViewComponent', () => {
  let component: CardStatusViewComponent;
  let fixture: ComponentFixture<CardStatusViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardStatusViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardStatusViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
