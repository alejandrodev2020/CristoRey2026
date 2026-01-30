import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewQuestionsUnitmeasurementComponent } from './preview-questions-unitmeasurement.component';

describe('PreviewQuestionsUnitmeasurementComponent', () => {
  let component: PreviewQuestionsUnitmeasurementComponent;
  let fixture: ComponentFixture<PreviewQuestionsUnitmeasurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewQuestionsUnitmeasurementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewQuestionsUnitmeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
