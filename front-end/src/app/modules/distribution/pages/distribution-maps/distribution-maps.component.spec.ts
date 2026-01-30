import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionMapsComponent } from './distribution-maps.component';

describe('DistributionMapsComponent', () => {
  let component: DistributionMapsComponent;
  let fixture: ComponentFixture<DistributionMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DistributionMapsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributionMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
