import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGetionaryComponent } from './user-getionary.component';

describe('UserGetionaryComponent', () => {
  let component: UserGetionaryComponent;
  let fixture: ComponentFixture<UserGetionaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGetionaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGetionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
