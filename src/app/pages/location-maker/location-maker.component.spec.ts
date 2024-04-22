import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationMakerComponent } from './location-maker.component';

describe('LocationMakerComponent', () => {
  let component: LocationMakerComponent;
  let fixture: ComponentFixture<LocationMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationMakerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocationMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
