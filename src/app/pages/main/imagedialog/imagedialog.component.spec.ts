import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagedialogComponent } from './imagedialog.component';

describe('ImagedialogComponent', () => {
  let component: ImagedialogComponent;
  let fixture: ComponentFixture<ImagedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagedialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImagedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
