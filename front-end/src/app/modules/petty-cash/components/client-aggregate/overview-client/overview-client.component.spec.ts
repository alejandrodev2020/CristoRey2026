import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewClientComponent } from './overview-client.component';

describe('OverviewClientComponent', () => {
  let component: OverviewClientComponent;
  let fixture: ComponentFixture<OverviewClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
