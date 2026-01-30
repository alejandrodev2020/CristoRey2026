import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOperatorsComponent } from './add-operators.component';

describe('AddOperatorsComponent', () => {
  let component: AddOperatorsComponent;
  let fixture: ComponentFixture<AddOperatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOperatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
