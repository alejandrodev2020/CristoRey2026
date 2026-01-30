import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionExecuteComponent } from './distribution-execute.component';

describe('DistributionExecuteComponent', () => {
  let component: DistributionExecuteComponent;
  let fixture: ComponentFixture<DistributionExecuteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DistributionExecuteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributionExecuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
