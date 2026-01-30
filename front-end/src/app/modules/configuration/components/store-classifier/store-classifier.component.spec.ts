import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreClassifierComponent } from './store-classifier.component';

describe('StoreClassifierComponent', () => {
  let component: StoreClassifierComponent;
  let fixture: ComponentFixture<StoreClassifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreClassifierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreClassifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
