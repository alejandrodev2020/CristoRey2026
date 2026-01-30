import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionGestionaryComponent } from './distribution-gestionary.component';

describe('DistributionGestionaryComponent', () => {
  let component: DistributionGestionaryComponent;
  let fixture: ComponentFixture<DistributionGestionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributionGestionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributionGestionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
