import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewPettyCashComponent } from './overview-petty-cash.component';

describe('OverviewPettyCashComponent', () => {
  let component: OverviewPettyCashComponent;
  let fixture: ComponentFixture<OverviewPettyCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewPettyCashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewPettyCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
