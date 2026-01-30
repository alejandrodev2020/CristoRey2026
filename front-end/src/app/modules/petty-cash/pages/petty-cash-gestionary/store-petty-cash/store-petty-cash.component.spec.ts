import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePettyCashComponent } from './store-petty-cash.component';

describe('StorePettyCashComponent', () => {
  let component: StorePettyCashComponent;
  let fixture: ComponentFixture<StorePettyCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorePettyCashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorePettyCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
