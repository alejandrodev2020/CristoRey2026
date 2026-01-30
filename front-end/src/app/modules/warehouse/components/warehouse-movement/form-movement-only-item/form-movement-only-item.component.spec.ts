import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMovementOnlyItemComponent } from './form-movement-only-item.component';

describe('FormMovementOnlyItemComponent', () => {
  let component: FormMovementOnlyItemComponent;
  let fixture: ComponentFixture<FormMovementOnlyItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMovementOnlyItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMovementOnlyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
