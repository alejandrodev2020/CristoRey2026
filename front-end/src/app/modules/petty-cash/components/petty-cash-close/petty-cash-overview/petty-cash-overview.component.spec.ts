import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PettyCashOverviewComponent } from './petty-cash-overview.component';

describe('PettyCashOverviewComponent', () => {
  let component: PettyCashOverviewComponent;
  let fixture: ComponentFixture<PettyCashOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PettyCashOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PettyCashOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
