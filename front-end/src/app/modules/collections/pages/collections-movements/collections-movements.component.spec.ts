import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsMovementsComponent } from './collections-movements.component';

describe('CollectionsMovementsComponent', () => {
  let component: CollectionsMovementsComponent;
  let fixture: ComponentFixture<CollectionsMovementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionsMovementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionsMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
