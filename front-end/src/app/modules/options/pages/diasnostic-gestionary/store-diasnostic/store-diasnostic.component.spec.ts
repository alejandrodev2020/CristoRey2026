import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDiasnosticComponent } from './store-diasnostic.component';

describe('StoreDiasnosticComponent', () => {
  let component: StoreDiasnosticComponent;
  let fixture: ComponentFixture<StoreDiasnosticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreDiasnosticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreDiasnosticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
