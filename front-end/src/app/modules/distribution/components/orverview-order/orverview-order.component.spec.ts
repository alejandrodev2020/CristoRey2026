import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrverviewOrderComponent } from './orverview-order.component';

describe('OrverviewOrderComponent', () => {
  let component: OrverviewOrderComponent;
  let fixture: ComponentFixture<OrverviewOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ OrverviewOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrverviewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
