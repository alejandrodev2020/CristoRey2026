import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreTratamentComponent } from './store-tratament.component';

describe('StoreTratamentComponent', () => {
  let component: StoreTratamentComponent;
  let fixture: ComponentFixture<StoreTratamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreTratamentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreTratamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
