import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSecurityComponent } from './home-security.component';

describe('HomeSecurityComponent', () => {
  let component: HomeSecurityComponent;
  let fixture: ComponentFixture<HomeSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSecurityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
