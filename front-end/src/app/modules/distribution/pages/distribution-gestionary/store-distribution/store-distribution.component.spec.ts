import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDistributionComponent } from './store-distribution.component';

describe('StoreDistributionComponent', () => {
  let component: StoreDistributionComponent;
  let fixture: ComponentFixture<StoreDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreDistributionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
