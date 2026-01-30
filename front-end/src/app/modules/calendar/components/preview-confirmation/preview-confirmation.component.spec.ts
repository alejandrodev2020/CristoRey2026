import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewConfirmationComponent } from './preview-confirmation.component';

describe('PreviewConfirmationComponent', () => {
  let component: PreviewConfirmationComponent;
  let fixture: ComponentFixture<PreviewConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
