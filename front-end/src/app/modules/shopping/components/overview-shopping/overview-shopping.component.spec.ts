import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewShoppingComponent } from './overview-shopping.component';

describe('OverviewShoppingComponent', () => {
  let component: OverviewShoppingComponent;
  let fixture: ComponentFixture<OverviewShoppingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewShoppingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
