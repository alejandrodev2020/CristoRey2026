import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewProviderComponent } from './overview-provider.component';

describe('OverviewProviderComponent', () => {
  let component: OverviewProviderComponent;
  let fixture: ComponentFixture<OverviewProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewProviderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
