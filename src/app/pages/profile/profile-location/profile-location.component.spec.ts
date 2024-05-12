import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLocationComponent } from './profile-location.component';

describe('ProfileLocationComponent', () => {
  let component: ProfileLocationComponent;
  let fixture: ComponentFixture<ProfileLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileLocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
