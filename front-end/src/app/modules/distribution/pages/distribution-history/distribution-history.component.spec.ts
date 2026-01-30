import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionHistoryComponent } from './distribution-history.component';

describe('DistributionHistoryComponent', () => {
  let component: DistributionHistoryComponent;
  let fixture: ComponentFixture<DistributionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributionHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
