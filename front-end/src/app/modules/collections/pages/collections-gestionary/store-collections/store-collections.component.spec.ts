import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCollectionsComponent } from './store-collections.component';

describe('StoreCollectionsComponent', () => {
  let component: StoreCollectionsComponent;
  let fixture: ComponentFixture<StoreCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreCollectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
