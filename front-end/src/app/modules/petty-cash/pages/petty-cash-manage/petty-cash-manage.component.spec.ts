import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PettyCashManageComponent } from './petty-cash-manage.component';

describe('PettyCashManageComponent', () => {
  let component: PettyCashManageComponent;
  let fixture: ComponentFixture<PettyCashManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PettyCashManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PettyCashManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
